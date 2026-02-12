import React from "react";
import { Paper, Typography, Box, Stack, Chip, Skeleton } from "@mui/material";
import useTanQueryGET from "./common/queryWrapper";
import type { DataType } from "../feature/summary/types";

const AlertsPanel = () => {
  // Fetch initial data with React Query
  const { data, isPending, error, isFetching } = useTanQueryGET<DataType[]>(
    ["products"],
    "http://localhost:3000/api/products",
  );
  // Low stock products
  // Top revenue products
  const topRevenue = React.useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => b.revenue - a.revenue).slice(0, 3);
  }, [data]);

  // Top selling products
  const topSelling = React.useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 3);
  }, [data]);
  // Top revenue products
  //const topRevenue = data?.sort((a, b) => b.revenue - a.revenue).slice(0, 3);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      {isFetching && !isPending && <p>Refreshing data...</p>}
      {error && <p>Something went wrong - {error.message}</p>}
      {isPending && (
        <>
          <Skeleton variant="rectangular" width={221} height={121} />
          <Skeleton variant="rectangular" width={221} height={121} />
          <Skeleton variant="rectangular" width={221} height={121} />
        </>
      )}
      <h2 className="text-2xl font-semibold mb-4 ml-2">
        Weekly Sales Highlights
      </h2>
      {data && (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,  1fr))",
            gap: 2,
          }}
        >
          <Box mb={2}>
            <Typography variant="subtitle1">Top Selling Products:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {topSelling?.map((p) => (
                <Chip
                  key={p.id}
                  label={`${p.name} (${p.unitsSold} units)`}
                  color="success"
                  size="small"
                />
              ))}
            </Stack>
          </Box>

          {/* Top Revenue */}
          <Box>
            <Typography variant="subtitle1">Top Revenue Products:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {topRevenue?.map((p) => (
                <Chip
                  key={p.id}
                  label={`${p.name} ($${p.revenue})`}
                  color="primary"
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
export default AlertsPanel;
