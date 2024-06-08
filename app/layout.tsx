import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import "./globals.css";

const quantico = Quantico({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I Miss Erinya",
  description: "I MISS ERINYAAAAA UUUUUUuuuUUUuuuu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quantico.className}>{children}</body>
    </html>
  );
}
