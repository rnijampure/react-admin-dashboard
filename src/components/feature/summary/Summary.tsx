import { Paper, Skeleton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { setCards, HtmlTooltipContent, CardLayout } from "./summaryHelper";
import type { DataType } from "../../../types/types";
import DraggableDialog from "../../common/dialogBox";
import useTanQueryGET from "../../common/queryWrapper";
import { useProductsSSE } from "../../common/useProductsSSE";
const Summary = () => {
  const theme = useTheme();

  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  // Fetch initial data with React Query
  const { data, isPending, error, isFetching } = useTanQueryGET<DataType[]>(
    ["products"],
    "http://localhost:3000/api/products",
  );

  // Inside your Summary component
  //useProductsSSE();

  // Memoize card computation from products data
  const cards = React.useMemo(() => setCards(data), [data]);

  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
    >
      <h2 className="text-2xl font-semibold mb-4 ml-2">Weekly Summary</h2>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
        }}
      >
        {data && cards
          ? cards.map((card, index) => (
              <Tooltip
                placement="top"
                key={card.id}
                arrow
                title={<HtmlTooltipContent TooltipData={data} />}
                sx={{ backgroundColor: "white" }}
              >
                <Card
                  sx={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.45)",
                    gap: 2,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      setSelectedCard(index);
                      handleClickOpen();
                    }}
                    data-active={selectedCard === index ? "" : undefined}
                    sx={{
                      height: "100%",
                      "&[data-active]": {
                        backgroundColor: "action.selected",
                        "&:hover": {
                          backgroundColor: "action.selectedHover",
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography variant="body1" color="text.secondary">
                        {card.title}
                      </Typography>
                      <CardLayout
                        title={card.title}
                        amount={card.amount}
                        theme={theme}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Tooltip>
            ))
          : ""}
        {data?.length}
        {isFetching && !isPending && <p>Refreshing data...</p>}
        {error && <p>Something went wrong - {error.message}</p>}
        {isPending && (
          <>
            <Skeleton variant="rectangular" width={221} height={121} />
            <Skeleton variant="rectangular" width={221} height={121} />
            <Skeleton variant="rectangular" width={221} height={121} />
          </>
        )}
      </Box>

      <DraggableDialog openDialog={openDialog} handleClick={handleClose} />
    </Paper>
  );
};

export default Summary;
