"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import GeneralDetail from "../detail/general-detail";
import CardBox from "@/app/components/shared/CardBox";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import { PatientHistory } from "@/utils/type/patientTypes";

const customer = {
  patient_image: "/images/profile/user-9.jpg",
  patient_id: 1,
  name: "John Doe",
  gender: "Male",
  dob: "1990-01-01",
  phone: "123-456-7890",
  address: "123 Main St",
  id_card: "1300201263110",
  nationality: "ไทย",
  medical_history: [
    {
      condition: "Hypertension",
      diagnosed_on: "2018-05-20",
      status: "Ongoing",
      notes: "Patient advised to maintain a low-sodium diet.",
    },
    {
      condition: "Type 2 Diabetes",
      diagnosed_on: "2020-03-15",
      status: "Ongoing",
      notes: "Managing with metformin and lifestyle changes.",
    },
  ],
  surgical_history: [
    {
      surgery: "Appendectomy",
      date: "2008-06-15",
      notes: "No complications during recovery.",
    },
  ],
  family_history: [
    {
      relation: "Father",
      condition: "Heart Disease",
    },
  ],
  allergies: [
    {
      allergen: "Penicillin",
      reaction: "Rash",
    },
  ],
} as PatientHistory;

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Medical Records",
  },
  {
    to: "/ฟหก",
    title: "Medical Records",
  },
];

const Page = () => {
  const [data, setData] = useState<PatientHistory>(customer);
  const { id } = useParams();
  return (
    <>
      <BreadcrumbComp title="รายละเอียดคนไข้" items={BCrumb} />
      <div className="flex flex-row w-full">
        <GeneralDetail customer={data}/>
      </div>
      {/* <div>
        <GeneralDetail />
      </div>
      <div>
        <GeneralDetail />
      </div> */}
    </>
  );
};

export default Page;
