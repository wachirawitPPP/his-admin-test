import {
  IconEye,
  IconEdit,
  IconTrash,
  IconPlus,
  IconListNumbers,
  IconList,
} from "@tabler/icons-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Badge,
  Button,
  Modal,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tooltip,
} from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MenuForm from "./GroupMenuForm";
import axios from "axios";
import GroupMenuDeleteModal from "./GroupMenuDeleteModal";
import GruopMenuEditModal from "./GroupMenuEditModal";
import GroupMenuCreateModal from "./GroupMenuCreateModal";
import GroupMenuSortModal from "./GroupMenuSortModal";
import { useRouter } from "next/navigation";
import { menuType } from "@/utils/type/menuType";
import LoadingComponent from "../shared/LoadingComponent";
import toast, { Toaster } from "react-hot-toast";
import TableFilter from "../shared/TableFilter";

interface MenuTableProps {
  handleSearchTextChange: (value: string) => void;
  handleSearchStatusChange: (value: string) => void;
  loading: boolean;
  searchText: string;
  searchStatus: string;
  handleSearch: () => void;
  menuList: menuType[];
  getMenuList: () => void;
}

const MenuTable: React.FC<MenuTableProps> = ({
  menuList,
  getMenuList,
  loading,
  searchText,
  handleSearchTextChange,
  handleSearch,
  searchStatus,
  handleSearchStatusChange,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [formData, setFormData] = useState<any>({
    name_en: "",
    name_th: "",
    icon: "",
    sort: null,
  });

  const handleEditGroupMenu = (item: menuType) => {
    setIsEditModalOpen(true);
    setSelectedMenu(item);
    setIsEditModalOpen(true);
    setFormData({
      name_en: item.mng_name_en,
      name_th: item.mng_name_th,
      icon: item.mng_icon,
      sort: item.mng_sort,
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between w-full  gap-4">
        {/* Table Filter Section */}
        <div className="w-full md:w-6/12 items-center">
          <TableFilter
            searchText={searchText}
            handleSearchTextChange={handleSearchTextChange}
            searchStatus={searchStatus}
            handleSearchStatusChange={handleSearchStatusChange}
            onSearch={handleSearch}
          />
        </div>

        {/* Actions Section */}
        <div className="flex flex-col md:flex-row justify-end items-center w-full md:w-6/12  gap-4">
          <Button
            color={"primary"}
            onClick={() => {
              setIsSortModalOpen(true);
            }}
            className="w-full md:w-36 "
          >
            {t("Sort Menu")} <IconListNumbers />
          </Button>

          <Button
            color={"primary"}
            className="w-full md:w-36 "
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            {t("Add")} <IconPlus />
          </Button>
        </div>
      </div>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-auto  r-4 shadow-md rounded   ">
          <Table>
            <TableHead
              className={`sticky top-0 z-10 bg-white dark:bg-cyan-700`}
            >
              <TableHeadCell className="flex justify-center">
                {t("Number")}
              </TableHeadCell>
              <TableHeadCell>{t("Group Name (th)")}</TableHeadCell>
              <TableHeadCell>{t("Group Name (en)")}</TableHeadCell>
              <TableHeadCell>{t("Icon")}</TableHeadCell>
              <TableHeadCell>{t("Status")}</TableHeadCell>
              {/* <TableHeadCell>{t("Order")}</TableHeadCell> */}
              <TableHeadCell className="flex justify-center ">
                Action
              </TableHeadCell>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex justify-center items-center py-8 h-72">
                      <Spinner size="xl" color="info" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : menuList.length > 0 ? (
              <>
                <TableBody>
                  {menuList.map((item, index) => (
                    <TableRow
                      key={index}
                      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                    >
                      <TableCell className="flex justify-center">
                        {item.mng_sort || "-"}
                      </TableCell>
                      <TableCell className=" whitespace-nowrap">{item.mng_name_th || "-"}</TableCell>
                      <TableCell>{item.mng_name_en || "-"}</TableCell>
                      <TableCell>{item.mng_icon || "-"}</TableCell>

                      <TableCell className=" whitespace-nowrap">
                        {item.mng_status == 1 ? (
                          <>
                            <Badge color="primary">{t("Active")}</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="failure">{t("Inactive")}</Badge>
                          </>
                        )}
                      </TableCell>

                      <TableCell className="flex justify-center items-center ">
                        <div className="flex flex-row gap-4">
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("See menu")} style="dark">
                              <IconList
                                className="cursor-pointer secondary hover:text-primary"
                                onClick={() => {
                                  router.push(
                                    `/menu-manage/menu/${item.mng_id}`
                                  );
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Edit")} style="dark">
                              <IconEdit
                                className="cursor-pointer secondary hover:text-primary"
                                onClick={() => {
                                  handleEditGroupMenu(item);
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Delete")} style="dark">
                              <IconTrash
                                className="cursor-pointer secondary hover:text-error"
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setSelectedMenu(item);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex justify-center h-72 items-center ">
                      <span className="text-gray-500 text-lg">
                        {t("Data Not Found")}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>

      {/* <GruopMenuCreateModal/> */}
      <GruopMenuEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        selectedMenu={selectedMenu}
        formData={formData}
        setFormData={setFormData}
        getMenuList={getMenuList}
      />

      {/* Delete Group Menu */}
      <GroupMenuDeleteModal
        getMenuList={getMenuList}
        selectedMenu={selectedMenu}
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}
      />
      {/* Add Group Menu */}
      <GroupMenuCreateModal
        isModalOpen={isAddModalOpen}
        setModalOpen={setIsAddModalOpen}
        getMenuList={getMenuList}
      />
      <GroupMenuSortModal
        isModalOpen={isSortModalOpen}
        setModalOpen={setIsSortModalOpen}
        getMenuList={getMenuList}
        menuList={menuList}
      />
    </>
  );
};

export default MenuTable;
