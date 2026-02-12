import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useTanQueryGET from "../common/queryWrapper";
import type { DataType } from "./summary/summaryTypes";
import Skeleton from "@mui/material/Skeleton";
const columns: any[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "email",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "phone",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "address",
    headerName: "address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "preferredPaymentMethod",
    headerName: "preferred Payment Method",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    editable: true,
  },
  {
    field: "region",
    headerName: "Region",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 90,
  },
];

export default function UsersTable() {
  // Fetch initial data with React Query
  const { data, isPending, error, isFetching } = useTanQueryGET<DataType[]>(
    ["users"],
    "http://localhost:3000/api/users",
    (users: any) =>
      users.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: Object.values(user.address).join(","),
        region: user.region,
        preferredPaymentMethod: user.preferredPaymentMethod,
        totalOrders: user.totalOrders,
        status: user.status,
      })),
  );
  //console.log("HERER DATA", data);
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
      className="max-h-[calc((100vh-8rem)/2)]"
    >
      <h2 className="text-2xl font-semibold mb-4 ml-2">User Details Table</h2>

      <Box sx={{ height: 320, width: "100%" }}>
        {data && (
          <DataGrid
            rows={data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}

        {isFetching && !isPending && <p>Refreshing data...</p>}
        {error && <p>Something went wrong - {error.message}</p>}
        {isPending && (
          <>
            <Skeleton variant="rectangular" width={681} height={401} />
          </>
        )}
      </Box>
    </Paper>
  );
}
