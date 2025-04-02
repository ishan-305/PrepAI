import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const monaSans = Mona_Sans({
  variable: "--font-mona-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prep AI",
  description: "AI Powered Interview Preperation Tool",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAuthenticated = await isAuthenticated();
  console.log(userAuthenticated);
  if (!userAuthenticated) {
    redirect("/sign-in");
    console.log("User Not Authenticated");
  }
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
      </body>
      <Toaster />
    </html>
  );
}
