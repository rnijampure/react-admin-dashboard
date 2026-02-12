import React, { useCallback, useState } from "react";
import type { DataType, Product } from "../../../../types/types";
import type { GridRowSelectionModel } from "@mui/x-data-grid";
import { useQueryClient } from "@tanstack/react-query";
export const fetchProduct = async (id: any) => {
  const response = await fetch(`http://localhost:3000/api/products/add/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return (await response.json()) as Product;
};
const useDialogActions = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product[]>([]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set<string>(),
    });

  const openEditDialog = useCallback(
    async (row: DataType) => {
      setOpenDialog(true);
      setEditingProduct([]);

      const selectedIds = Array.from(rowSelectionModel.ids);

      const idsToEdit = selectedIds.length > 0 ? selectedIds : [row.id];

      const products = await Promise.all(
        idsToEdit.map((id) =>
          queryClient.ensureQueryData({
            queryKey: ["product", id],
            queryFn: () => fetchProduct(id),
          }),
        ),
      );
      setEditingProduct(products);
    },
    [queryClient, rowSelectionModel.ids, rows, openDialog],
  );

  const openEditDialogFromSelection = useCallback(async () => {
    if (rowSelectionModel.ids.size === 0) return;

    setOpenDialog(true);
    setEditingProduct([]);

    const ids = Array.from(rowSelectionModel.ids);

    const products = await Promise.all(
      ids.map((id) =>
        queryClient.ensureQueryData({
          queryKey: ["product", id],
          queryFn: () => fetchProduct(id),
        }),
      ),
    );

    setEditingProduct(products);
  }, [queryClient, rowSelectionModel.ids]);

  const closeEditDialog = () => {
    setOpenDialog(false);
    setEditingProduct([]);
  };

  return {
    rows,
    setRows,
    openDialog,
    setOpenDialog,
    editingProduct,
    setEditingProduct,
    rowSelectionModel,
    setRowSelectionModel,
    closeEditDialog,
    openEditDialog,
    openEditDialogFromSelection,
  };
};

export default useDialogActions;
