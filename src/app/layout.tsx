import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { assetPath } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://vicmanve.github.io";

const ogTitle = "UMIA | Tecnología enfocada en la salud de tus pacientes";
const ogDescription =
  "La plataforma clínica con IA agéntica para médicos en Venezuela y LATAM: notas SOAP, récipes, agenda y visor DICOM bajo estándares HIPAA y HL7.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: ogTitle,
  description: ogDescription,
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: "UMIA",
    title: ogTitle,
    description: ogDescription,
    url: assetPath("/"),
    images: [
      {
        url: assetPath("/og/og-image.jpg"),
        width: 1024,
        height: 537,
        alt: "UMIA — Uniendo Medicina, Inteligencia y Atención",
        type: "image/jpeg",
      },
      {
        url: assetPath("/og/og-square.jpg"),
        width: 1024,
        height: 1024,
        alt: "UMIA — Uniendo Medicina, Inteligencia y Atención",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: assetPath("/og/twitter-image.jpg"),
        width: 1024,
        height: 576,
        alt: "UMIA — Uniendo Medicina, Inteligencia y Atención",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
