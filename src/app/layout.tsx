import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedCare Insight - Deteksi Dini GERD Berbasis AI",
  description: "Project 1: Sistem Deteksi Dini Penyakit Gastroesophageal Reflux Disease Menggunakan Support Vector Classifier. Skrining awal kesehatan pencernaan Anda dengan cerdas dan cepat.",
  openGraph: {
    title: "MedCare Insight - Deteksi Dini GERD",
    description: "Skrining awal kesehatan pencernaan dengan model AI SVC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
