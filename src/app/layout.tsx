import type { Metadata } from "next";
import "./globals.css";
import { GeistMono, GeistSans } from "@/config/fonts";



export const metadata: Metadata = {
  title: "Teslo shop",
  description: "Una tienda virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
