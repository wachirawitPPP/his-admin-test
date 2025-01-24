"use client";
import React, { useEffect, useState } from "react";
import BreadcrumbComp from "../layout/shared/breadcrumb/BreadcrumbComp";
import LoadingComponent from "../../components/shared/LoadingComponent";
import UserTable from "./userTable";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "User",
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
          <BreadcrumbComp title="User" items={BCrumb} />
          <UserTable />
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
