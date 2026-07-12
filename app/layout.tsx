import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sweekaar Productions | Cinema. Theatre. Human Stories.",
  description: "Sweekaar Productions creates cinema and theatre rooted in authentic human stories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
