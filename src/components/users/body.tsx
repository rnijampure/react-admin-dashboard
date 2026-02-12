import { lazy } from "react";
import ErrorSuspenceWrapper from "../common/wrapper";

const Summary = lazy(() => import("./summary/Summary"));
const ProductsChart = lazy(() => import("../ProductsChart"));
const UsersTable = lazy(() => import("./usersTable"));
const AlertsPanel = lazy(() => import("./AlertsPanel"));

const UsersMainBody = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-6 min-h-[calc(100vh-8rem)] ">
      <div className="grid-item min-h-[calc((100vh-8rem)/2)] bg-fuchsia-50">
        <ErrorSuspenceWrapper name="Summary">
          <Summary />
        </ErrorSuspenceWrapper>
      </div>

      <div className="grid-item h-full bg-fuchsia-50">
        <ErrorSuspenceWrapper name="Alerts">
          <AlertsPanel />
        </ErrorSuspenceWrapper>
      </div>

      <div className="grid-item h-full bg-fuchsia-50">
        <ErrorSuspenceWrapper name="Product Table">
          <UsersTable />
        </ErrorSuspenceWrapper>
      </div>

      <div className="grid-item h-full bg-fuchsia-50">
        <ErrorSuspenceWrapper name="Products Chart">
          <ProductsChart />
        </ErrorSuspenceWrapper>
      </div>
    </div>
  );
};

export default UsersMainBody;
