import { Paper, Typography, Box, Chip, Stack } from "@mui/material";

export const FiltersPanel = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters & Insights
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Chip label="Region: North America" color="primary" />
        <Chip label="Category: Electronics" color="secondary" />
        <Chip label="User: Returning" />
      </Stack>

      <Box>
        <Typography variant="subtitle1">
          Top Category This Week: Electronics
        </Typography>
        <Typography variant="subtitle1">
          Low Stock Products: 12 items
        </Typography>
      </Box>
    </Paper>
  );
};
