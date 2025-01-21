"use client";
import {
  Button,
  Datepicker,
  FileInput,
  HR,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { FormEvent, useState, ChangeEvent } from "react";
import CardBox from "../shared/CardBox";
// import Autocomplete from "../shared/Autocomplete";

const suggestionsList = ["Male", "Female", "Other", "Non-Binary", "Prefer Not to Say"];

const PatientRegister = () => {

  const [birthDateTest, setBirthDate] = useState("");
  const [formData, setFormData] = useState({
    id_card: "",
    firstNameTH: "asdasd",
    lastNameTH: "",
    firstNameEN: "asdasd",
    lastNameEN: "",

    nickname: "",
    age: "",
    address: "",
    phone: "",
    birthDate: "",
    email: "",
  });

  const handleSetFormData = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // const handleDateChange = (date: any) => {
  //   // const formattedDate = date.toLocaleDateString("en-CA", {
  //   //   year: "numeric",
  //   //   month: "2-digit",
  //   //   day: "2-digit",
  //   // });

  //   console.log(date.toISOString())

  //   // console.log(new Date(date).toISOString()); // Output: 2024-11-21
  // };

  return (
    <div className="h-screen overflow-y-auto">
      <h6 className="text-base sm:text-lg mb-2 sm:mb-0">ข้อมูลส่วนตัว</h6>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex w-3/12 items-center justify-center py-2">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className=" roumb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full gap-4 pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="id_card" value="เลขบัตรประชาชน 13 หลัก" />
              </div>
              <TextInput
                value={formData.id_card}
                onChange={handleSetFormData}
                id="id_card"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="คำนำหน้า" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>นาย</option>
                <option>นาง</option>
                <option>นางสาว</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="firstNameTH" value="ชื่อ" />
              </div>
              <TextInput
                value={formData.firstNameTH}
                onChange={handleSetFormData}
                id="firstNameTH"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="lastNameTH" value="นามสกุล" />
              </div>
              <TextInput
                value={formData.lastNameTH}
                onChange={handleSetFormData}
                id="lastNameTH"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row w-full gap-4  pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="firstNameEN" value="ชื่อ (EN)" />
              </div>
              <TextInput
                value={formData.firstNameEN}
                onChange={handleSetFormData}
                id="firstNameEN"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="lastNameEN" value="นามสกุล (EN)" />
              </div>
              <TextInput
                value={formData.lastNameEN}
                onChange={handleSetFormData}
                id="lastNameEN"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="nickname" value="ชื่อเล่น" />
              </div>
              <TextInput
                required
                value={formData.nickname}
                onChange={handleSetFormData}
                id="nickname"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="birthDate" value="วันเกิด" />
              </div>
              <Datepicker
                onSelectedDateChanged={(value: any) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    birthDate: value,
                  }));
                }}
                language="th"
                labelTodayButton="วันนี้"
                labelClearButton="ล้าง"
                id="birthDate"
                className="form-rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row w-full gap-4 pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="id_card" value="เพศ" />
              </div>
              <TextInput
                value={formData.id_card}
                onChange={handleSetFormData}
                id="id_card"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="สัญชาติ" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>ไทย</option>
                <option>นาง</option>
                <option>นางสาว</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="ศาสนา" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>พุทธ</option>
                <option>นาง</option>
                <option>นางสาว</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="หมู่เลือด" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>โอ</option>
                <option>เอ</option>
                <option>บี</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-row w-full gap-4  pt-2">
            <div className="w-full md:w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="email" value="อีเมล์" />
              </div>
              <TextInput
                value={formData.email}
                onChange={handleSetFormData}
                id="email"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="phone" value="เบอร์โทรศัพท์ 1" />
              </div>
              <TextInput
                value={formData.phone}
                onChange={handleSetFormData}
                id="phone"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="phone" value="เบอร์โทรศัพท์ 2" />
              </div>
              <TextInput
                required
                value={formData.phone}
                onChange={handleSetFormData}
                id="phone"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            {/* <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="birthDate" value="วันเกิด" />
              </div>
              <Datepicker
                onSelectedDateChanged={(value: any) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    birthDate: value,
                  }));
                }}
                language="th"
                labelTodayButton=" "
                labelClearButton="ล้าง"
                id="birthDate"
                className="form-rounded-md"
              />
            </div> */}
          </div>
          <div className="flex flex-row w-full gap-4  pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="address" value="ที่อยู่" />
              </div>
              <TextInput
                value={formData.address}
                onChange={handleSetFormData}
                id="address"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="จังหวัด" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>ขอนแก่น</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="เขต/อำเภอ" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>เมืองขอนแก่น</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="แขวง/ตำบล" />
              </div>
              <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>บ้านเป็ด</option>
              </Select>
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="address" value="รหัสไปรษณีย์" />
              </div>
              <TextInput
                disabled
                value={formData.address}
                onChange={handleSetFormData}
                id="address"
                type="text"
                sizing="md"
                className="form-rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <HR />
      <h6 className="text-base sm:text-lg mb-2 sm:mb-0">ข้อมูลสุขภาพ</h6>
      <div className="flex flex-row w-full gap-4 pt-2">
        
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="ประเภทสิทธิ์การรักษาหลัก" />
          </div>
          <Select
            id="prename"
            onChange={(e) => {
              handleSetFormData;
            }}
            required
            className="select-md"
          >
            <option>อื่นๆ (รอยืนยันสิทธิ)</option>
          </Select>
        </div>
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="prename" value="ประเภทสิทธิ์การรักษารอง" />
          </div>
          <Select
            id="prename"
            onChange={(e) => {
              handleSetFormData;
            }}
            required
            className="select-md"
          >
            <option>อื่นๆ (รอยืนยันสิทธิ)</option>
          </Select>
        </div>
      </div>
      {/* <div className="flex flex-row w-full gap-4 pt-2">
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="id_card" value="ประวัติการแพ้ยา" />
          </div>
          <Textarea 
            value={formData.id_card}
            // onChange={handleSetFormData}
            id="id_card"
            // type="text"
            // sizing="md"
            className="form-control-textarea"
          />
        </div>
       
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="id_card" value="ประวัติสุขภาพจิต" />
          </div>
          <Textarea 
            value={formData.id_card}
            // onChange={handleSetFormData}
            id="id_card"
            // type="text"
            // sizing="md"
            className="form-control-textarea"
          />
        </div>
       
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="id_card" value="โรคประจำตัว" />
          </div>
          <Textarea 
            value={formData.id_card}
            // onChange={handleSetFormData}
            id="id_card"
            // type="text"
            // sizing="md"
            className="form-control-textarea"
          />
        </div>
       
        <div className="w-full md:w-4/12">
          <div className="mb-2 block">
            <Label htmlFor="id_card" value="หมายเหตุ" />
          </div>
          <Textarea 
            value={formData.id_card}
            // onChange={handleSetFormData}
            id="id_card"
            // type="text"
            // sizing="md"
            className="form-control-textarea"
          />
        </div>
       
      </div> */}
      <HR />

      {/* <Autocomplete suggestions={suggestionsList}/> */}
      <div className="flex justify-start">
            <Button>
              บันทึก
            </Button>
      </div>
    </div>
  );
};

export default PatientRegister;
