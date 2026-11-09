import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soul Good Happy Women's Club",
  description: "Soul Good Happy Women's Club",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
