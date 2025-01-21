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
  AppModel,
  MessageError,
  AppSearnchModel,
  ModalViewModel,
} from "@/utils/type/patientTypes";
import CardBox from "../../components/shared/CardBox";
import { useTranslation } from "react-i18next";
import { CustomizerContext } from "@/app/context/customizerContext";
import ModalError from "../layout/shared/modal-error/modalError";
import ModalLoading from "../layout/shared/modal-loading/modalLoading";
import ModalInformation from "../layout/shared/modal-information/modalInformation";
import ModalView from "../layout/shared/modal-view/modalView";
import ModalDelete from "../layout/shared/modal-delete/modalDelete";

export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};

function AppTable() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddPatient, setAddPatient] = useState(false);
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [appList, setAppList] = useState<AppModel[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const [isError, setIserror] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<AppModel>();
  const [editData, setEditData] = useState<AppModel | null>();
  const [messageError, setmessageError] = useState<MessageError>({
    isError: false,
    message: "",
  });

  const [isModalView, setIsmodalView] = useState<ModalViewModel>({
    show: false,
    imgSrc: "",
  });

  const [searnchApps, setSearnchApps] = useState<AppSearnchModel>({
    search_text: "",
    search_status: 1,
    page: 1,
    limit: 1000,
  });

  const { t } = useTranslation();

  const { isLanguage } = useContext(CustomizerContext);

  const closeModal = () => {
    setIsModalOpen(false);
    setAddPatient(false);
    setDeleteModalOpen(false);
    setEditModal(false);
    setRecords([]);
    setIsmodalView({
      show: false,
      imgSrc: "",
    });
    setFormData({
      ap_name_th: "",
      ap_name_en: "",
      ap_logo: "",
      ap_callback_url: "",
      ap_url: "",
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
      formData.ap_logo = "/AppLogo/" + file?.[0].name;
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
    apiGetAllApps(accessToken || "");
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "ap_name_en":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter App Name English";
        } else {
          setIserror(false);
        }
        break;
      case "ap_name_th":
        if (value.trim() === "") {
          setIserror(true);
          return "Please Enter App Name Thai";
        } else {
          setIserror(false);
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setIserror(true);
          return "Please enter a valid email address.";
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

  const apiGetAllApps = async (access_token: string) => {
    try {
      if (access_token != "") {
        setIsLoading(true);
        const payload = searnchApps;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/apps/pagination`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          setAppList(response.data.data.items || []);
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
        error.response?.data?.message || "ERROR FROM post /apps/pagination"
      );
    }
  };
  const apiDeleteApp = async (access_token: string, id: String) => {
    try {
      if (access_token != "") {
        const payload = "";
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/apps/${id}`,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        closeModal();
        if (response.data.status == "success") {
          apiGetAllApps(access_token);
        } else {
          setmessageError({
            isError: true,
            message: response.data.message,
          });
        }
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM delete /apps/:id"
      );
    }
  };

  const apiCreateApps = async (access_token: string) => {
    try {
      if (access_token != "") {
        const payload = formData;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/apps`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          closeModal();
          apiGetAllApps(access_token);
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
        error.response?.data?.message || "ERROR FROM  post /apps"
      );
    }
  };

  const apiUpdateApps = async (access_token: string) => {
    try {
      if (access_token != "") {
        const payload = formData;
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/apps/${editData?.ap_id}`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "success") {
          closeModal();
          apiGetAllApps(access_token);
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
        error.response?.data?.message || "ERROR FROM update /apps/:id"
      );
    }
  };

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    ap_name_th: "",
    ap_name_en: "",
    ap_logo: "",
    ap_callback_url: "",
    ap_url: "",
    ap_status: 1,
  });

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
      if (editData != null) {
        apiUpdateApps(accessToken);
      } else {
        apiCreateApps(accessToken);
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    apiGetAllApps(accessToken || "");
  }, []);

  return (
    <CardBox>
      <div className="flex flex-row justify-between w-full py-2 gap-4">
        <div className="w-2/3 flex justify-around">
          <div className="w-1/2 px-2">
            <div className="mb-2 pt-2">
              <Label htmlFor="search_text" value={`${t("App Name")}`} />
            </div>
            <TextInput
              onBlur={handleSearnch}
              placeholder={`${t("Search")}, ${t("App Name")} EN, ${t(
                "App Name"
              )} TH, ${t("ID")}, ${t("Url")}, ${t("Callback Url")}`}
              id="search_text"
              type="text"
              sizing="md"
              className={`form-rounded-md text-primary `}
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
                apiGetAllApps(accessToken || "");
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
            {t("Add App")} <IconPlus />
          </Button>
        </div>
      </div>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-auto h-[calc(70vh_-_85px)] r-4 shadow-md rounded   ">
          <Table>
            <TableHead className={`dark:bg-cyan-700`}>
              <TableHeadCell className="flex justify-center">
                {t("Number")}
              </TableHeadCell>
              <TableHeadCell>{t("App Logo")}</TableHeadCell>
              <TableHeadCell>{t("App Name")} EN</TableHeadCell>
              <TableHeadCell>{t("App Name")} TH</TableHeadCell>
              <TableHeadCell>{t("ID")}</TableHeadCell>
              <TableHeadCell>{t("Url")}</TableHeadCell>
              <TableHeadCell>{t("Callback Url")}</TableHeadCell>
              <TableHeadCell>{t("Status")}</TableHeadCell>
              <TableHeadCell className="flex justify-center">
                Action
              </TableHeadCell>
            </TableHead>
            {appList.length > 0 ? (
              <>
                {" "}
                <TableBody>
                  {appList.map((item, index) => (
                    <TableRow
                      key={item.ap_id}
                      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                    >
                      <TableCell>
                        <div className="flex justify-center ">{index + 1}</div>
                      </TableCell>
                      <TableCell>
                        {item.ap_logo == "" ? (
                          <div
                            className="flex justify-center"
                            onClick={() => {
                              setIsmodalView({
                                show: true,
                                imgSrc: "",
                              });
                            }}
                          >
                            <Icon
                              icon="tabler:photo-circle"
                              className="text-primary"
                              height={36}
                            />
                          </div>
                        ) : (
                          <div
                            className="flex justify-center"
                            onClick={() => {
                              setIsmodalView({
                                show: true,
                                imgSrc: item.ap_logo,
                              });
                            }}
                          >
                            <Icon
                              icon="tabler:photo-circle"
                              className="text-primary"
                              height={36}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{item.ap_name_en}</TableCell>
                      <TableCell>{item.ap_name_th}</TableCell>
                      <TableCell>{item.ap_id}</TableCell>
                      <TableCell>{item.ap_url}</TableCell>
                      <TableCell>{item.ap_callback_url}</TableCell>
                      <TableCell>
                        {item.ap_status == 1 ? (
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
                        {item.ap_delete == "" || item.ap_delete == null ? (
                          <>
                            {" "}
                            <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
                              <div className="flex justify-center items-center">
                                <Tooltip content={t("Edit")} style="dark">
                                  <IconEdit
                                    className="cursor-pointer text-primary"
                                    onClick={() => {
                                      setEditData(item);
                                      formData.ap_name_en = item.ap_name_en;
                                      formData.ap_name_th = item.ap_name_th;
                                      formData.ap_logo = item.ap_logo;
                                      formData.ap_url = item.ap_url;
                                      formData.ap_callback_url =
                                        item.ap_callback_url;
                                      formData.ap_status = item.ap_status;
                                      setPreviewimgUrl(item.ap_logo);
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
        title={editData != null ? "Update App" : "Add App"}
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
              <div className="w-full  my-2">
                <div className="mb-2 pt-2">
                  <Label htmlFor="ap_name_en" value={`${t("App Name")} EN`} />
                </div>
                <TextInput
                  required
                  onBlur={handleValidation}
                  placeholder={`${t("App Name")} EN`}
                  id="ap_name_en"
                  type="text"
                  sizing="md"
                  defaultValue={formData.ap_name_en}
                  className={`form-rounded-md text-primary placeholder:text-red`}
                  color={errors.ap_name_en ? "failure" : "success"}
                  helperText={t(errors.ap_name_en) || ""}
                />
              </div>
              <div className="w-full  my-2">
                <div className="mb-2 pt-2">
                  <Label htmlFor="ap_name_th" value={`${t("App Name")} TH`} />
                </div>
                <TextInput
                  required
                  onBlur={handleValidation}
                  placeholder={`${t("App Name")} TH`}
                  id="ap_name_th"
                  type="text"
                  sizing="md"
                  defaultValue={formData.ap_name_th}
                  className={`form-rounded-md text-primary`}
                  color={errors.ap_name_th ? "failure" : "success"}
                  helperText={t(errors.ap_name_th) || ""}
                />
              </div>
              <div className="w-full my-2">
                <div className="mb-2">
                  <Label htmlFor="ap_url" value={t("Url")} />
                </div>
                <TextInput
                  onBlur={handleSetFormData}
                  placeholder="http://localhost:3000/login"
                  id="ap_url"
                  type="text"
                  sizing="md"
                  defaultValue={formData.ap_url}
                  className="form-rounded-md text-primary"
                  color={errors.ap_url ? "failure" : "success"}
                  helperText={t(errors.ap_url) || ""}
                />
              </div>
              <div className="w-full my-2">
                <div className="mb-2">
                  <Label htmlFor="ap_callback_url" value={t("Callback Url")} />
                </div>
                <TextInput
                  onBlur={handleSetFormData}
                  placeholder="http://localhost:3000/login"
                  id="ap_callback_url"
                  type="text"
                  sizing="md"
                  className="form-rounded-md text-primary"
                  defaultValue={formData.ap_callback_url}
                  color={errors.ap_callback_url ? "failure" : "success"}
                  helperText={t(errors.ap_callback_url) || ""}
                />
              </div>
              {editData != null && (
                <div className="w-full my-2">
                  <div className="mb-2">
                    <Label htmlFor="ap_secret_key" value={t("Secret Key")} />
                  </div>
                  <TextInput
                    disabled={true}
                    placeholder={`${t("App Name")} TH`}
                    id="ap_secret_key"
                    type="text"
                    sizing="md"
                    value={editData?.ap_secret_key}
                    className={`form-rounded-md text-primary`}
                  />
                  <div className="my-2">
                    <Label htmlFor="ap_status" value={t("Status")} />
                  </div>
                  <Select
                    id="ap_status"
                    onChange={(e) => {
                      formData.ap_status = parseInt(e.target.value);
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
            <div className="mb-2">
              <Label htmlFor="ap_callback_url" value={t("App Logo")} />
            </div>
            <div className="w-full flex justify-center ">
              <div className="flex items-center justify-center w-2/3">
                <div className="flex flex-col items-center justify-center w-full h-80 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  {previewImgUrl && (
                    <div className="w-full flex justify-end px-4">
                      <Icon
                        icon="tabler:xbox-x"
                        className="text-primary"
                        height={24}
                        onClick={() => removeFile()}
                      />
                    </div>
                  )}
                  {previewImgUrl != "" ? (
                    <div className="image_wrapper">
                      <img
                        src={previewImgUrl}
                        alt={previewImgUrl}
                        width={200}
                      />
                    </div>
                  ) : (
                    <label htmlFor="profileUpload">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                          <span className="font-semibold">Click to upload</span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG
                        </p>
                      </div>
                    </label>
                  )}
                  <div className={`w-3/4 hidden`}>
                    <input
                      id="profileUpload"
                      type="file"
                      className="rounded-md mt-4 inputText"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalInformation>
      {/* Model for delete app */}
      <ModalInformation
        show={deleteModalOpen}
        title="Delete App"
        modalSize="xl"
        submitFunc={() => {
          closeModal();
          if (deleteId != null) {
            const accessToken = localStorage.getItem("access_token") || "";
            apiDeleteApp(accessToken, deleteId?.ap_id);
          }
        }}
        cancelFunc={() => {
          closeModal();
        }}
      >
        <div className="w-full flex justify-center flex-col my-4 ">
          <div className="w-full flex justify-center ">
            <Icon
              icon="tabler:alert-circle-filled"
              className="text-error"
              height={128}
            />
          </div>
          <div className="w-full flex justify-center ">
            <h2>
              {t("Do you want to delete")}{" "}
              {isLanguage == "en" ? deleteId?.ap_name_en : deleteId?.ap_name_th}{" "}
              ?
            </h2>{" "}
          </div>
        </div>
      </ModalInformation>
      {/* Model for delete app */}
      <ModalDelete
        show={deleteModalOpen}
        title="Delete User"
        detail={
          isLanguage == "en"
            ? deleteId?.ap_name_en || ""
            : deleteId?.ap_name_th || ""
        }
        modalSize="xl"
        submitFunc={() => {
          closeModal();
          if (deleteId != null) {
            const accessToken = localStorage.getItem("access_token") || "";
            apiDeleteApp(accessToken, deleteId?.ap_id);
          }
        }}
        cancelFunc={() => {
          closeModal();
        }}
      />
      {/* Modal for view photo */}
      <ModalView
        show={isModalView.show}
        title={t("App Logo")}
        cancelFunc={() => {
          closeModal();
        }}
      >
        <div className="w-full flex justify-center">
          {isModalView.imgSrc != "" ? (
            <div className="my-4 flex justify-center items-center">
              <img
                src={isModalView.imgSrc || "/images/backgrounds/bronze.png"}
                alt={isModalView.imgSrc}
                width={200}
              />
            </div>
          ) : (
            <div>
              {" "}
              <Icon
                icon="tabler:photo-circle"
                className="text-primary"
                height={128}
              />
            </div>
          )}
        </div>
      </ModalView>
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

export default AppTable;
