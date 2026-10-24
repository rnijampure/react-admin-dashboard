# State management

The dashboard keeps **server state** (data that lives on the server) and **client state** (data only the interface needs) in separate tools. This page describes both, and the undo workflow that connects them.

**On this page**

- [Two kinds of state](#two-kinds-of-state)
- [Server state with React Query](#server-state-with-react-query)
- [Live updates](#live-updates)
- [Client state with Zustand](#client-state-with-zustand)
- [The undo workflow](#the-undo-workflow)
- [Behaviour to be aware of](#behaviour-to-be-aware-of)

## Two kinds of state

| | Server state | Client state |
|---|---|---|
| Examples | Products, customers | Selected rows, open dialog, highlighted row, notification message |
| Owner | React Query cache | Zustand stores |
| Source of truth | The server | The browser |
| Cached or persisted | Yes (see below) | No |

Keeping the two apart means the interface never copies server data into a second store, so there is one place to look for each kind of value.

## Server state with React Query

### Global defaults

`App.tsx` creates the query client with these defaults.

| Option | Value | Meaning |
|---|---|---|
| `staleTime` | 5 minutes | Data is treated as fresh for 5 minutes |
| `gcTime` | 24 hours | Unused cached data is kept for 24 hours |
| `refetchOnWindowFocus` | `true` | Data refreshes when the browser tab regains focus |

### Persistence

The cache is saved to the browser's `localStorage` under the key `RQ_CACHE` through `PersistQueryClientProvider`. Saved data expires after 24 hours (`maxAge`). The `buster` value is `"v1"`: change it to discard every user's saved cache after a data-shape change.

### The `useTanQueryGET` wrapper

Components fetch data through `useTanQueryGET` (`components/common/queryWrapper.tsx`) rather than calling `useQuery` directly.

```ts
useTanQueryGET<T>(queryKey, queryFnURL, select?)
```

| Parameter | Description |
|---|---|
| `queryKey` | One of `"products"`, `"orders"`, `"users"` inside an array, for example `["products"]` |
| `queryFnURL` | The URL to request with `fetch` |
| `select` | Optional function that transforms the data after normalisation |

The wrapper:

1. Throws an error such as `Request failed: 500` when the response is not successful.
2. Normalises data for the `products` key by copying MongoDB-style `_id` values into `id`.
3. Applies the optional `select` function.
4. Uses a 5-minute `staleTime`, refetches on window focus and does not retry failed requests (`retry: false`).

### Query keys

| Key | Holds |
|---|---|
| `["products"]` | The list of products |
| `["product", id]` | One product, loaded when its edit dialog opens |
| `["users"]` | The list of customers |

## Live updates

`useProductsSSE` (`components/common/useProductsSSE.tsx`) opens a server-sent events connection to `/api/products/stream` and writes incoming data into the `["products"]` cache.

| Event | Effect on the cache |
|---|---|
| `productAdded` | Adds the product to the list unless a product with the same id exists |
| `productUpdated` | Replaces the product with the matching id |

The connection closes when the component unmounts. If the connection reports an error, the hook closes it and does not reconnect, so reload the page to resume live updates.

## Client state with Zustand

There are three Zustand stores.

### Bound store

`useBoundStore` (`store/useBoundStore.tsx`) combines three slices into one store with the Immer middleware.

| Slice | State | Actions |
|---|---|---|
| Drawer | `isDrawerOpen` (starts `true`) | `openDrawer`, `closeDrawer`, `toggleDrawer` |
| Notification | `notification` with `isOpen`, `message`, `severity` | `notify(message, severity?)`, `closeNotification` |
| Edit | `pendingMutation` with `NewProduct`, `OldProduct`, `timerId` | `stageEdit`, `cancelEdit` |

`severity` is `"success"`, `"error"`, `"info"` or `"warning"`; `notify` accepts the first three and defaults to `"info"`.

### Product store

`useProductStore` (`components/feature/products/store/productStore.tsx`) holds interface state for the product table.

| State | Purpose |
|---|---|
| `selectionModel` | Rows selected in the grid |
| `highlightedId` | Row currently flashing after an update |
| `editingProducts` | Products in the open edit dialog |
| `isDialogOpen` | Whether the edit dialog is open |

Its actions are grouped under an `actions` object: `setSelectionModel`, `setHighlightedId`, `setEditingProducts`, `setDialogOpen`, `flashRow(id, duration = 2500)` and `resetSelection`. `flashRow` sets `highlightedId` and clears it after the duration, in milliseconds.

!!! warning "Reading actions"
    Some components currently read these actions from the store root (for example `state.flashRow`) instead of from `state.actions`. See the Known limitations page.

### Countdown store

`useCountdownStore` (`components/common/notifications/countdownStore.ts`) provides a one-second countdown: `startCountdown(duration, onComplete)` and `stopCountdown()`, with `timeLeft` and `timerId` state. No rendered component uses it at present.

## The undo workflow

Saving a single product does not send the change to the server immediately. It is **staged** for 10 seconds so the user can undo it.

1. The user saves the edit form. A success message appears in the snackbar.
2. `stageEdit` clears any earlier pending timer, cancels in-flight `["products"]` queries so they cannot overwrite the cache, and stores the previous version of the product.
3. The cache is updated at once with the edited product (an **optimistic update**), so the table shows the change immediately.
4. A 10-second timer starts.
5. **If the timer ends**, the saved change is sent to the server with a `PATCH` request, and the pending edit is cleared. On success the products list is refetched and the row is marked for highlighting.
6. **If the user chooses Undo**, `cancelEdit` restores the previous product in the cache, stops the timer and clears the pending edit. Nothing is sent to the server.

If the server rejects the request, the mutation's `onError` handler restores the products list as it was before the edit.

Editing several products with **Save All Changes** works differently: it sends one bulk `PATCH` request straight away, with no undo window, and refetches the products list when it finishes.

## Behaviour to be aware of

- Only one staged edit is held at a time. Staging a second edit before the first one's 10 seconds have passed clears the first edit's timer, so the first edit is not sent to the server, although its change stays visible in the cache until the next refetch.
- The snackbar closes after 10 seconds, the same length as the undo window.
- Reloading the page during the undo window cancels the pending save, because the timer exists only in memory, so the change is never sent to the server.
