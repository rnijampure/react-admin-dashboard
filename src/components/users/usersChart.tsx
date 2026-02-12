import { useId, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { PieSectorShapeProps } from "recharts";

/* -------------------------------------------------------------------------- */
/*                             Gradient Shape Factory                          */
/* -------------------------------------------------------------------------- */

type GradientConfig = {
  chartId: string;
  getColor: (index: number) => string;
};

const createPieGradient =
  ({ chartId, getColor }: GradientConfig) =>
  (props: PieSectorShapeProps) => {
    const fillColor = getColor(props.index!);

    return (
      <>
        <defs>
          <radialGradient
            id={`fill-${chartId}-${props.index}`}
            cx={props.cx}
            cy={props.cy}
            r={props.outerRadius}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={fillColor} stopOpacity={0.15} />
            <stop offset="100%" stopColor={fillColor} stopOpacity={0.85} />
          </radialGradient>
        </defs>

        <Sector
          {...props}
          fill={`url(#fill-${chartId}-${props.index})`}
          stroke={fillColor}
          strokeWidth={props.isActive ? 1 : 0}
        />
      </>
    );
  };

/* -------------------------------------------------------------------------- */
/*                               Pie Component                                 */
/* -------------------------------------------------------------------------- */

export default function PieWithGradient({
  data,
}: {
  data: Record<string, number>;
}) {
  const chartId = useId();
  const theme = useTheme();

  const colors = [
    theme.palette.brand.main,
    theme.palette.brand.info!,
    theme.palette.brand.success!,
    theme.palette.brand.warning!,
    theme.palette.brand.error!,
    theme.palette.text.secondary,
  ];

  const chartData = useMemo(
    () =>
      Object.entries(data).map(([name, value]) => ({
        name,
        value,
      })),
    [data],
  );

  const shape = useMemo(
    () =>
      createPieGradient({
        chartId,
        getColor: (index) => colors[index % colors.length],
      }),
    [chartId, colors],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="5%"
          outerRadius="80%"
          shape={shape}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
