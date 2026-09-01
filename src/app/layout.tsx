import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Debby Sayanggku 🎂",
  description:
    "Sebuah ucapan ulang tahun yang spesial dan penuh cinta untuk Debby — semoga hari ini menjadi awal dari kebahagiaan yang lebih besar.",
  keywords: ["happy birthday", "ulang tahun", "birthday", "debby"],
  openGraph: {
    title: "Happy Birthday Debby Sayanggku 🎂",
    description: "Semoga hari ini menjadi awal dari kebahagiaan yang lebih besar ❤️",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#080f1e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="h-full antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
