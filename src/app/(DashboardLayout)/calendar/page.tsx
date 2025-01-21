import CalendarApp from "@/app/components/calendar/calendar-app";
import { Metadata } from "next";
import React from "react";
import BreadcrumbComp from "../layout/shared/breadcrumb/BreadcrumbComp";
import { useTranslation } from "react-i18next";

export const metadata: Metadata = {
  title: "Calendar App",
};

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Calendar",
  },
];
const Page = () => {
//   const { t } = useTranslation();
  return (
    <div>
      <BreadcrumbComp title="Calendar" items={BCrumb} />
      <CalendarApp />
    </div>
  );
};

export default Page;
