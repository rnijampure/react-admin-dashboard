import { Box, Paper } from "@mui/material";
const Loading = () => {
  return (
    <div>
      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
        className={`min-h-  w-full`}
      >
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          Loading...
        </Box>
      </Paper>
    </div>
  );
};

export default Loading;
