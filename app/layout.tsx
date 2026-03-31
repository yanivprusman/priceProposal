import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import FeedbackWrapper from "./components/FeedbackWrapper";

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
});

export const metadata: Metadata = {
  title: "הצעת מחיר",
  description: "מחולל הצעות מחיר",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={heebo.variable}>{children}
        <FeedbackWrapper />
      </body>
    </html>
  );
}
