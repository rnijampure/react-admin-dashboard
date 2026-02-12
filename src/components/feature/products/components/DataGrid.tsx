import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import DynamicSkeleton from "../../../common/DynamicSkeleton";
import { useProductsColumn } from "../hooks/useProductsColumn";
import { useProductStore } from "../store/productStore";
/* -------------------------------------------------------------------------- */
/*                               Lazy Imports                                   */
/* -------------------------------------------------------------------------- */
const DataGrid = React.lazy(() =>
  import("@mui/x-data-grid").then((mod) => ({ default: mod.DataGrid })),
);
export const DataGridComponent = (props: any) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const containerHeight = isMdUp ? 520 : 420; // Responsive height
  const rowHeight = 52;
  const headerHeight = 56;
  const skeletonRowCount = Math.floor(
    (containerHeight - headerHeight) / rowHeight,
  );

  const {
    data,
    isPending,
    error,
    isFetching,
    openEditDialog,
    onClickDelete,
    setRows,
    setHighlightedRowId,
    rowSelectionModel,
  } = props;

  const selectionModel = useProductStore((state) => state.selectionModel);
  const setSelectionModel = useProductStore((state) => state.setSelectionModel);
  const highlightedRowId = useProductStore((state) => state.highlightedId);

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);
  useEffect(() => {
    if (!highlightedRowId) return;

    const timeout = setTimeout(() => {
      setHighlightedRowId(undefined);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [highlightedRowId]);

  const columns = useProductsColumn({
    onEdit: openEditDialog,
    onDelete: onClickDelete,
    isBulkEditing: rowSelectionModel.ids.size > 1,
  });
  return (
    <Box sx={{ width: "100%", height: containerHeight }}>
      {isPending ? (
        <DynamicSkeleton
          rowCount={skeletonRowCount}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
        />
      ) : error ? (
        <Typography color="error">
          Something went wrong — {error.message}
        </Typography>
      ) : (
        <Suspense
          fallback={
            <DynamicSkeleton
              rowCount={skeletonRowCount}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
            />
          }
        >
          <DataGrid
            rows={data ?? []}
            columns={columns}
            getRowId={(row) => row.id || row._id}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={setSelectionModel}
            getRowClassName={(params) =>
              params.id === highlightedRowId ? "row-updated" : ""
            }
            sx={{
              "& .row-updated": {
                backgroundColor: "rgba(76, 175, 80, 0.25)",
                animation: "flash 2.5s ease",
              },
              "@keyframes flash": {
                "0%": { backgroundColor: "rgba(76, 175, 80, 0.4)" },
                "100%": { backgroundColor: "transparent" },
              },
            }}
          />
        </Suspense>
      )}

      {isFetching && !isPending && (
        <Typography variant="caption" sx={{ mt: 1 }}>
          Refreshing data…
        </Typography>
      )}
    </Box>
  );
};

export default DataGrid;
