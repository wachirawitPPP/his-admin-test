import { menuType, SubMenuType } from "@/utils/type/menuType";
import {
  IconList,
  IconEdit,
  IconTrash,
  IconListNumbers,
  IconPlus,
} from "@tabler/icons-react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Tooltip,
  Button,
} from "flowbite-react";
import { t } from "i18next";
import React, { useState } from "react";
import SubMenuCreateModal from "./SubMenuCreateModal";
import SubMenuEditModal from "./SubMenuEditModal";
import DeleteSubMenuModal from "./SubMenuDeleteModal";
import SubMenuSortModal from "./SubMenuSortModal";

interface SubMenuTableProps {
  subMenuList: SubMenuType[];
  groupName: any
  getSubMenuList: () => void;
}

const SubMenuTable: React.FC<SubMenuTableProps> = ({
  subMenuList,
  getSubMenuList,
  groupName
}) => {
    
    const [selectedMenu, setSelectedMenu] = useState<SubMenuType>()
    const [createSubMenuModalOpen , setCreateSubMenuModalOpen] = useState(false)
    const [editSubMenuModalOpen, setEditSubMenuModalOpen] = useState(false)
    const [deleteSubMenuModalOpen, setDeleteSubMenuModalOpen] = useState(false)
    const [sortModalOpen, setIsSortModalOpen] = useState(false)
    console.log(groupName)
  return (
    <div>
      <div className="flex flex-row justify-between w-full pb-4 gap-4">
        
        <div  className="flex items-center">
            <p className="text-2xl font-semibold text-primary">{groupName && t(`${groupName}`)}</p>
        </div>
        <div className="flex flex-row gap-4">
        <Button
          color={"primary"}
          onClick={() => {
            setIsSortModalOpen(true);
          }}
        >
          {t("Sort Menu")} <IconListNumbers />
        </Button>
        <Button
          color={"primary"}
          onClick={() => {
            setCreateSubMenuModalOpen(true)
          }}
        >
          {t("Add")} <IconPlus />
        </Button>
        </div>
        
      </div>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-auto h-screen r-4 shadow-md rounded   ">
          <Table>
            <TableHead className="sticky top-0 z-10 bg-white dark:bg-cyan-700">
              <TableHeadCell className="text-center">
                {t("Number")}
              </TableHeadCell>
              <TableHeadCell>{t("Group Name (th)")}</TableHeadCell>
              <TableHeadCell>{t("Group Name (en)")}</TableHeadCell>
              <TableHeadCell>{t("Icon")}</TableHeadCell>
              <TableHeadCell>{t("Status")}</TableHeadCell>
              <TableHeadCell>{t("Order")}</TableHeadCell>
              <TableHeadCell className="text-center">
                {t("Action")}
              </TableHeadCell>
            </TableHead>
            {subMenuList.length > 0 ? (
              <>
                {" "}
                <TableBody>
                  {subMenuList.map((item, index) => (
                    <TableRow
                      key={index}
                      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                    >
                      <TableCell className="flex justify-center">
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.mn_name_th || "-"}</TableCell>
                      <TableCell>{item.mn_name_en || "-"}</TableCell>
                      <TableCell>{item.mn_url || "-"}</TableCell>

                      <TableCell>
                        {item.mn_status == 1 ? (
                          <>
                            <Badge color="success">{t("Active")}</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="failure">{t("Inactive")}</Badge>
                          </>
                        )}
                      </TableCell>
                      <TableCell>{item.mn_sort || "-"}</TableCell>
                      <TableCell className="flex justify-center items-center">
                        {" "}
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* <div className="flex justify-center items-center">
                            <Tooltip content={t("See menu")} style="dark">
                              <IconList
                                className="cursor-pointer secondary hover:text-error"
                                // onClick={() => {
                                //   router.push(`/menu-manage/menu/${item.mng_id}`);
                                // }}
                              />
                            </Tooltip>
                          </div> */}
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Edit")} style="dark">
                              <IconEdit
                                className="cursor-pointer text-primary"
                                onClick={() => {
                                   setSelectedMenu(item)
                                   setEditSubMenuModalOpen(true)
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Delete")} style="dark">
                              <IconTrash
                                className="cursor-pointer secondary hover:text-error"
                                onClick={() => {
                                    setDeleteSubMenuModalOpen(true);
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
              <></>
            )}
          </Table>
        </div>
      </div>

      <SubMenuCreateModal isModalOpen={createSubMenuModalOpen} setModalOpen={setCreateSubMenuModalOpen} getMenuList={getSubMenuList}/>
      <SubMenuEditModal isOpen={editSubMenuModalOpen} setIsOpen={setEditSubMenuModalOpen} selectedMenu={selectedMenu} getMenuList={getSubMenuList} />
      <DeleteSubMenuModal selectedMenu={selectedMenu} isModalOpen={deleteSubMenuModalOpen} setModalOpen={setDeleteSubMenuModalOpen} getMenuList={getSubMenuList}  />
      <SubMenuSortModal isModalOpen={sortModalOpen} setModalOpen={setIsSortModalOpen}  getMenuList={getSubMenuList} menuList={subMenuList}/>
    </div>
  );
};

export default SubMenuTable;
