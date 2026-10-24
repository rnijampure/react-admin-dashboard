# API reference

The dashboard has no server of its own. This page lists the HTTP endpoints that the front end calls, with the request and response shapes the code expects. Use it to build or check a compatible backend. The same contract is available as an [OpenAPI file](openapi.yaml) and in the [API explorer](api-explorer.md).

!!! info "How this page was written"
    This is the contract **the front end expects**, taken from the dashboard's source code. It is not generated from a running server. Field names marked *(confirm)* are read by the code but their exact form depends on the backend.

**On this page**

- [Conventions](#conventions)
- [Endpoint summary](#endpoint-summary)
- [Products](#products)
- [Product by id](#product-by-id)
- [Update a product](#update-a-product)
- [Bulk update products](#bulk-update-products)
- [Live product events](#live-product-events)
- [Customers](#customers)
- [Data shapes](#data-shapes)
- [Notes for backend developers](#notes-for-backend-developers)

## Conventions

- **Base address:** `http://localhost:3000`
- **Format:** JSON for request and response bodies. Requests with a body send `Content-Type: application/json`.
- **Authentication:** none. The front end sends no credentials or tokens.
- **Errors:** any non-successful status (outside 200 to 299) is treated as a failure. The dashboard shows "Request failed: *status*" for list requests and "Update failed" or "Bulk update failed" for edits. Error bodies are not read.

## Endpoint summary

| Method | Path | Used for |
|---|---|---|
| GET | `/api/products` | Products list for the summary cards and alerts |
| GET | `//products` | Products list for the product table (see [notes](#notes-for-backend-developers)) |
| GET | `/api/products/add/:id` | One product, loaded when an edit dialog opens |
| PATCH | `/api/products/add/:id` | Update one product |
| PATCH | `/api/products/bulk` | Update several products |
| GET | `/api/products/stream` | Live product events (server-sent events) |
| GET | `/api/users` | Customers list |

## Products

### `GET /api/products`

Returns an array of products.

**Response `200`**

```json
[
  {
    "_id": "6970c12c0576869a149e11fe",
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 512,
    "stock": 25,
    "status": "active",
    "unitsSold": 13,
    "revenue": 781,
    "unitsSoldChangePct": 0,
    "revenueChangePct": 0,
    "userType": "All",
    "region": "All"
  }
]
```

The example values are illustrative. The front end copies `_id` into `id` for every product it loads. See [Product](#product) for each field.

### `GET //products`

The product table requests this address, built from `http://localhost:3000/` plus `/products` (note the double slash). It expects the same array as `GET /api/products` and stores it under the same cache key, so both requests fill the same table data. See the [notes](#notes-for-backend-developers).

## Product by id

### `GET /api/products/add/:id`

Returns one product. Called when the edit dialog opens for a row.

| Parameter | In | Description |
|---|---|---|
| `id` | Path | The product's identifier |

**Response `200`**: a single [Product](#product) object.

## Update a product

### `PATCH /api/products/add/:id`

Updates one product. Called after the 10-second undo window ends.

**Request body**: the product fields from the edit form, with `id`.

```json
{
  "id": "6970c12c0576869a149e11fe",
  "name": "Wireless Headphones",
  "category": ["Electronics"],
  "price": 512,
  "stock": 25,
  "description": "Over-ear, Bluetooth"
}
```

!!! note "Category format"
    The edit form always sends `category` as an **array** of strings, even for one category.

**Response `200`**: the updated product. The front end reads `_id` or `id`, `name`, `category`, `stock`, `price` and `status`. If `status` is not `"active"` or `"inactive"`, the product is treated as `"inactive"`.

## Bulk update products

### `PATCH /api/products/bulk`

Updates several products in one request. Called by **Save All Changes** in the multiple-product edit form. Only rows the user changed are included, and each item carries only editable fields (`createdAt`, `updatedAt` and `_id` are removed before sending).

**Request body**

```json
{
  "updates": [
    { "id": "6970c12c0576869a149e11fe", "name": "Wireless Headphones", "price": 499 },
    { "id": "697444e278bc2ef120f5a02a", "stock": 40 }
  ]
}
```

**Response `200`**

```json
{
  "success": [],
  "failed": []
}
```

The front end reads only `failed`. If it is a non-empty array, the dashboard writes the failed items to the browser console. The shape of each entry in `success` and `failed` is not read. *(confirm)*

## Live product events

### `GET /api/products/stream`

Opens a server-sent events (SSE) stream. The front end listens for two named events and expects each event's `data` to be a JSON product.

| Event | Front-end behaviour |
|---|---|
| `productAdded` | Adds the product to the products list if no product with the same id exists |
| `productUpdated` | Replaces the product whose `id` matches |

**Example `productAdded` event**

```text
event: productAdded
data: {"_id":"697444e278bc2ef120f5a02a","name":"CineBar 24W Portable Wireless Soundbar","category":"Electronics","price":512,"stock":0,"status":"active","createdAt":"2026-01-24T04:04:50.341Z","updatedAt":"2026-01-24T04:04:50.341Z","__v":0}
```

For `productAdded`, the front end reads `_id` or `id`, `name`, `category`, `stock`, `userType` and `region`, and fills `unitsSold`, `revenue` and the change percentages with fixed placeholder values.

For `productUpdated`, the front end compares the event's **`id`** with each product's `id`, so send `id` (not `_id`) in this event.

If the connection errors, the front end closes it and does not reconnect.

## Customers

### `GET /api/users`

Returns an array of customers.

**Response `200`**

```json
[
  {
    "_id": "65f1c0ab12cd34ef56789012",
    "name": "Asha Rao",
    "email": "asha@example.com",
    "phone": 9876543210,
    "address": { "street": "12 MG Road", "city": "Bengaluru", "pin": "560001" },
    "region": "Asia-Pacific",
    "preferredPaymentMethod": "UPI",
    "totalOrders": 12,
    "totalRevenue": 8450,
    "status": "active"
  }
]
```

The example values are illustrative. The customers table joins the values of `address` into one comma-separated string, so `address` must be an object (a missing `address` causes an error).

## Data shapes

### Product

| Field | Type | Used by | Notes |
|---|---|---|---|
| `_id` or `id` | string | All product views | `_id` is copied into `id` on load |
| `name` | string | Table, edit forms, summary | |
| `category` | string or string[] | Table, edit forms, summary tooltip | The edit form sends an array |
| `price` | number | Edit forms | |
| `stock` | number | Edit forms, low-stock summary | The table column is named `stockLevel` *(confirm)* |
| `status` | `"active"`, `"inactive"` or `"pending"` | Edit forms | Other values become `"inactive"` |
| `description` | string, optional | Edit forms | |
| `unitsSold` | number | Table, alerts | |
| `revenue` | number | Table, alerts, summary | |
| `unitsSoldChangePct` | number | Summary | |
| `revenueChangePct` | number | Summary | |
| `userType` | string | Summary tooltip | |
| `region` | string | Table, summary | |
| `createdAt`, `updatedAt` | ISO 8601 string | Not displayed | Removed from bulk updates |

### Customer

| Field | Type | Notes |
|---|---|---|
| `_id` | string | Copied to `id` in the table |
| `name`, `email`, `region` | string | |
| `phone` | number | |
| `address` | object | Values are joined into one string |
| `preferredPaymentMethod` | `"Card"`, `"UPI"`, `"PayPal"` or `"Credit Card"` | |
| `totalOrders`, `totalRevenue` | number | |
| `status` | string | One of `active`, `inactive`, `pending`, `suspended`, `banned`, `deleted` |

## Notes for backend developers

- **Two product list addresses.** The summary and alerts request `/api/products`; the product table requests `//products`. Both write to the same cache entry, so make both addresses return the same list, or expect whichever answers last to fill the table.
- **Cache lifetime.** The front end caches lists for 5 minutes and saves them in the browser for up to 24 hours, so changes made directly in the database may not appear immediately.
- **CORS.** Allow the dashboard's origin, because the dashboard and API use different ports.
- **Field names.** The front end tolerates `_id` and `id` for products, but the products table column is called `stockLevel` while the edit forms use `stock`. Confirm which name your API returns.
