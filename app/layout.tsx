import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BR-OATS by Snackdaddy | Oats with more to give.",
  description: "Higher-protein, better-fibre, micronutrient-dense overnight oats in four bold flavours.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${barlowCondensed.variable}`}>{children}</body></html>;
}
