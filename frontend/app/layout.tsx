import { cookies } from "next/headers";
import { Outfit } from "next/font/google";
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.scss";

import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import NexaHeaderWrapper from "./components/common/header/NexaHeaderWrapper";

const fontOutfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontOutfit.variable}`}>
      <body className="app-container">
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
