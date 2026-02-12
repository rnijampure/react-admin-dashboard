import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  {
    week: "2025-12-02",
    productsSold: 320,
    revenue: 12000,
    productsSoldChangePct: null,
    revenueChangePct: null,
  },
  {
    week: "2025-12-09",
    productsSold: 360,
    revenue: 13500,
    productsSoldChangePct: 12.5,
    revenueChangePct: 12.5,
  },
  {
    week: "2025-12-16",
    productsSold: 340,
    revenue: 12800,
    productsSoldChangePct: -5.6,
    revenueChangePct: -5.2,
  },
  {
    week: "2025-12-23",
    productsSold: 400,
    revenue: 15000,
    productsSoldChangePct: 17.6,
    revenueChangePct: 17.2,
  },
];

const ProductsChart = () => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
    >
      <h2 className="text-2xl font-semibold mb-4 ml-2">
        Weekly Sales Overview (4 weeks)
      </h2>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,  1fr))",
          gap: 2,
        }}
      >
        <LineChart
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "auto",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis width="auto" dataKey="productsSold" />
          <YAxis yAxisId="right" orientation="right" dataKey="revenue" />
          <Tooltip />
          <Legend />
          {/*       <Line
        type="monotone"
        dataKey="productsSold"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="revenue" stroke="#82ca9d" /> */}

          <Line stroke="#8884d8" dataKey="productsSold" />
          <Line stroke="#82ca9d" dataKey="revenue" yAxisId="right" />
        </LineChart>
      </Box>
    </Paper>
  );
};

export default ProductsChart;
