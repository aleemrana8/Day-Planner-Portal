import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Day Planner — MTBC Executive Portal",
  description: "Next-generation workforce analytics & operational management platform by MTBC",
};

// Script to prevent flash of wrong theme on load
const themeScript = `
  (function() {
    try {
      var stored = JSON.parse(localStorage.getItem('day-planner-theme') || '{}');
      var theme = (stored.state && stored.state.theme) || 'dark';
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch(e) { document.documentElement.classList.add('dark'); }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
