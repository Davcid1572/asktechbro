import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AskTechBro",
  description: "Your African tech mentor. Ask anything about code and careers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-900">{children}</body>
    </html>
  );
}
