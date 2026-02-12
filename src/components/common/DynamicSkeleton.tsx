// src/components/common/DynamicSkeleton.tsx
import { Box, Skeleton } from "@mui/material";

interface DynamicSkeletonProps {
  rowCount?: number; // Number of rows to simulate
  rowHeight?: number; // Height of each row
  headerHeight?: number; // Height of the column headers
  width?: string | number;
}

export default function DynamicSkeleton({
  rowCount = 5,
  rowHeight = 52,
  headerHeight = 56,
  width = "100%",
}: DynamicSkeletonProps) {
  return (
    <Box sx={{ width }}>
      {/* Header */}
      <Skeleton variant="rectangular" height={headerHeight} sx={{ mb: 1 }} />

      {/* Rows */}
      {Array.from({ length: rowCount }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={rowHeight}
          sx={{ mb: 1, borderRadius: 1 }}
        />
      ))}
    </Box>
  );
}
