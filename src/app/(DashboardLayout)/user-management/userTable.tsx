"use client";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

import {
  Badge,
  Button,
  Label,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TabsRef,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import axios from "axios";

import {
  MedicalRecord,
  MessageError,
  AppSearnchModel,
  UserModel,
} from "@/utils/type/patientTypes";
import CardBox from "../../components/shared/CardBox";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/app/context/customizerContext";
import ModalError from "../layout/shared/modal-error/modalError";
import ModalLoading from "../layout/shared/modal-loading/modalLoading";
import ModalInformation from "../layout/shared/modal-information/modalInformation";
import ModalDelete from "../layout/shared/modal-delete/modalDelete";

export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};

function UserTable() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddPatient, setAddPatient] = useState(false);
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [isError, setIserror] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<UserModel>();
  const [editData, setEditData] = useState<UserModel | null>();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [userName, setUserName] = useState<{ [key: string]: string }>({
    fname: "",
    lname: "",
  });
  const [messageError, setmessageError] = useState<MessageError>({
    isError: false,
    message: "",
  });

  const [searnchApps, setSearnchApps] = useState<AppSearnchModel>({
    search_text: "",
    search_status: 1,
    page: 1,
    limit: 1000,
  });

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    us_username: "",
    us_password: "",
    us_confirmPass: "",
    us_email: "",
    us_fullname: "",
    us_phone: "",
    us_fname: "",
    us_lname: "",
    ap_status: 1,
  });

  const { t } = useTranslation();

  const { isLanguage } = useContext(CustomizerContext);

  const closeModal = () => {
    setIsModalOpen(false);
    setAddPatient(false);
    setDeleteModalOpen(false);
    setEditModal(false);
    setRecords([]);
    setFormData({
      us_username: "",
      us_password: "",
      us_confirmPass: "",
      us_email: "",
      us_fullname: "",
      us_phone: "",
      us_fname: "",
      us_lname: "",
      ap_status: 1,
    });
    setErrors({});
    setActiveTab(0);
    removeFile();
    setEditData(null);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files as FileList;
    setSelectedImage(file?.[0]);
    if (!file) {
      return;
    }
    try {
      const imgUrl = await fileToDataString(file?.[0]);
      formData.ap_logo = file?.[0].name;
      setPreviewimgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFile = () => {
    setPreviewimgUrl("");
    setSelectedImage(null);
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

  const handleSearnch = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case "search_text":
        searnchApps.search_text = value;
        break;
      case "search_status":
        searnchApps.search_status = parseInt(value);
        break;
      default:
        break;
    }

    const accessToken = localStorage.getItem("access_token");
    apiGetAllUsers(accessToken || "");
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "us_fname":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter User Name English";
        } else {
          setIserror(false);
        }
        break;
      case "us_lname":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter User Name English";
        } else {
          setIserror(false);
        }
        break;
      case "us_password":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter Password";
        } else {
          setIserror(false);
          if (formData.us_confirmPass != "") {
            if (value != formData.us_confirmPass) {
              return "ErrorConfirmPass";
            } else {
              errors.us_confirmPass = "";
            }
          }
        }
        break;
      case "us_confirmPass":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter Password";
        } else {
          setIserror(false);
          if (formData.us_password != "") {
            if (value != formData.us_password) {
              return "ErrorConfirmPass";
            } else {
              errors.us_password = "";
            }
          }
        }
        break;
      case "us_phone":
        if (!/^\d{10}$/.test(value)) {
          setIserror(true);
          return "ErrorPhoneNumber";
        } else {
          setIserror(false);
        }
        break;
      case "us_email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setIserror(true);
          return "ErrorEmailVaid";
        } else {
          setIserror(false);
        }
        break;
      default:
        setIserror(false);
        return "";
    }
    return "";
  };

  const apiGetAllUsers = async (access_token: string) => {
    try {
      if (access_token != "") {
        setIsLoading(true);
        const payload = searnchApps;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/pagination`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          setUserList(response.data.data.items || []);
        } else {
          setmessageError({
            isError: true,
            message: response.data.message,
          });
        }
        setIsLoading(false);
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM post /user/pagination"
      );
    }
  };

  const apiDeleteUser = async (access_token: string, id: String) => {
    try {
      if (access_token != "") {
        const payload = "";
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        closeModal();
        if (response.data.status == "success") {
          apiGetAllUsers(access_token);
        } else {
          setmessageError({
            isError: true,
            message: response.data.message,
          });
        }
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM delete /user/:id"
      );
    }
  };

  const apiCreateUser = async (access_token: string) => {
    try {
      if (access_token != "") {
        const payload = formData;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          closeModal();
          apiGetAllUsers(access_token);
        } else {
          setIsModalOpen(false);
          setmessageError({
            isError: true,
            message: response.data.message,
          });
        }
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM  post /user"
      );
    }
  };

  const apiUpdateUser = async (access_token: string) => {
    try {
      if (access_token != "") {
        const payload = formData;
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${editData?.us_id}`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          closeModal();
          apiGetAllUsers(access_token);
        } else {
          setIsModalOpen(false);
          setmessageError({
            isError: true,
            message: response.data.message,
          });
        }
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM update /user/:id"
      );
    }
  };

  const handleSetFormData = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // console.log(formData);
  };

  const handleSubmitFormData = () => {
    if (!isError) {
      const accessToken = localStorage.getItem("access_token") || "";
      formData.us_username = formData.us_fname + formData.us_lname;
      formData.us_fullname = formData.us_fname + " " + formData.us_lname;
      if (editData != null) {
        apiUpdateUser(accessToken);
      } else {
        apiCreateUser(accessToken);
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || "";
    apiGetAllUsers(accessToken);
  }, []);

  return (
    <CardBox>
      <div className="flex flex-row justify-between w-full py-2 gap-4">
        <div className="w-2/3 flex justify-around">
          <div className="w-1/2 px-2">
            <div className="mb-2 pt-2">
              <Label htmlFor="search_text" value={`${t("User Name")}`} />
            </div>
            <TextInput
              onBlur={handleSearnch}
              placeholder={`${t("Search")}, ${t("User Name")}, ${t(
                "Name"
              )}, ${t("Phone Number")}, ${t("Email")}`}
              id="search_text"
              type="text"
              sizing="md"
              className={`form-rounded-md text-primary`}
            />
          </div>
          <div className="w-1/2 px-2">
            <div className="my-2">
              <Label htmlFor="search_status" value={t("Status")} />
            </div>
            <Select
              id="search_status"
              onChange={(e) => {
                searnchApps.search_status = parseInt(e.target.value);
                const accessToken = localStorage.getItem("access_token");
                apiGetAllUsers(accessToken || "");
              }}
              required
              className="select-md"
            >
              <option value={1}>{t("Active")}</option>
              <option value={0}>{t("Inactive")}</option>
            </Select>
          </div>
        </div>
        <div className="mt-8">
          <Button
            color={"primary"}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {t("Add User")} <IconPlus />
          </Button>
        </div>
      </div>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-auto h-[calc(70vh_-_85px)] r-4 shadow-md rounded   ">
          <Table>
            <TableHead className={`dark:bg-cyan-700`}>
              <TableHeadCell className="flex justify-center items-center">
                {t("Number")}
              </TableHeadCell>
              <TableHeadCell>{t("User Name")}</TableHeadCell>
              <TableHeadCell>{t("Name")}</TableHeadCell>
              <TableHeadCell>{t("ID")}</TableHeadCell>
              <TableHeadCell>{t("Phone Number")}</TableHeadCell>
              <TableHeadCell>{t("Email")}</TableHeadCell>
              <TableHeadCell>{t("Status")}</TableHeadCell>
              <TableHeadCell className="flex justify-center">
                Action
              </TableHeadCell>
            </TableHead>
            {userList.length > 0 ? (
              <>
                {" "}
                <TableBody>
                  {userList.map((item, index) => (
                    <TableRow
                      key={item.us_id}
                      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                    >
                      <TableCell>
                        <div className="flex justify-center ">{index + 1}</div>
                      </TableCell>
                      <TableCell>{item.us_username}</TableCell>
                      <TableCell>{item.us_fullname}</TableCell>
                      <TableCell>{item.us_id}</TableCell>
                      <TableCell>{item.us_phone}</TableCell>
                      <TableCell>{item.us_email}</TableCell>
                      <TableCell>
                        {item.us_status == 1 ? (
                          <>
                            <Badge color="primary">{t("Active")}</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="failure">{t("Inactive")}</Badge>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.us_delete == "" || item.us_delete == null ? (
                          <>
                            {" "}
                            <div className="flex flex-col  items-center justify-center sm:flex-row gap-4 ">
                              <div className="flex justify-center items-center">
                                <Tooltip content={t("Edit")} style="dark">
                                  <IconEdit
                                    className="cursor-pointer text-primary"
                                    onClick={() => {
                                      setEditData(item);
                                      let us_fname = "";
                                      let us_lname = "";
                                      if (item.us_fullname != "") {
                                        let list = item.us_fullname.split(" ");
                                        us_fname = list[0];
                                        us_lname = list[1];
                                      }
                                      formData.us_username = item.us_username;
                                      formData.us_password = item.us_password;
                                      formData.us_phone = item.us_phone;
                                      formData.us_fname = us_fname;
                                      formData.us_lname = us_lname;
                                      formData.us_email = item.us_email;
                                      formData.ap_status = item.us_status;
                                      setUserName({
                                        fname: us_fname,
                                        lname: us_lname,
                                      });
                                      setIsModalOpen(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                              <div className="flex justify-center items-center">
                                <Tooltip content={t("Delete")} style="dark">
                                  <IconTrash
                                    className="cursor-pointer secondary hover:text-error"
                                    onClick={() => {
                                      setDeleteModalOpen(true);
                                      setDeleteId(item);
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="w-full flex justify-center items-center">
                              <Badge color="failure">{t("Data Deleted")}</Badge>
                            </div>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <></>
            )}
          </Table>
        </div>
      </div>

      {/* Modal for add and edit app*/}
      <ModalInformation
        show={isModalOpen}
        title={editData != null ? "Update User" : "Add User"}
        modalSize="2xl"
        submitFunc={() => {
          handleSubmitFormData();
        }}
        cancelFunc={() => {
          closeModal();
        }}
      >
        <div className="h-fit mb-4">
          <div className=" w-full flex flex-col">
            <div className="w-full">
              <div className="w-full flex justify-between">
                <div className="w-full  my-2 mr-2">
                  <div className="mb-2 pt-2">
                    <Label htmlFor="us_fname" value={`${t("First Name")} EN`} />
                  </div>
                  <TextInput
                    required
                    onBlur={handleValidation}
                    placeholder={`${t("First Name")} EN`}
                    id="us_fname"
                    type="text"
                    sizing="md"
                    defaultValue={formData.us_fname}
                    className={`form-rounded-md text-primary`}
                    color={errors.us_fname ? "failure" : "success"}
                    helperText={t(errors.us_fname) || ""}
                  />
                </div>
                <div className="w-full  my-2 ml-2">
                  <div className="mb-2 pt-2">
                    <Label htmlFor="us_lname" value={`${t("Last Name")} EN`} />
                  </div>
                  <TextInput
                    required
                    onBlur={handleValidation}
                    placeholder={`${t("Last Name")} EN`}
                    id="us_lname"
                    type="text"
                    sizing="md"
                    defaultValue={formData.us_lname}
                    className={`form-rounded-md text-primary`}
                    color={errors.us_lname ? "failure" : "success"}
                    helperText={t(errors.us_lname) || ""}
                  />
                </div>
              </div>
              {editData == null && (
                <div>
                  <div className="w-full my-2">
                    <div className="mb-2">
                      <Label htmlFor="us_password" value={t("Password")} />
                    </div>
                    <TextInput
                      onBlur={handleValidation}
                      placeholder={t("Password")}
                      id="us_password"
                      type="password"
                      sizing="md"
                      defaultValue={formData.us_password}
                      className="form-rounded-md text-primary"
                      color={errors.us_password ? "failure" : "success"}
                      helperText={t(errors.us_password) || ""}
                    />
                  </div>
                  <div className="w-full my-2">
                    <div className="mb-2">
                      <Label
                        htmlFor="us_confirmPass"
                        value={t("Confirm Password")}
                      />
                    </div>
                    <TextInput
                      onBlur={handleValidation}
                      placeholder={t("Confirm Password")}
                      id="us_confirmPass"
                      type="password"
                      sizing="md"
                      className="form-rounded-md text-primary"
                      defaultValue={formData.us_confirmPass}
                      color={errors.us_confirmPass ? "failure" : "success"}
                      helperText={t(errors.us_confirmPass) || ""}
                    />
                  </div>
                </div>
              )}
              <div>
                <div className="w-full my-2">
                  <div className="mb-2">
                    <Label htmlFor="us_phone" value={t("Phone Number")} />
                  </div>
                  <TextInput
                    disabled={editData != null}
                    onBlur={handleValidation}
                    placeholder={t("Phone Number")}
                    id="us_phone"
                    type="text"
                    sizing="md"
                    maxLength={10}
                    defaultValue={formData.us_phone}
                    className="form-rounded-md text-primary"
                    color={errors.us_phone ? "failure" : "success"}
                    helperText={t(errors.us_phone) || ""}
                  />
                </div>
                <div className="w-full my-2">
                  <div className="mb-2">
                    <Label htmlFor="us_email" value={t("Email")} />
                  </div>
                  <TextInput
                    disabled={editData != null}
                    onBlur={handleValidation}
                    placeholder={t("Example@gmail.com")}
                    id="us_email"
                    type="text"
                    sizing="md"
                    className="form-rounded-md text-primary"
                    defaultValue={formData.us_email}
                    color={errors.us_email ? "failure" : "success"}
                    helperText={t(errors.us_email) || ""}
                  />
                </div>
              </div>
            </div>
            {editData != null && (
              <div>
                <div className="my-2">
                  <Label htmlFor="us_status" value={t("Status")} />
                </div>
                <Select
                  id="us_status"
                  onChange={(e) => {
                    formData.us_status = parseInt(e.target.value);
                  }}
                  required
                  className="select-md"
                >
                  <option value={1} selected={formData.ap_status == 1}>
                    {t("Active")}
                  </option>
                  <option value={0} selected={formData.ap_status == 0}>
                    {t("Inactive")}
                  </option>
                </Select>
              </div>
            )}
          </div>
        </div>
      </ModalInformation>
      {/* Model for delete app */}
      <ModalDelete
        show={deleteModalOpen}
        title="Delete User"
        detail={deleteId?.us_fullname || ""}
        modalSize="xl"
        submitFunc={() => {
          closeModal();
          if (deleteId != null) {
            const accessToken = localStorage.getItem("access_token") || "";
            apiDeleteUser(accessToken, deleteId?.us_id);
          }
        }}
        cancelFunc={() => {
          closeModal();
        }}
      />
      <ModalError
        show={messageError.isError}
        content={messageError.message}
        cancelFunc={() => {
          setmessageError({
            isError: false,
            message: "",
          });
        }}
      />
      <ModalLoading show={isLoading} />
    </CardBox>
  );
}

export default UserTable;
