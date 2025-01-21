import PatientRegister from "@/app/components/medical-records/Patient-register";
import CardBox from "@/app/components/shared/CardBox";
import { Button, HR, Tabs, TabsRef } from "flowbite-react";
import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import DoctorNote from "./tab-menu/doctor-note";
import Contact from "./tab-menu/contact";
import GeneralData from "./tab-menu/general-data";
import HealthData from "./tab-menu/health-data";
import Province from "@/app/data/thai_provinces.json"
import { HiUserCircle } from "react-icons/hi";

interface RegisterTabsProp {
    setAddPatient: Dispatch<SetStateAction<boolean>>; // Correct type for useState setter
  }



const RegisterTabs:React.FC<RegisterTabsProp> = ({setAddPatient}) => {

    const [formData, setFormData] = useState<{ [key: string]: any }>({
        id_card: "",
        prefix: "",
        firstNameTH: "",
        lastNameTH: "",
        firstNameEN: "",
        lastNameEN: "",
        religion:"",
        province:"",
        nickname: "",
        age: "",
        address: "",
        phone: "",
        birthDate: "",
        email: "",
        nationality:"ไทย",
        bloodGroup:"O",
        mental_health:""
      });


      console.log(formData)
    
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

    const handleSetFormData = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(formData)
  };

  const handleSubmitFormData = () => {
    console.log(formData)
  }
  return (
    <div className="p-4">
      <div className="sticky -bottom-4 mb-4">
        <h6 className=" text-2xl ml-1">เพิ่มข้อมูล</h6>
      </div>
     <hr className="my-2"/>
      
        <Tabs ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}   variant="underline">
          <Tabs.Item active={activeTab === 0} title="ข้อมูลทั่วไป" className="w-28"  icon={HiUserCircle}>
            <GeneralData handleSetFormData={handleSetFormData} formData={formData} setFormData={setFormData}  />
          </Tabs.Item>
          <Tabs.Item title="ข้อมูลสุขภาพ" icon={HiUserCircle}>
            <HealthData handleSetFormData={handleSetFormData} formData={formData} setFormData={setFormData}  />
          </Tabs.Item>
          <Tabs.Item title="โน๊ต" icon={HiUserCircle}>
            <DoctorNote handleSetFormData={handleSetFormData} formData={formData} setFormData={setFormData} />
          </Tabs.Item>
          <Tabs.Item title="ข้อมูลติดต่อ" icon={HiUserCircle}>
            <Contact />
          </Tabs.Item>
        </Tabs>
      
      <div
          className="sticky -bottom-4  bg-white flex flex-row justify-end gap-4 border-t border-gray-300 pt-4"
          style={{ paddingBottom: "16px" }} // Optional for spacing
        >
          <Button
            color="success"
            onClick={() => {
              handleSubmitFormData();
              // setAddPatient(false);
            }}
          >
            บันทึก
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setActiveTab(0);
              setAddPatient(false);
            }}
          >
            ยกเลิก
          </Button>
        </div>
    </div>
  );
};

export default RegisterTabs;
