import { useMemo } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import type { Product, DataType } from "../../../../types/types";
import type { GridColDef, GridActionsColDef } from "@mui/x-data-grid";
import { useProductStore } from "../store/productStore";

interface UseProductColumnsProps {
  onEdit: (row: DataType) => Promise<void>;
  onDelete: (row: DataType) => void;
  isBulkEditing: boolean; // Pass the condition here
}

export const useProductsColumn = ({
  onDelete,
  onEdit,
  isBulkEditing,
}: UseProductColumnsProps): (GridColDef<any> | GridActionsColDef<any>)[] => {
  // Pull actions directly from store - these are stable and never change
  // This means they don't need to be in the dependency array!
  const flashRow = useProductStore((state) => state.flashRow);
  const setEditingProducts = useProductStore(
    (state) => state.setEditingProducts,
  );
  return useMemo(
    () => [
      { field: "id", headerName: "ID", minWidth: 90 },
      { field: "name", headerName: "Product Name", flex: 2, minWidth: 180 },
      { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
      {
        field: "stockLevel",
        headerName: "Stock",
        type: "number",
        flex: 0.8,
        minWidth: 90,
      },
      { field: "unitsSold", headerName: "Units Sold", flex: 1, minWidth: 120 },
      { field: "revenue", headerName: "Revenue", flex: 1, minWidth: 120 },
      { field: "region", headerName: "Region", flex: 1, minWidth: 120 },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        sortable: false,
        renderCell: (params) => (
          <Button
            variant="contained"
            size="small"
            disabled={isBulkEditing} // Controlled by the prop
            onClick={() => onEdit(params.row)}
          >
            <EditIcon />
          </Button>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        minWidth: 100,
        sortable: false,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(params.row)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [onDelete, onEdit, isBulkEditing],
  );
};
