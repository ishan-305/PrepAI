import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="auth-layout">{children}</div>;
}

export default AuthLayout;
