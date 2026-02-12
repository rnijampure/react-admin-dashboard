import Typography from "@mui/material/Typography";
import React from "react";
import type { DataType } from "../../../types/types";
function HtmlTooltipContent({
  TooltipData,
}: {
  TooltipData: DataType[] | undefined;
}) {
  // console.log("TooltipData in HtmlTooltipContent", TooltipData);
  /*   console.log(
    TooltipData.breakdown.byUserType.map((item: any) => {
      //  console.log(item);
    }),
  ); */

  if (!TooltipData) return <div>No Data</div>;
  const categories = Array.from(
    new Set(TooltipData.map((item) => item.category)),
  );

  const userTypes = Array.from(
    new Set(TooltipData.map((item) => item.userType)),
  );

  return (
    <>
      <React.Fragment>
        {/* 
      <Typography color="inherit">Tooltip **title**</Typography> */}
        <ul>
          <li>
            <h3 className="text-xs mt-2">Categories</h3>
            {categories.join(", ")}
          </li>
          <li>
            <h3 className="text-xs mt-2">User Types</h3>
            {userTypes.join(", ")}
          </li>
          <li></li>
        </ul>
      </React.Fragment>
    </>
  );
}

const CardLayout = ({
  title,
  amount,
  theme,
}: {
  title: string;
  amount: number;
  theme: any;
}) => {
  const isSuccess =
    (title === "Total Revenue" && amount >= 1000) ||
    (title === "Products Sold" && amount < 10) ||
    (title === "Low Stock Items" && amount < 100);
  const isError =
    (title === "Total Revenue" && amount < 1000) ||
    (title === "Low Stock Items" && amount >= 100);

  const isInfo = title === "Products Sold" && amount >= 10;
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        color: isSuccess
          ? theme.palette.brand.success
          : isError
            ? theme.palette.brand.error
            : isInfo
              ? theme.palette.brand.info
              : theme.palette.text.primary,
      }}
    >
      {title === "Total Revenue" ? `$${amount}` : amount}
    </Typography>
  );
};

/*  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/products");
      // return await response.json();
      if (!response.ok) {
        //throw new Error("Network response was not ok");

        if (response?.status >= 500) {
          alert("Server is currently down. Please try again later.");
        }
      }
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true, // refresh on tab focus
    refetchInterval: false, // no constant polling
    retry: false, // don’t retry failed queries endlessly
  });

  if (isPending) return "Loading... pending";

  if (error) return "An error has occurred: " + error.message;

  if (isFetching) return "Updating...";  */

const setCards = (data: DataType[] | undefined) => {
  const ProductsSold =
    data?.reduce((acc: any, item: any) => acc + item.unitsSold, 0) ?? 0;
  const TotalRevenue =
    data?.reduce((acc: any, item: any) => acc + item.revenue, 0) ?? 0;
  const LowStockItems =
    data?.filter((item: any) => item.stockLevel < 50).length ?? 0;

  return [
    {
      id: 1,
      title: "Products Sold",
      description: "Total number of products sold",
      amount: ProductsSold,
    },
    {
      id: 2,
      title: "Total Revenue",
      description: "Total Revenue.",
      amount: TotalRevenue,
    },
    {
      id: 3,
      title: "Low Stock Items",
      description: "Items with low stock levels.",
      amount: LowStockItems,
    },
  ];
};

export { HtmlTooltipContent, CardLayout, setCards };
