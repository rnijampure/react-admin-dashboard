# Getting started

This page explains how to install, run, build and test the dashboard on your own computer.

**On this page**

- [Before you begin](#before-you-begin)
- [Install](#install)
- [Start the API](#start-the-api)
- [Run the dashboard](#run-the-dashboard)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Run the tests](#run-the-tests)
- [Troubleshooting](#troubleshooting)

## Before you begin

You need:

- **Node.js** version 20.19 or later (or 22.12 or later). This is the range Vite 7 requires.
- **npm**, which is installed with Node.js.
- **A compatible REST API** running at `http://localhost:3000`. The dashboard has no built-in server. The endpoints it expects are listed in the [API reference](api-reference.md).

## Install

1. Clone the repository and open the project folder.

    ```bash
    git clone https://github.com/rnijampure/react-admin-dashboard.git
    cd react-admin-dashboard
    ```

2. Install the dependencies.

    ```bash
    npm install
    ```

!!! warning "Missing `immer` package"
    The main store imports Zustand's Immer middleware (`zustand/middleware/immer`), which needs the `immer` package. `immer` is not listed in `package.json`. If the build reports that it cannot resolve `immer`, install it:

    ```bash
    npm install immer
    ```

## Start the API

Start your backend so that it listens on port **3000**. Two things must be true:

- It serves the endpoints in the [API reference](api-reference.md).
- It allows cross-origin requests from the dashboard's address (CORS), because the dashboard and the API run on different ports.

Without the API, the tables show an error message.

## Run the dashboard

```bash
npm run dev
```

Vite prints the local address, which is `http://localhost:5173` unless that port is taken. Open it and go to `/home`. The root address `/` has no page, so enter `/home` or `/customers` in the address bar.

## Configuration

The project has no environment variables. Every API address is written into the source files, so to point the dashboard at a different server, edit these files.

| File | Address used |
|---|---|
| `components/feature/summary/Summary.tsx` | `http://localhost:3000/api/products` |
| `components/AlertsPanel.tsx` | `http://localhost:3000/api/products` |
| `components/feature/products/hooks/useProductsData.tsx` | `http://localhost:3000/` plus an endpoint |
| `components/feature/products/hooks/useProductAction.tsx` | `http://localhost:3000/api/products/add/:id` and `/api/products/bulk` |
| `components/feature/products/hooks/useDialogActions.tsx` | `http://localhost:3000/api/products/add/:id` |
| `components/common/useProductsSSE.tsx` | `http://localhost:3000/api/products/stream` |
| `components/users/usersTable.tsx`, `users/summary/Summary.tsx`, `users/AlertsPanel.tsx` | `http://localhost:3000/api/users` |

All paths are relative to `src/`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Type-checks with `tsc -b`, then creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint on the project |
| `npm test` | Runs the Vitest tests in watch mode |
| `npm run test:ui` | Opens the Vitest browser interface |
| `npm run test:coverage` | Runs the tests once and reports coverage |

!!! note "Extra test packages"
    `test:ui` and `test:coverage` need the `@vitest/ui` and `@vitest/coverage-v8` packages, which are not in `package.json`. Vitest offers to install them the first time you run these commands.

## Run the tests

```bash
npm test
```

The project has three test files, each next to the code it covers:

| File | Covers |
|---|---|
| `products/store/productStore.test.tsx` | The product store: initial state, highlighting, dialog state, selection reset |
| `products/hooks/useProductsData.test.tsx` | The products data hook with a mocked query |
| `products/utils/utils.test.ts` | The product mapping helper |

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Tables show "Something went wrong" or "Request failed" | The API is not running on port 3000, or it returned an error. Start it and refresh. |
| Browser console shows a CORS error | Allow the dashboard's origin (for example `http://localhost:5173`) in the API. |
| A red banner appears at the top | The browser reports that it is offline. Check your network connection. |
| Old data appears after you change the API | The cache is saved in `localStorage` under `RQ_CACHE` for up to 24 hours. Clear that key, or change `buster` in `App.tsx`. |
| Live updates stop | The live-update connection closes after an error and does not reconnect. Reload the page. |
| Navigation links such as Orders show a blank page | Only `/home` and `/customers` have routes. |
