import React, { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default RootLayout;
