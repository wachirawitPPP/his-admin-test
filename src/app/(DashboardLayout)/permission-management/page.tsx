"use client";
import AppTable from "@/app/(DashboardLayout)/permission-management/app-table";
import { Metadata } from "next";
import React, { useContext, useEffect, useState } from "react";
import BreadcrumbComp from "../layout/shared/breadcrumb/BreadcrumbComp";
import LoadingComponent from "../../components/shared/LoadingComponent";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Apps Management",
  },
];
const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <div>
          <BreadcrumbComp title="Apps Management" items={BCrumb} />

          <AppTable />
        </div>
      ) : (
        <div>
          <LoadingComponent />
        </div>
      )}
    </>
  );
};

export default Page;
