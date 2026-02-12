import React from "react";
import { Paper, Typography, Box, Stack, Chip, Skeleton } from "@mui/material";
import useTanQueryGET from "../common/queryWrapper";
import type { UserType2 } from "./summary/summaryTypes";

const AlertsPanel = () => {
  // Fetch initial data with React Query
  const { data, isPending, error, isFetching } = useTanQueryGET<UserType2[]>(
    ["users"],
    "http://localhost:3000/api/users",
    (users: any[]) =>
      users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: Object.values(user.address).join(", "),
        region: user.region,
        preferredPaymentMethod: user.preferredPaymentMethod,
        totalOrders: user.totalOrders,
        totalRevenue: user.totalRevenue,
      })),
  );
  // Low stock products
  //const lowStock = data?.filter((p) => p.stockLevel < 50);

  // Top selling products
  /* const topSelling = data
    ?.sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 3);
*/
  // Top revenue products
  const topRevenue = React.useMemo(() => {
    if (!data) return [];

    return [...data]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 3);
  }, [data]);

  const topPaymentMethods = React.useMemo(() => {
    if (!data) return [];

    const counts = data.reduce<Record<string, number>>((acc, user) => {
      const method = user.preferredPaymentMethod;
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([method, count]) => ({ method, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // top 3 (optional)
  }, [data]);

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
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
            <Typography variant="subtitle1">Top Payment Method:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {topPaymentMethods.map((p) => (
                <Chip
                  key={p.method}
                  label={`${p.method} (${p.count} users)`}
                  color="primary"
                  size="small"
                />
              ))}
            </Stack>{" "}
          </Box>

          {/* Top Revenue */}
          <Box>
            <Typography variant="subtitle1">Top Revenue Generators:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {topRevenue?.map((p: any) => (
                <Chip
                  key={p.id}
                  label={`${p.name} ($${p.totalRevenue})`}
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
