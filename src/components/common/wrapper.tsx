import React, { Suspense } from "react";
import Loading from "./Loading";
import { ErrorBoundary } from "./ErrorBoundary";

const ErrorSuspenceWrapper = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <div>
      {" "}
      <ErrorBoundary fallback={<div>{name} failed to load</div>}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ErrorSuspenceWrapper;
