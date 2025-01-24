import RushAnimation from "@/app/components/shared/rushAnimation";
import { AppModel } from "@/utils/type/patientTypes";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Badge,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import React from "react";
import { useTranslation } from "react-i18next";
import emptyAnt from "../../../../public/images/animation_empty.json";
import { Icon } from "@iconify/react/dist/iconify.js";

interface props {
  appList: AppModel[];
  progressLoad: boolean;
  currentPage: number;
  ItemsPerPage: number;
  handleView: (item: any) => void;
  handleViewEmpty: (item: any) => void;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
}

export default function AppTableData({
  appList,
  progressLoad,
  currentPage,
  ItemsPerPage,
  handleEdit = (item) => {},
  handleDelete = (item) => {},
  handleView = (item) => {},
  handleViewEmpty = (item) => {},
}: props) {
  const { t } = useTranslation();
  return (
    <div className="border rounded-md border-ld overflow-hidden">
      <div className="overflow-auto h-[calc(70vh_-_85px)] r-4 shadow-md rounded">
        <Table>
          <TableHead className={`dark:bg-cyan-700`}>
            <TableHeadCell className="flex justify-center">
              {t("Number")}
            </TableHeadCell>
            <TableHeadCell>
              <div className="w-full text-center">{t("App Logo")}</div>{" "}
            </TableHeadCell>
            <TableHeadCell>{t("App Name")} EN</TableHeadCell>
            <TableHeadCell>{t("App Name")} TH</TableHeadCell>
            <TableHeadCell>{t("ID")}</TableHeadCell>
            <TableHeadCell>{t("Url")}</TableHeadCell>
            <TableHeadCell>{t("Callback Url")}</TableHeadCell>
            <TableHeadCell>
              {" "}
              <div className="w-full text-center">{t("Status")}</div>{" "}
            </TableHeadCell>
            <TableHeadCell className="flex justify-center">
              Action
            </TableHeadCell>
          </TableHead>
          {appList.length > 0 && !progressLoad && (
            <>
              {" "}
              <TableBody>
                {appList.map((item, index) => (
                  <TableRow
                    key={item.ap_id}
                    className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                  >
                    <TableCell>
                      <div className="flex justify-center ">
                        {" "}
                        {ItemsPerPage * currentPage +
                          (index + 1) -
                          ItemsPerPage}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.ap_logo == "" ? (
                        <div
                          className="flex justify-center"
                          onClick={() => {
                            handleViewEmpty(item);
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
                            handleView(item);
                          }}
                        >
                          {item.ap_logo.startsWith("http") ? (
                            <>
                              {" "}
                              <div className="my-4 flex justify-center items-center">
                                <img
                                  src={item.ap_logo}
                                  alt={item.ap_logo}
                                  width={36}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <Icon
                                icon="tabler:photo-circle"
                                className="text-primary"
                                height={36}
                              />
                            </>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.ap_name_en}</TableCell>
                    <TableCell>{item.ap_name_th}</TableCell>
                    <TableCell>{item.ap_id}</TableCell>
                    <TableCell>{item.ap_url}</TableCell>
                    <TableCell>{item.ap_callback_url}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center">
                        {item.ap_status == 1 ? (
                          <>
                            <Badge color="primary">{t("Active")}</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="failure">{t("Inactive")}</Badge>
                          </>
                        )}
                      </div>
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
                                    handleEdit(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div className="flex justify-center items-center">
                              <Tooltip content={t("Delete")} style="dark">
                                <IconTrash
                                  className="cursor-pointer secondary hover:text-error"
                                  onClick={() => {
                                    handleDelete(item);
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
          )}
        </Table>
        {progressLoad && (
          <div className="w-full h-96 flex items-center justify-center">
            <Spinner size="xl" color="info" />{" "}
          </div>
        )}
        {appList.length == 0 && (
          <div className="w-full flex items-center justify-center">
            <RushAnimation
              loop={false}
              animation={emptyAnt}
              width="60%"
              height="60%"
            />
          </div>
        )}
      </div>
    </div>
  );
}
