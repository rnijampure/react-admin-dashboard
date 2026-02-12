import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/header/header";
import MainBody from "./components/main/body";
import UsersMainBody from "./components/users/body";
import OfflineBanner from "./components/common/OfflineBanner";

import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import NotificationDrawer from "./components/layout/sideNotification/notificationDrawer";
import SnackbarComponent from "./components/common/notifications/snackbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "RQ_CACHE",
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: "v1",
      }}
    >
      <BrowserRouter>
        <OfflineBanner />

        <div className="flex flex-col items-start justify-start w-full min-h-screen">
          <Header />
          <NotificationDrawer />
          <SnackbarComponent />
          <div className="w-full p-4">
            <Routes>
              <Route path="/home" element={<MainBody />} />
              <Route path="/customers" element={<UsersMainBody />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={true} />
    </PersistQueryClientProvider>
  );
}

export default App;
