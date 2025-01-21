import PatientRegister from "@/app/components/medical-records/Patient-register";
import { Metadata } from "next";
import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
// import RegisterTabs from "./register-tabs";
export const metadata: Metadata = {
  title: "Role Tables List",
};
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Medical Records",
  },
  {
    title: "ลงทะเบียน",
  },
];
const Page = () => {
  return (
    <div>
      <BreadcrumbComp title="ลงทะเบียน" items={BCrumb} />
      {/* <PatientRegister /> */}
      {/* <RegisterTabs/> */}
    </div>
  );
};

export default Page;
