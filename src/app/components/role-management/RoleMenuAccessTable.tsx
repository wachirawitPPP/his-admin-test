import { IconList, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Modal,
  Button,
  Table,
  TableHead,
  Badge,
  TableBody,
  TableCell,
  TableHeadCell,
  TableRow,
  Tooltip,
  ToggleSwitch,
} from "flowbite-react";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../shared/LoadingComponent";
import axios from "axios";
import { SubMenuType } from "@/utils/type/menuType";
import CardBox from "../shared/CardBox";

interface RoleMenuProps {
  selectedRole: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  getRoleList: () => void;
}
interface RoleMenuAccessType extends SubMenuType {
  menu_group_id: number;
  role_map_menu: number;
}

const RoleMenuAccessTable: React.FC<RoleMenuProps> = ({
  isOpen: isModalOpen,
  setIsOpen: setModalOpen,
  selectedRole: selectedRole,
  getRoleList: getRoleList,
}) => {
  const [menuList, setMenuList] = useState<RoleMenuAccessType[]>([]);
  console.log(selectedRole);

  const getMenuList = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/role/menus/${selectedRole.rl_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (res.data.status === "success") {
      setMenuList(res.data.data);
    } else if (res.data.status === "error") {
      console.error("Error fetching menu data:", res.data.message);
    }
  };
  useEffect(() => {
    if (selectedRole) {
      getMenuList();
    }
  }, [selectedRole]);

  const handleToggleChange = async (item: RoleMenuAccessType) => {
    try {
      const updatedValue = item.role_map_menu === 1 ? 0 : 1;

      // Send request to update role_map_menu
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/role/set/menu`,
        {
          role_id: selectedRole.id,
          menu_id: item.id,
          role_map_menu: updatedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.status === "success") {
        getMenuList();
        console.error("Error updating menu:", res.data.message);
      }
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };
  return (
    <CardBox>
      <Modal
        show={isModalOpen}
        size="2xl"
        onClose={() => {
          setModalOpen(false);
        }}
        className="w-full"
      >
        <Modal.Header className="bg-primary rounded-t-lg text-white">
          Role Menu Access
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded-md border-ld">
            <Table>
              <TableHead>
                <TableHeadCell className="flex justify-center">
                  {t("#")}
                </TableHeadCell>
                <TableHeadCell>{t("Group Name (th)")}</TableHeadCell>
                <TableHeadCell>{t("Group Name (en)")}</TableHeadCell>

                <TableHeadCell>{t("Access Permission")}</TableHeadCell>
                {/* <TableHeadCell>{t("Order")}</TableHeadCell> */}
                <TableHeadCell className="flex justify-center whitespace-nowrap">
                  Action
                </TableHeadCell>
              </TableHead>
              {menuList.length > 0 ? (
                <>
                  {" "}
                  <TableBody>
                    {menuList.map((item, index) => (
                      <TableRow
                        key={index}
                        className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                      >
                        <TableCell className="flex justify-center">
                          {index + 1 || "-"}
                        </TableCell>
                        <TableCell>{item.mn_name_th || "-"}</TableCell>
                        <TableCell>{item.mn_name_en || "-"}</TableCell>

                        <TableCell className="whitespace-nowrap">
                          {item.role_map_menu == 1 ? (
                            <>
                              <Badge color="primary">{t("Allow")}</Badge>
                            </>
                          ) : (
                            <>
                              <Badge color="failure">{t("Not Allow")}</Badge>
                            </>
                          )}
                        </TableCell>

                        <TableCell className="flex justify-center items-center whitespace-nowrap ">
                          {" "}
                          <div className="flex flex-row gap-4 whitespace-nowrap">
                            <ToggleSwitch
                              checked={item.role_map_menu === 1 ? true : false}
                              onChange={() => {
                                handleToggleChange(item);
                              }}
                            />
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
                      <div className="flex justify-center ">
                        <LoadingComponent />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </CardBox>
  );
};

export default RoleMenuAccessTable;
