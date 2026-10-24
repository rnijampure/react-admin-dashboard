# React Admin Dashboard

Developer documentation for a front-end admin dashboard built with React 19 and TypeScript. This guide describes the project as it exists in the source code today.

**On this page**

- [What it is](#what-it-is)
- [Project status](#project-status)
- [What works today](#what-works-today)
- [Technology](#technology)
- [Requirements](#requirements)
- [Where to go next](#where-to-go-next)

## What it is

The React Admin Dashboard is a single-page application for viewing and editing business data such as products and customers. It is organised by feature and separates data that comes from a server (server state) from data that only the interface needs (client state).

The project is also a working study of scalable front-end patterns: feature-based folders, reusable data-fetching wrappers, store slices, optimistic updates with an undo window, and live updates over server-sent events.

## Project status

!!! note "Proof of concept"
    Only the product table and its editing workflow are developed in depth. Other areas, such as the Customers page, are partly built. Areas that are incomplete are listed on the Known limitations page of this guide.

## What works today

| Area | Where | What it does |
|---|---|---|
| Home dashboard | `/home` | Four panels: Weekly Summary cards, Weekly Sales Highlights, Product Inventory table and a Weekly Sales Overview chart |
| Product table | Home, Product Inventory panel | Data grid with row selection, loading skeletons, a refreshing indicator and an error message |
| Edit one product | Product table, edit button | Dialog form; saving shows a confirmation message and starts a 10-second undo window before the change is sent to the server |
| Edit several products | Product table, **Edit Selected** (enabled when two or more rows are selected) | Accordion form with **Save All Changes**, which sends one bulk update request |
| Live updates | Product table | Product additions and updates pushed by the server appear in the table without a reload |
| Customers page | `/customers` | Same panel layout with a customers table |
| Theme | Header | Light and dark mode toggle |
| Offline banner | Top of the page | Shown when the browser reports that it is offline |
| Notifications | Side drawer and bottom of the page | Notification drawer and a snackbar with an **Undo** action |

!!! info "Sample data in the chart"
    The Weekly Sales Overview chart uses four weeks of fixed sample data written into the component. It does not read from the server.

## Technology

| Purpose | Library | Version in `package.json` |
|---|---|---|
| UI framework | React | ^19.2.0 |
| Language | TypeScript | ~5.9.3 |
| Build tool and dev server | Vite | ^7.2.4 |
| Components and theming | MUI (`@mui/material`) | ^7.3.7 |
| Data grid | MUI X Data Grid | ^8.25.0 |
| Utility styling | Tailwind CSS | ^4.1.18 |
| Server state and caching | TanStack React Query | ^5.90.19 |
| Client state | Zustand | ^5.0.11 |
| Forms | React Hook Form | ^7.71.1 |
| Routing | React Router | ^7.13.0 |
| Charts | Recharts | ^3.6.0 |
| Tests | Vitest and Testing Library | ^4.0.18 and ^16.3.2 |

## Requirements

The dashboard does not include a server. It requests its data from a REST API at `http://localhost:3000`, so a compatible API must be running for the tables to load. The endpoints the front end expects are described in the [API reference](api-reference.md).

## Where to go next

- [Getting started](getting-started.md): install, configure, run and test the dashboard.
- [Architecture](architecture.md): how the application is assembled and organised.
- [State management](state-management.md): how server state, client state and the undo workflow work.
- [API reference](api-reference.md): the endpoints and data shapes the front end expects.
- [API explorer](api-explorer.md): the same API as an interactive OpenAPI view.
