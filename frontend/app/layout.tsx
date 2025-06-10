
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import { Outfit } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "./globals.scss";

import NexaHeaderWrapper from "./components/common/header/NexaHeaderWrapper";
import { Metadata } from "next";

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
console.log(fontOutfit)
export const metadata: Metadata = {
  title: "Nexa Quanta",
  description: "Summarize your documents with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-container"  >
        <ReactQueryProvider>
          <PrimeReactProvider>
            <NexaHeaderWrapper />
            <main>{children}</main>
          </PrimeReactProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
