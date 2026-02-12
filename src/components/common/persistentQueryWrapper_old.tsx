//src\components\common\persistentQueryWrapper.tsx
import { useState } from "react";
import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 24 * 60 * 60 * 1000, // 24 hours
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "RQ_CACHE",
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: "v1",
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
