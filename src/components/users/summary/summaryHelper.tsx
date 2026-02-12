import Typography from "@mui/material/Typography";
import React from "react";
import type { DataType } from "./summaryTypes";
import PieWithGradient from "../usersChart";
import { Box } from "@mui/material";
function HtmlTooltipContent({
  TooltipData,
}: {
  TooltipData: DataType[] | undefined;
}) {
  //console.log("TooltipData in HtmlTooltipContent", TooltipData);
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
  amount,
}: {
  amount: Record<string, number> | number | undefined;
}) => {
  const isPrimitive =
    typeof amount === "string" ||
    typeof amount === "number" ||
    typeof amount === "boolean";

  return (
    <Typography variant="body1" component="div">
      {isPrimitive ? (
        <span>{String(amount)}</span>
      ) : (
        <>
          {amount && (
            <Box sx={{ width: "100%", height: 180 }}>
              <PieWithGradient data={amount} />
            </Box>
          )}

          {amount &&
            Object.entries(amount).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {String(value)}
              </div>
            ))}
        </>
      )}
    </Typography>
  );
};
const setCards = (data: DataType[] | undefined) => {
  const userRegion =
    data?.reduce((acc: Record<string, number>, item: any) => {
      acc[item.region] = (acc[item.region] || 0) + 1;
      return acc;
    }, {}) ?? {};

  let userStatus =
    data?.reduce((acc: Record<string, number>, item: any) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {}) ?? {};

  let productCategory: any = [];

  data?.forEach((item: any) => {
    item?.orders.forEach((_item: any) => {
      if (_item.products.length > 0) {
        _item.products?.reduce((acc: Record<string, number>, item: any) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          productCategory[item.category] =
            (productCategory[item.category] || 0) + 1;
          return acc;
        }, {});
      }
    });
  });

  return [
    {
      id: 2,
      title: "Users By Region",
      description: "Users By Region",
      amount: userRegion,
    },
    {
      id: 3,
      title: "User Status",
      description: "Items with low stock levels.",
      amount: userStatus,
    },
    {
      id: 4,
      title: "Prefered  Category",
      description: "sales by category",
      amount: productCategory,
    },
  ];
};

export { HtmlTooltipContent, CardLayout, setCards };
