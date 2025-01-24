import RushAnimation from "@/app/components/shared/rushAnimation";
import { UserModel } from "@/utils/type/patientTypes";
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

interface props {
  userList: UserModel[];
  progressLoad: boolean;
  currentPage: number;
  ItemsPerPage: number;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
}

export default function TableData({
  userList,
  progressLoad,
  currentPage,
  ItemsPerPage,
  handleEdit = (item) => {},
  handleDelete = (item) => {},
}: props) {
  const { t } = useTranslation();
  return (
    <div className="border rounded-md border-ld overflow-hidden">
      <div className="overflow-auto h-[calc(70vh_-_85px)] r-4 shadow-md rounded   ">
        <Table>
          <TableHead className={`dark:bg-cyan-700`}>
            <TableHeadCell className="flex justify-center items-center">
              {t("Number")}
            </TableHeadCell>
            <TableHeadCell>{t("User Name")}</TableHeadCell>
            <TableHeadCell>{t("Name")}</TableHeadCell>
            <TableHeadCell>{t("Phone Number")}</TableHeadCell>
            <TableHeadCell>{t("Email")}</TableHeadCell>
            <TableHeadCell>
              {" "}
              <div className="w-full flex justify-center">{t("Status")}</div>
            </TableHeadCell>
            <TableHeadCell className="flex justify-center">
              Action
            </TableHeadCell>
          </TableHead>
          {userList.length > 0 && !progressLoad && (
            <>
              {" "}
              <TableBody>
                {userList.map((item, index) => (
                  <TableRow
                    key={item.us_id}
                    className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                  >
                    <TableCell>
                      <div className="flex justify-center ">
                        {ItemsPerPage * currentPage +
                          (index + 1) -
                          ItemsPerPage}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <b>{item.us_username}</b>
                        <span>{item.us_id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.us_fullname}</TableCell>
                    <TableCell>{item.us_phone}</TableCell>
                    <TableCell>{item.us_email}</TableCell>
                    <TableCell>
                      <div className="w-full flex justify-center">
                        {item.us_status == 1 ? (
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
                      {item.us_delete == "" || item.us_delete == null ? (
                        <>
                          {" "}
                          <div className="flex flex-col  items-center justify-center sm:flex-row gap-4 ">
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
        {userList.length == 0 && (
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
