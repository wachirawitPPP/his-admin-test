import { Icon } from "@iconify/react/dist/iconify.js";
import { Label, TextInput } from "flowbite-react";
import { t } from "i18next";
import React, { useState } from "react";
interface menuType {
  mng_id: string;
  mng_name_th: string;
  mng_name_en: string;
  mng_icon: string;
  mng_sort: number;
  mng_status: number;
  mng_delete: string;
  app_id: number;
  action: any;
}

interface MenuformProps {
  formData: { [key: string]: any }; // Allow flexibility
  selectedMenu: menuType;
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>; // Match with formData
  handleSetFormData?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const MenuForm: React.FC<MenuformProps> = ({
  selectedMenu,
  formData,
  setFormData,
}) => {
  const handleSetFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field by name
    }));
  };
  //   const handleSubmitFormData = () => {
  //     console.log(formData);
  //   };
  return (
    <div className="h-fit mb-4">
      <div className=" w-full flex flex-col">
        <div className="w-full">
          <div className="w-full  my-2">
            <div className="mb-2">
              <Label htmlFor="menu_name_th" value={t("Menu Name (th)")} />
            </div>
            <TextInput
              required
              placeholder={t("Menu Name (th)")}
              id="menu_name_th"
              name="name_th" // Add name attribute
              type="text"
              sizing="md"
              className="form-rounded-md"
              value={formData.name_th}
              onChange={handleSetFormData}
            />
          </div>
          <div className="w-full  my-2">
            <div className="mb-2">
              <Label htmlFor="menu_name_en" value={t("Menu Name (en)")} />
            </div>
            <TextInput
              required
              //  onBlur={handleSetFormData}
              placeholder={t("Menu Name (en)")}
              id="menu_name_en"
              name="name_en"
              type="text"
              sizing="md"
              className="form-rounded-md"
              value={formData.name_en}
              onChange={handleSetFormData}
              //  color={errors.ap_name ? "failure" : "success"}
              //  helperText={errors.ap_name || ""}
            />
          </div>
          <div className="w-full  my-2">
            <div className="mb-2">
              <Label htmlFor="menu_icon" value={t("Icon")} />
            </div>
            <TextInput
              required
              //  onBlur={handleSetFormData}
              placeholder={t("Icon")}
              id="menu_icon"
              name="icon"
              type="text"
              sizing="md"
              className="form-rounded-md"
              value={formData.icon}
              onChange={handleSetFormData}
              //  color={errors.ap_name ? "failure" : "success"}
              //  helperText={errors.ap_name || ""}
            />
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="flex items-center justify-center w-full">
            {/* <div className="flex flex-col items-center justify-center w-full h-72 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                     {showImg && (
                       <div className="w-full flex justify-end px-4">
                         <Icon
                           icon="tabler:xbox-x"
                           className="text-error"
                           height={24}
                           onClick={() => removeFile()}
                         />
                       </div>
                     )}
                     {previewImgUrl != "" ? (
                       <div className="image_wrapper">
                         <img src={previewImgUrl} className="size-56" />
                       </div>
                     ) : (
                       <Label
                         className="flex flex-col items-center justify-center pt-5 pb-6"
                         htmlFor="dropzone-file"
                       >
                         <svg
                           className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 20 16"
                         >
                           <path
                             stroke="currentColor"
                             stroke-linecap="round"
                             stroke-linejoin="round"
                             stroke-width="2"
                             d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                           />
                         </svg>
                         <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                           <span className="font-semibold">Click to upload</span> or
                           drag and drop
                         </p>
                         <p className="text-xs text-gray-500 dark:text-gray-400">
                           PNG, JPG
                         </p>
                       </Label>
                     )}
       
                     <input
                       id="dropzone-file"
                       type="file"
                       className="hidden"
                       onChange={handleFileChange}
                     />
                   </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;
