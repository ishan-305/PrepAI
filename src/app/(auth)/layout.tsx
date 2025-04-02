import { isAuthenticated } from "@/lib/actions/auth.action";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: ReactNode }) {
  const userAuthenticated = await isAuthenticated();
  console.log("Auth check result:", userAuthenticated);

  if (userAuthenticated) {
    console.log("User authenticated, but NOT redirecting for now.");
    redirect("/");
  }

  return <div className="auth-layout">{children}</div>;
}

export default AuthLayout;
