import { lazy, type JSX } from "react";
import ErrorSuspenceWrapper from "../common/wrapper";

const Summary = lazy(() => import("../feature/summary/Summary"));
const ProductsChart = lazy(() => import("../ProductsChart"));
const ProductTable = lazy(() => import("../feature/products/ProductTable"));
const AlertsPanel = lazy(() => import("../AlertsPanel"));

interface PanelConfig {
  name: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  // control col-span per screen size
  colSpanMd?: number;
  colSpanLg?: number;
  minHeight?: string;
}

const panels: PanelConfig[] = [
  { name: "Summary", Component: Summary, minHeight: "min-h-60" },
  { name: "Alerts", Component: AlertsPanel, minHeight: "min-h-60" },
  {
    name: "Product Table",
    Component: ProductTable,
    colSpanMd: 2,
    colSpanLg: 2,
    minHeight: "min-h-140",
  },
  { name: "Products Chart", Component: ProductsChart, colSpanMd: 2 },
];

const MainBody = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 min-h-[calc(100vh-5rem)] h-full">
      {panels.map((panel) => (
        <div
          key={panel.name}
          className={`grid-item ${panel.minHeight ?? ""} flex h-full
  ${panel.colSpanMd === 2 ? "md:col-span-2" : "md:col-span-1"}
  ${panel.colSpanLg === 2 ? "lg:col-span-2" : ""} bg-white rounded-2xl`}
        >
          <ErrorSuspenceWrapper name={panel.name}>
            <panel.Component />
          </ErrorSuspenceWrapper>
        </div>
      ))}
    </div>
  );
};

export default MainBody;
