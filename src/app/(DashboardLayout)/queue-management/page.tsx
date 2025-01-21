"use client";
import React, { useContext, useEffect, useState } from "react";
import BreadcrumbComp from "../layout/shared/breadcrumb/BreadcrumbComp";
import QueueTable from "./queue-table";
import { CustomizerContext } from "@/app/context/customizerContext";
import LoadingComponent from "../../components/shared/LoadingComponent";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Page",
  },
];

export default function page() {
  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isLanguage]);
  return (
    <>
      {isClient ? (
        <div className="w-full">
          <BreadcrumbComp title="Queue Management" items={BCrumb} />
          <QueueTable />
        </div>
      ) : (
        <div>
          <LoadingComponent />
        </div>
      )}
    </>
  );
}
