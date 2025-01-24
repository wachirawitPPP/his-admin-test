import React from "react";
import type { Metadata } from "next";
import { Inter, Kanit } from "next/font/google";
import "./css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import { CustomizerContextProvider } from "@/app/context/customizerContext";
import "../utils/i18n";




const kanit = Kanit({ subsets: ["latin"], weight: ["200", "300"] });

import metaData from "./data/metaData.json";
export const metadata: Metadata = {
  title: metaData.title_web,
  description: metaData.description_web,
  keywords: metaData.keywords_web,
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
      <html lang="th" data-layout="vertical" data-boxed-layout="full">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <ThemeModeScript />
        </head>
        <body className={`${kanit.className}`}>

            <Flowbite theme={{ theme: customTheme }}>
              
                <CustomizerContextProvider>
                  {children}
                </CustomizerContextProvider>
             
            </Flowbite>

        </body>
      </html>
    </>
  );
}
