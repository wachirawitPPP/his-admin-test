import React from "react";
import type { Metadata } from "next";
import { Inter,Kanit } from "next/font/google";
import "./css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import { CustomizerContextProvider } from "@/app/context/customizerContext";
import "../utils/i18n";
import SessionProviderComp from "./components/nextauth/SessionProvider";

const kanit = Kanit({ subsets: ["latin"], weight:["200","300"]});

export const metadata: Metadata = {
  title: "MaterialM - Nextjs",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <>
      <html lang="th" data-layout="horizontal" data-boxed-layout="full" >
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <ThemeModeScript />
        </head>
        <body className={`${kanit.className}`}>
          <Flowbite theme={{ theme: customTheme }}>
            <SessionProviderComp session={session}>
              <CustomizerContextProvider>{children}</CustomizerContextProvider>
            </SessionProviderComp>
          </Flowbite>
        </body>
      </html>
    </>
  );
}
