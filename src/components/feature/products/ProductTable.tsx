// src/components/ProductTable.tsx
import { Box, Paper, Button, Typography } from "@mui/material";
import DraggableDialog from "../../common/dialogBox";
import { returnDialogcontent } from "./components/EditTable/productsEditManager";
import { useProductsAction } from "./hooks/useProductAction";
import { DataGridComponent } from "./components/DataGrid";
import { useProductsData } from "./hooks/useProductsData";
import { useProductsSSE } from "../../common/useProductsSSE";
import useDialogActions from "./hooks/useDialogActions";

/* -------------------------------------------------------------------------- */
/*                               Main Component                                */
/* -------------------------------------------------------------------------- */
export default function ProductTable() {
  const {
    updateProductMutation,
    onClickDelete,
    highlightedRowId,
    setHighlightedRowId,
  } = useProductsAction();
  const {
    openEditDialogFromSelection,
    closeEditDialog,
    openDialog,
    editingProduct,
    openEditDialog,
    setRows,
    rowSelectionModel,
    setRowSelectionModel,
  } = useDialogActions();

  useProductsSSE();

  const { data, isPending, error, isFetching } = useProductsData();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">Product Inventory here</Typography>

        <Button
          variant="contained"
          disabled={rowSelectionModel.ids.size < 2}
          onClick={() => openEditDialogFromSelection()}
        >
          Edit Selected
        </Button>
      </Box>
      {data && (
        <DataGridComponent
          data={data}
          isPending={isPending}
          error={error}
          isFetching={isFetching}
          highlightedRowId={highlightedRowId}
          openEditDialog={openEditDialog}
          onClickDelete={onClickDelete}
          setRows={setRows}
          setHighlightedRowId={setHighlightedRowId}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
        />
      )}

      <DraggableDialog
        openDialog={openDialog}
        handleClick={closeEditDialog}
        type={editingProduct.length}
      >
        {returnDialogcontent(
          editingProduct,
          updateProductMutation,
          closeEditDialog,
        )}
      </DraggableDialog>
    </Paper>
  );
}
