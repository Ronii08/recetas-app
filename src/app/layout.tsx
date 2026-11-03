import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Título y descripción que aparecen en la pestaña del navegador y en Google
export const metadata: Metadata = {
  title: "Recetario",
  description: "Descubre recetas deliciosas para cada ocasión",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* El Navbar vive en el layout: aparece en TODAS las páginas sin repetirlo */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
