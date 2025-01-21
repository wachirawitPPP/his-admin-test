"use client";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import SubMenuApps from "@/app/components/menu-manage/menu";
import { SubMenuType } from "@/utils/type/menuType";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/menu-manage",
    title: "Group Menu",
  },
  {
    title: "Menu List",
  },
];

const Page = () => {
  const { groupId } = useParams();

  return (
    <div>
      <BreadcrumbComp title="Menu List" items={BCrumb} />
      <SubMenuApps groupId={groupId} />
    </div>
  );
};

export default Page;
