# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

Done! Here is your **Project Progress & Architecture Summary**. You can save this in a `NOTES.md` file in your project or paste it into a new chat session to give me (or any other AI) an instant "brain upload" of your current work.

---

## 🏗️ Project: Product Management Dashboard

**Current Stack:** React, TypeScript, MUI (Material UI), TanStack Query (v5), and Zustand.

### 1. Folder Structure (Feature-Based)

We are following a scalable architecture where business logic is grouped by feature.

- `src/feature/products/`: Contains the `ProductTable`, `useProductAction` (mutations), and `useProductData` (queries).
- `src/components/layout/`: Holds the "Shell" (Sidebar, Header).
- `src/store/`: Centralized state logic using Zustand.

---

### 2. State Management Strategy

We have moved away from prop-drilling and local `useState` for global concerns:

- **Server State (TanStack Query):** Handles fetching, caching, and mutating product data.
- **Client State (Zustand):** Handles UI interactions like sidebars and notifications.

### 3. The Unified UI Store (`useDrawerNotificationStore.ts`)

A centralized store for the application "Shell."

- **Sidebar Slice:** Manages `isDrawerOpen` and includes a curried `toggleDrawer` function to handle MUI's specific `KeyboardEvent` requirements.
- **Notification Slice:** Manages a global `notification` object.
- **Key Action:** `notify(message, severity)` – Triggers a Snackbar and automatically handles the `setTimeout` cleanup inside the store logic.

---

### 4. Technical Wins & Patterns Used

- **Stable Selectors:** Using `useUiStore(state => state.value)` to prevent unnecessary re-renders of the DataGrid.
- **Stable Columns:** Defining `DataGrid` columns with `useMemo` so they aren't recreated on every render.
- **Curried Event Handlers:** Moving complex MUI event logic into the store to keep components purely visual.
- **Atomic Updates:** Using the functional update `set((state) => ({ ... }))` only for nested objects (`notification`) while letting Zustand merge top-level keys.

---

### 5. Pending "Homework" & Next Steps

1. **Notification Integration:** Call the `notify` action from the `onSuccess` callback in your Product mutations.
2. **Global UI Components:** Create a single `<NotificationSnackbar />` in your `App.tsx` or `Layout.tsx` that listens to the store, so notifications can be triggered from anywhere.
3. **Future Feature:** Integrate **Zundo** for "Undo/Redo" functionality on bulk actions (like accidental deletes).

---

**Whenever you're ready to start the next session, just say "Let's pick up from the Project Summary," and we can dive straight into the code!**
