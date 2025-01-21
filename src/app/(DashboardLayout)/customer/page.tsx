"use client";
import CustomerTable from "@/app/(DashboardLayout)/customer/customer-table";
import { Metadata } from "next";
import React, { useContext, useEffect, useState } from "react";
import BreadcrumbComp from "../layout/shared/breadcrumb/BreadcrumbComp";
import LoadingComponent from "../../components/shared/LoadingComponent";

// export const metadata: Metadata = {
//   title: "Role Tables List",
// };
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Medical Records",
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
          <BreadcrumbComp title="Medical Records" items={BCrumb} />

          <CustomerTable />
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
