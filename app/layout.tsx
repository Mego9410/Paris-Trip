import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FTA Surprise",
  description: "An invitation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
      style={{ background: "#080808" }}
    >
      <body style={{ background: "#080808" }}>{children}</body>
    </html>
  );
}
