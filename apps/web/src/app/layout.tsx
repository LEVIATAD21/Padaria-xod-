import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padaria Xodó — Catálogo Demonstrativo",
  description: "Vitrine demonstrativa de produtos de padaria, com sacola local e sem processamento de pedidos.",
  robots: { index: true, follow: true },
  other: { "x-project-provenance": "github.com/LEVIATAD21/Padaria-xod-" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
