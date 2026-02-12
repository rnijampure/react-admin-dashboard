"use client"; // if using Next.js app router

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [serverDown, setServerDown] = useState(false);
  const queryClient = useQueryClient();

  // Listen for browser offline/online
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Listen for query errors to detect server down
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.state?.error) {
        const error = event.query.state.error;

        // Detect server down by status code (for fetch + Axios)
        if (
          error?.response?.status >= 500 || // Axios style
          error?.status >= 500 || // fetch style
          error?.message === "ServerDown"
        ) {
          setServerDown(true);
        }
      }
    });

    return () => unsubscribe();
  }, [queryClient]);

  if (!isOffline && !serverDown) return null;

  return (
    <div
      className="fixed top-0 w-full text-white p-3 text-center z-50 font-semibold"
      style={{
        backgroundColor: serverDown ? "orange" : "red",
      }}
    >
      {isOffline
        ? "You are offline. Check your internet connection."
        : "Server is currently down. Please try again later."}
    </div>
  );
}
