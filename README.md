# Admin Dashboard – Scalable React Architecture 🚀

A modern, production-ready **admin dashboard** built with **React 19 + TypeScript**, designed with **scalable state management**, **modular feature architecture**, and **performance-aware design patterns**.

This project demonstrates real-world admin use cases including **product management**, **user management**, **notifications**, and **dynamic data grids** — structured using feature-based organization and modern data-fetching patterns. Currently only products table edit feature is developed

The architecture emphasizes:

- Separation of **server state** and **client state**
- **Testable state management** with Zustand
- **Reusable data-fetching abstractions**
- Modular **feature boundaries**
- Performance-conscious **UI rendering**

---

## ✨ Features

### 📦 Product Management
- Dynamic **data grid** (MUI X DataGrid)
- Row **selection & highlight** logic
- **Dialog-based editing** workflows
- **Flash row** animation logic
- Centralized **Zustand store** for UI interactions
- **Undo-ready** notification structure

### 👥 User Management
- **Data transformation layer** for API responses
- Configurable **DataGrid columns**
- **Loading & refresh** states
- **Error boundary** handling
- **Skeleton loading** UI

### 🔔 Notification System
- **Undo notification** component
- **Countdown timer** logic
- **Snackbar** integration
- Isolated **notification store**

### 🎨 UI & Theming
- **Custom theme context**
- **Dark/light mode toggle**
- Reusable **layout components**
- **Responsive design**

### ⚡ Data Fetching & Caching
- **TanStack React Query**
- **Query wrappers** for abstraction
- Separate **loading / fetching / error** states
- **Refetch and background refresh** handling

### 🧠 State Management
- **Zustand** for UI and domain state
- Structured **action-based store pattern**
- **Timed side-effect handling** (flash row)
- **Reset and selection logic**

### 🧪 Testing (In Progress)
- Unit testing with **Vitest**
- Store testing with **fake timers**
- Hook testing strategy
- **Co-located test files**

---

## 🏗 Architecture Highlights

- **Feature-based folder structure**
- Separation of **common vs feature components**
- Dedicated **store slices**
- Reusable **query wrapper abstraction**
- Clear boundary between **server state** and **UI state**
- Environment configuration via **Vite**

---

## 🛠 Tech Stack

### Core
- React 19
- TypeScript
- Vite

### State Management
- Zustand

### Data Fetching
- TanStack React Query

### UI
- MUI (Material UI)
- MUI X DataGrid
- TailwindCSS

### Forms
- React Hook Form

### Charts
- Recharts

### Testing
- Vitest
- Testing Library

---

## 🎯 Project Goals

This project serves as a foundation for:

- Exploring **scalable state management patterns**
- Comparing **Zustand vs Redux architecture**
- Implementing **enterprise-style workflows**
- Preparing for migration to **Next.js App Router**

---

## 🧠 Future Improvements

- Integrate **Redux Toolkit** (RTK Query + entity adapter)
- **Bulk operations workflow** in Users/Products
- **Role-based permissions**
- **Optimistic updates** with undo
- **Audit logging**
- **Migration to Next.js**

---

## ⚡ Notes

- Keep `.env` files out of the repository
- Use `.env.example` to share environment variables
- Commit **lock files** for reproducible builds
