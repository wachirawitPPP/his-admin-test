"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Badge,
  Button,
  Drawer,
  Dropdown,
  HR,
  Modal,
  Tabs,
  TabsRef,
  Tooltip,
} from "flowbite-react";
import Image from "next/image";
import {
  Icon24Hours,
  IconDots,
  IconEdit,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import TitleIconCard from "@/app/components/shared/TitleIconCard";
import axios from "axios";
import Link from "next/link";

import { PatientHistory, MedicalRecord } from "@/utils/type/patientTypes";
import RegisterTabs from "@/app/(DashboardLayout)/customer/register-tabs";
import CardBox from "../../components/shared/CardBox";
import GeneralData from "@/app/(DashboardLayout)/customer/tab-menu/general-data";
import HealthData from "@/app/(DashboardLayout)/customer/tab-menu/health-data";
import PatientRegister from "../../components/medical-records/Patient-register";
import CustomerDetail from "./customer-detail";

// Sample patient and medical records data
const patients: PatientHistory[] = [
  {
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
  },
  {
    patient_id: 2,
    name: "Jane Smith",
    gender: "Female",
    dob: "1985-03-20",
    phone: "987-654-3210",
    address: "456 Elm St",
    medical_history: [
      {
        condition: "Asthma",
        diagnosed_on: "2005-08-10",
        status: "Ongoing",
        notes: "Uses albuterol inhaler as needed.",
      },
    ],
    surgical_history: [],
    family_history: [
      {
        relation: "Mother",
        condition: "Asthma",
      },
    ],
    allergies: [
      {
        allergen: "Peanuts",
        reaction: "Hives and swelling",
      },
    ],
  },
  {
    patient_id: 3,
    name: "Alice Johnson",
    gender: "Female",
    dob: "1975-09-12",
    phone: "456-789-0123",
    address: "789 Oak St",
    medical_history: [
      {
        condition: "High Cholesterol",
        diagnosed_on: "2015-05-22",
        status: "Ongoing",
        notes: "Patient is on statins.",
      },
    ],
    surgical_history: [],
    family_history: [
      {
        relation: "Father",
        condition: "High Cholesterol",
      },
    ],
    allergies: [],
  },
  {
    patient_id: 4,
    name: "Tom White",
    gender: "Male",
    dob: "1992-11-11",
    phone: "321-654-0987",
    address: "321 Maple St",
    medical_history: [
      {
        condition: "GERD",
        diagnosed_on: "2019-02-13",
        status: "Ongoing",
        notes: "Takes omeprazole daily.",
      },
    ],
    surgical_history: [
      {
        surgery: "Gallbladder Removal",
        date: "2018-09-15",
        notes: "Recovery was smooth.",
      },
    ],
    family_history: [],
    allergies: [],
  },
  {
    patient_id: 5,
    name: "Susan Green",
    gender: "Female",
    dob: "1980-07-22",
    phone: "789-012-3456",
    address: "987 Pine St",
    medical_history: [
      {
        condition: "Hypertension",
        diagnosed_on: "2016-06-25",
        status: "Ongoing",
        notes: "Monitors blood pressure daily.",
      },
    ],
    surgical_history: [],
    family_history: [
      {
        relation: "Mother",
        condition: "Hypertension",
      },
    ],
    allergies: [
      {
        allergen: "Shellfish",
        reaction: "Swelling and rash",
      },
    ],
  },
];

const medicalRecords: MedicalRecord[] = [
  {
    record_id: 101,
    patient_id: 1,
    visit_date: "2024-01-15",
    doctor: "Dr. Emily Smith",
    department: "Cardiology",
    reason_for_visit: "Routine check-up",
    diagnosis: "Stable hypertension",
    treatments: [
      {
        treatment_type: "Medication",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
      },
    ],
    notes: "Continue with current medications.",
  },
  {
    record_id: 102,
    patient_id: 1,
    visit_date: "2024-01-15",
    doctor: "Dr. Emily Smith",
    department: "Cardiology",
    reason_for_visit: "Routine check-up",
    diagnosis: "Stable hypertension",
    treatments: [
      {
        treatment_type: "Medication",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
      },
    ],
    notes: "Continue with current medications.",
  },
  {
    record_id: 103,
    patient_id: 2,
    visit_date: "2024-01-15",
    doctor: "Dr. Emily Smith",
    department: "Cardiology",
    reason_for_visit: "Routine check-up",
    diagnosis: "Stable hypertension",
    treatments: [
      {
        treatment_type: "Medication",
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
      },
    ],
    notes: "Continue with current medications.",
  },
];

function CustomerTable() {
  const [data, setData] = useState<PatientHistory[]>(patients);

  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPatient, setAddPatient] = useState(false);
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Define the function before columns
  const handleViewRecords = (patientId: number) => {
    // Filter records for the selected patient
    const filteredRecords = medicalRecords.filter(
      (record) => record.patient_id === patientId
    );
    setRecords(filteredRecords);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAddPatient(false);
    setRecords([]);
  };

  // Define columns after handleViewRecords is declared
  const columnHelper = createColumnHelper<PatientHistory>();

  const columns = [
    columnHelper.accessor("patient_image", {
      cell: (info) => (
        <div className="flex gap-3 items-center">
          <Image
            src={info.getValue() ?? "/images/profile/user-5.jpg"}
            width={50}
            height={50}
            alt="icon"
            className="h-10 w-10 rounded-md"
          />
          <div className="truncate line-clamp-2 max-w-56">
            <h6 className="text-base">{info.row.original.name}</h6>
            <p className="text-sm text-darklink dark:text-bodytext">
              user-id: {info.row.original.id_card}
            </p>
          </div>
        </div>
      ),
      header: () => <span>ชื่อ-สกุล</span>,
    }),
    columnHelper.accessor("id_card", {
      cell: (info) => info.getValue(),
      header: () => <span>เลขบัตรประชาชน</span>,
    }),
    columnHelper.accessor("gender", {
      cell: (info) => info.getValue(),
      header: () => <span>เพศ</span>,
    }),
    columnHelper.accessor("phone", {
      cell: (info) => info.getValue(),
      header: () => <span>Phone</span>,
    }),
    columnHelper.accessor("address", {
      cell: (info) => info.getValue(),
      header: () => <span>Address</span>,
    }),
    columnHelper.accessor("nationality", {
      cell: (info) => info.getValue(),
      header: () => <span>สัญชาติ</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex justify-center items-center">
            <Tooltip content="ดูรายละเอียด" style="dark">
              <Link href={`/customer/${info.row.original.patient_id}`}>
                <IconEye className="cursor-pointer text-primary" />
              </Link>
            </Tooltip>
          </div>
          <div className="flex justify-center items-center">
            <Tooltip content="แก้ไขรายละเอียด" style="dark">
              <IconEdit
                className="cursor-pointer text-warning"
                onClick={() => {
                  setAddPatient(true);
                }}
              />
            </Tooltip>
          </div>

          {/* <Button color={"primary"}>รายละเอียด</Button>
          <Button color={"warning"}>แก้ไข</Button> */}
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDownload = () => {
    const headers = ["Name", "Gender", "Date of Birth", "Phone", "Address"];
    const rows = data.map((item) => [
      item.name,
      item.gender,
      item.dob,
      item.phone,
      item.address,
    ]);

    const csvContent = [
      "\uFEFF" + headers.join(","), // Add BOM for UTF-8 encoding
      ...rows.map((e) => e.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const date = new Date();

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `patient-records-${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CardBox>
      <div className="flex flex-row justify-end w-full py-2 gap-4">
        <Button
          color={"success"}
          onClick={() => {
            handleDownload;
          }}
        >
          Download
        </Button>
        <Button
          color={"primary"}
          onClick={() => {
            setAddPatient(true);
          }}
        >
          เพิ่มข้อมูล <IconPlus />
        </Button>
      </div>

      {/* <div className="flex justify-end pb-2 pr-2">
        <Button>เพิ่มคนไข้</Button>
      </div> */}
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Medical Records */}
      <Modal
        show={isModalOpen}
        onClose={closeModal}
        className="w-full"
        size={"7xl"}
      >
        <Modal.Header>รายละเอียดคนไข้</Modal.Header>
        <Modal.Body>
          <CustomerDetail />
        </Modal.Body>
      </Modal>
      <Drawer
        position="right"
        className="w-full sm:w-8/12 p-4 flex flex-col justify-between"
        open={isAddPatient}
        onClose={() => {
          setAddPatient(false);
        }}
      >
        <RegisterTabs setAddPatient={setAddPatient} />

        {/* Buttons Fixed at Bottom */}
      </Drawer>
    </CardBox>
  );
}

export default CustomerTable;
