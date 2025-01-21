"use client";
import SelectWithSearch from "@/app/components/shared/Autocomplete";
// import Autocomplete from "@/app/components/shared/Autocomplete";
import CardBox from "@/app/components/shared/CardBox";
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
import Province from "@/app/data/thai_provinces.json";
import Amphure from "@/app/data/thai_amphures.json";
import Tambon from "@/app/data/thai_tambons.json";
import InputSelection from "@/app/data/inputSelectOptions.json";
import React, { FormEvent, useState, ChangeEvent, useEffect } from "react";
interface Amphure {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}



const bloodGroup = ["A", "B", "O", "AB"];



interface GeneralDataProps {
  formData: { [key: string]: any }; // Allow flexibility
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>; // Match with formData
  handleSetFormData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralData: React.FC<GeneralDataProps> = ({
  formData,
  setFormData,
  handleSetFormData,
}) => {
  const newDate = new Date("2024-11-19T17:00:00.000Z");

  const [selectedProvince, setSelectedProvince] = useState("");
  const [amphures, setAmphures] = useState<Amphure[]>([]);
  const [selectedAmphure, setSelectedAmphure] = useState("");
  const [tambons, setTambons] = useState<any[]>([]);
  const [birthDateTest, setBirthDate] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [formData, setFormData] = useState({
  //   id_card: "",
  //   firstNameTH: "asdasd",
  //   lastNameTH: "",
  //   firstNameEN: "asdasd",
  //   lastNameEN: "",

  //   nickname: "",
  //   age: "",
  //   address: "",
  //   phone: "",
  //   birthDate: "",
  //   email: "",
  // });

  // const handleSetFormData = (event: FormEvent<HTMLInputElement>) => {
  //   const { id, value } = event.currentTarget;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  // const handleDateChange = (date: any) => {
  //   // const formattedDate = date.toLocaleDateString("en-CA", {
  //   //   year: "numeric",
  //   //   month: "2-digit",
  //   //   day: "2-digit",
  //   // });

  //   console.log(date.toISOString())

  //   // console.log(new Date(date).toISOString()); // Output: 2024-11-21
  // };

  useEffect(() => {
    handleProvinceChange(formData.province);
  }, [formData.province]);
  useEffect(() => {
    handleAmphureChange(formData.amphure);
  }, [formData.amphure]);
  useEffect(() => {
    const zip_code =
      tambons.find((t) => t.name_th === formData.tambons)?.zip_code || "";
    setFormData((prevData: any) => ({
      ...prevData,
      zip_code: zip_code, // Use computed property name for dynamic key
    }));
  }, [formData.tambons]);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "id_card":
        if (!/^\d{13}$/.test(value)) {
          return "ID card must be 13 numeric digits.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address.";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          return "Phone number must be 10 digits.";
        }
        break;
      case "firstNameTH":
      case "lastNameTH":
        if (value.trim() === "") {
          return "This field is required.";
        }
        break;
      case "birthDate":
        if (!value) {
          return "Please select a valid date.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);

    // Update errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));

    // Update formData
    handleSetFormData(e);
  };

  const handleProvinceChange = (provinceName: string) => {
    const selectedProvince = Province.find((p) => p.name_th === provinceName);

    if (selectedProvince) {
      const filteredAmphures = Amphure.filter(
        (a) => a.province_id === selectedProvince.id
      );
      setAmphures(filteredAmphures); // Update amphures
      setTambons([]); // Clear tambons
      setFormData((prevData) => ({
        ...prevData,
        province: provinceName,
        amphure: "",
        tambon: "",
        zip_code: "",
      }));
    }
  };

  // Handle Amphure Change
  const handleAmphureChange = (amphureName: string) => {
    const selectedAmphure = Amphure.find((a) => a.name_th === amphureName);

    if (selectedAmphure) {
      const filteredTambons = Tambon.filter(
        (t) => t.amphure_id === selectedAmphure.id
      );
      setTambons(filteredTambons); // Update tambons
      setFormData((prevData) => ({
        ...prevData,
        amphure: amphureName,
        tambon: "",
        zip_code: "",
      }));
    }
  };

  // Handle Tambon Change
  const handleTambonChange = (tambonName: string) => {
    const selectedTambon = Tambon.find((t) => t.name_th === tambonName);

    if (selectedTambon) {
      setFormData((prevData) => ({
        ...prevData,
        tambon: tambonName,
        zip_code: selectedTambon.zip_code, // Update zip code
      }));
    }
  };

  return (
    <div className="h-dvh overflow-y-auto">
      <h6 className="text-base sm:text-lg mb-2 sm:mb-0">ข้อมูลส่วนตัว</h6>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex w-full sm:w-3/12 items-center justify-center py-2">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
              {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p> */}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p> */}
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex sm:flex-row flex-col  w-full gap-4 pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="id_card" value="เลขบัตรประชาชน 13 หลัก" />
              </div>
              <TextInput
                required
                value={formData.id_card}
                onChange={handleValidation}
                id="id_card"
                type="text"
                sizing="md"
                className="form-rounded-md"
                color={errors.id_card ? "failure" : "success"}
                helperText={errors.id_card || ""}
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prefix" value="คำนำหน้า" />
              </div>
              {/* <Select
                id="prefix"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>นาย</option>
                <option>นาง</option>
                <option>นางสาว</option>
              </Select> */}
              <SelectWithSearch
                options={InputSelection.prefix}
                placeholder="เลือกคำนำหน้า"
                formValue={formData.prefix}
                setFormData={setFormData}
                field="prefix"
              />
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
          <div className="flex sm:flex-row flex-col w-full gap-4  pt-2">
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
          </div>
          <div className="flex sm:flex-row flex-col w-full gap-4 pt-2">
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="birthDate" value="วันเกิด" />
              </div>
              <Datepicker
                onSelectedDateChanged={(value: any) => {
                  setFormData((prevData: any) => ({
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

            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="สัญชาติ" />
              </div>
              {/* <Select
                id="nationality" // Match this with the key in formData
                onChange={(e: any) => {
                  handleSetFormData(e); // Pass the event to handleSetFormData
                }}
                value={formData.nationality} // Bind the value to formData
                required
                className="select-md"
              >
                <option value="ไทย">ไทย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
              </Select> */}
              <SelectWithSearch
                options={InputSelection.nation}
                placeholder="เลือกสัญชาติ"
                formValue={formData.nationality}
                setFormData={setFormData}
                field="nationality"
              />
            </div>

            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="ศาสนา" />
              </div>
              <SelectWithSearch
                options={InputSelection.religion}
                placeholder="เลือกศาสนา"
                formValue={formData.religion}
                setFormData={setFormData}
                field="religion"
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="หมู่เลือด" />
              </div>
              {/* <Select
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
              </Select> */}
              <SelectWithSearch
                options={bloodGroup}
                placeholder="เลือกหมู่เลือด"
                formValue={formData.bloodGroup}
                setFormData={setFormData}
                field="bloodGroup"
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col w-full gap-4  pt-2">
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
          <div className="flex sm:flex-row flex-col w-full gap-4  pt-2">
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
              {/* <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>ขอนแก่น</option>
              </Select> */}
              <SelectWithSearch
                options={Province.map((p) => p.name_th)}
                placeholder="Select Province"
                formValue={formData.province}
                setFormData={setFormData}
                field="province"
                onChange={(e) => handleProvinceChange(e.target.value)}
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="เขต/อำเภอ" />
              </div>
              {/* <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                className="select-md"
              >
                <option>เมืองขอนแก่น</option>
              </Select> */}
              <SelectWithSearch
                options={amphures.map((a) => a.name_th)}
                placeholder="Select Amphure"
                formValue={formData.amphure}
                setFormData={setFormData}
                field="amphure"
                onChange={(e) => handleAmphureChange(e.target.value)}
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="prename" value="แขวง/ตำบล" />
              </div>
              {/* <Select
                id="prename"
                onChange={(e) => {
                  handleSetFormData;
                }}
                required
                className="select-md"
              >
                <option>บ้านเป็ด</option>
              </Select> */}
              <SelectWithSearch
                options={tambons.map((t) => t.name_th)}
                placeholder="Select Tambon"
                formValue={formData.tambon}
                setFormData={setFormData}
                field="tambon"
                onChange={(e) => handleTambonChange(e.target.value)}
              />
            </div>
            <div className="w-full md:w-3/12">
              <div className="mb-2 block">
                <Label htmlFor="address" value="รหัสไปรษณีย์" />
              </div>
              <TextInput
                id="zip_code"
                type="text"
                value={formData.zip_code}
                readOnly
                className="form-rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralData;
