// src/common/useProductsSSE.ts
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { DataType } from "../feature/summary/types";

export const useProductsSSE = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/products/stream",
    );

    eventSource.onopen = () => {
      // console.log("🟢 Products SSE connected");
    };

    eventSource.addEventListener("productAdded", (event: MessageEvent) => {
      let _data = JSON.parse(event.data);
      const newProduct: DataType = {
        id: _data._id || _data.id,
        name: _data.name,
        category: _data.category,
        stock: _data.stock,
        unitsSold: 0,
        revenue: 841,
        unitsSoldChangePct: 15,
        revenueChangePct: 15,
        userType: _data.userType,
        region: _data.region,
      };

      //data: {"_id":"697444e278bc2ef120f5a02a","name":"CineBar 24W Portable Wireless Soundbar","category":"Electronics","price":512,"stock":0,"status":"active","createdAt":"2026-01-24T04:04:50.341Z","updatedAt":"2026-01-24T04:04:50.341Z","__v":0}

      queryClient.setQueryData<DataType[]>(["products"], (old) => {
        if (!old) return [newProduct];
        if (old.some((p) => p.id === newProduct.id)) return old;
        return [...old, newProduct];
      });
    });

    eventSource.onerror = (err) => {
      console.error("🔴 Products SSE error:", err);
      eventSource.close();
    };

    // Handles the Edit API updates
    eventSource.addEventListener("productUpdated", (event) => {
      const updatedProduct = JSON.parse(event.data);

      // 💡 Separation tip: Use the queryClient to update the UI
      queryClient.setQueryData(["products"], (old: any) =>
        old?.map((p: any) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
};
