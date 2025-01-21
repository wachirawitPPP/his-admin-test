import React from "react";
import { Metadata } from "next";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import RoleManageTable from "@/app/components/user-tables/basic/RoleManageTable";
import CardBox from "@/app/components/shared/CardBox";

export const metadata: Metadata = {
  title: "Role management",
};

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Role management",
  },
];

const RoleManagePage = () => {
  return (
    <div>
      <BreadcrumbComp title="Role Management" items={BCrumb} />
      <CardBox className="">
        <RoleManageTable />
        
      </CardBox>
    </div>
  );
};

export default RoleManagePage;
