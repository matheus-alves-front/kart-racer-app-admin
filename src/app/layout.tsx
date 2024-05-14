import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "@/styles/globals.css";
import { LoadingContextProvider } from "@/contexts/LoadingContext";

const michroma = Michroma({ 
  style: 'normal',
  weight: '400',
  adjustFontFallback: true,
  display: 'block',
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Kart Racer App",
  description: "Rede social para os apaixonados por kart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={michroma.className}>
        <LoadingContextProvider>
          {children}
        </LoadingContextProvider>
      </body>
    </html>
  );
}
