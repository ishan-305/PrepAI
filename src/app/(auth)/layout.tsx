import { isAuthenticated } from "@/lib/actions/auth.action";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: ReactNode }) {
  const userAuthenticated = await isAuthenticated();

  if (userAuthenticated) {
    redirect("/");
  }

  return <div className="auth-layout">{children}</div>;
}

export default AuthLayout;
