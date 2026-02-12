//src\components\common\prefetchWrapper.tsx
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useRef } from "react";
interface PrefetcherProps {
  queryKey: QueryKey;
  queryFnURL: string;
  children: React.ReactNode; // Requires a single child (Button, Link, etc.)
  delay?: number;
  staleTime?: number;
}
export const PrefetcherQuery = <T,>({
  queryKey,
  queryFnURL,
  staleTime,
  children,
}: PrefetcherProps) => {
  const queryClient = useQueryClient();
  const prefetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    // Start a timer when the user hovers
    prefetchTimerRef.current = setTimeout(() => {
      queryClient
        .prefetchQuery({
          queryKey: queryKey,
          queryFn: async () => {
            const response = await fetch(queryFnURL);

            if (!response.ok) {
              throw new Error(`Request failed: ${response.status}`);
            }

            return (await response.json()) as Promise<T>;
          },
          staleTime: staleTime ? staleTime : 60 * 1000, // Consider data fresh for 1 minute
        })
        .catch((err) => console.error("Prefetch failed:", err));
    }, 150); // 150ms delay: enough to ignore "accidental" hovers
  };

  const handleMouseLeave = () => {
    // If the mouse leaves before the 150ms is up, cancel the prefetch
    if (prefetchTimerRef.current) {
      clearTimeout(prefetchTimerRef.current);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      {children}
    </div>
  );
};
