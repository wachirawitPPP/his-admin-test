import React from "react";
import { RoleType } from "@/utils/type/roleType";
import {
  IconListNumbers,
  IconPlus,
  IconList,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import {
  Button,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Tooltip,
  Spinner,
} from "flowbite-react";
import { t } from "i18next";
import router from "next/router";
import LoadingComponent from "../shared/LoadingComponent";
import RoleEditModal from "./RoleEditModal";
import RoleCreateModal from "./RoleCreateModal";
import RoleDeleteModal from "./RoleDeleteModal";
import RoleMenuAccessTable from "./RoleMenuAccessTable";
import TableFilter from "../shared/TableFilter";
import RushAnimation from "@/app/components/shared/rushAnimation";
import emptyAnt from "../../../../public/images/animation_empty.json";

interface RoleTableProps {
  handleSearchTextChange: (value: string) => void;
  handleSearchStatusChange: (value: string) => void;
  handleSearch: () => void;
  roleList: RoleType[];
  loading: boolean;
  searchText: string;
  searchStatus: string;
  getRoleList: () => void;
}

const RoleTable: React.FC<RoleTableProps> = ({
  roleList,
  getRoleList,
  loading,
  searchText,
  handleSearchTextChange,
  handleSearch,
  searchStatus,
  handleSearchStatusChange,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = React.useState(false);
  const [editRoleModalOpen, setEditRoleModalOpen] = React.useState(false);
  const [deleteRoleModalOpen, setDeleteRoleModalOpen] = React.useState(false);
  const [roleAccessTableModalOpen, setRoleAccessTableModalOpen] =
    React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<RoleType>();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full py-2 gap-4">
        <div className="w-full md:w-6/12 items-center">
          <TableFilter
            searchText={searchText}
            handleSearchTextChange={handleSearchTextChange}
            searchStatus={searchStatus}
            handleSearchStatusChange={handleSearchStatusChange}
            onSearch={handleSearch}
          />
        </div>
        <Button
          color={"primary"}
          onClick={() => {
            setIsAddModalOpen(true);
          }}
          className="w-full md:w-36 "
        >
          {t("Add")} <IconPlus />
        </Button>
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

              <TableHeadCell>{t("Status")}</TableHeadCell>
              {/* <TableHeadCell>{t("Order")}</TableHeadCell> */}
              <TableHeadCell className="flex justify-center whitespace-nowrap">
                Action
              </TableHeadCell>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex justify-center items-center py-8">
                      <Spinner size="xl" color="info" />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : roleList.length > 0 ? (
              <>
                <TableBody>
                  {roleList.map((item, index) => (
                    <TableRow
                      key={index}
                      className={`dark:text-white hover:bg-lightprimary hover:text-primary  dark:hover:bg-lightprimary`}
                    >
                      <TableCell className="flex justify-center">
                        {item.rl_sort || "-"}
                      </TableCell>
                      <TableCell>{item.rl_name_th || "-"}</TableCell>
                      <TableCell>{item.rl_name_en || "-"}</TableCell>

                      <TableCell className="whitespace-nowrap">
                        {item.rl_status == 1 ? (
                          <>
                            <Badge color="primary">{t("Active")}</Badge>
                          </>
                        ) : (
                          <>
                            <Badge color="failure">{t("Inactive")}</Badge>
                          </>
                        )}
                      </TableCell>

                      <TableCell className="flex justify-center items-center whitespace-nowrap ">
                        <div className="flex flex-row gap-4">
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("See menu")} style="dark">
                              <IconList
                                className="cursor-pointer secondary hover:text-primary"
                                onClick={() => {
                                  setRoleAccessTableModalOpen(true);
                                  setSelectedRole(item);
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Edit")} style="dark">
                              <IconEdit
                                className="cursor-pointer secondary hover:text-primary"
                                onClick={() => {
                                  setSelectedRole(item);
                                  setEditRoleModalOpen(true);
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div className="flex justify-center items-center">
                            <Tooltip content={t("Delete")} style="dark">
                              <IconTrash
                                className="cursor-pointer secondary hover:text-error"
                                onClick={() => {
                                  setDeleteRoleModalOpen(true);
                                  setSelectedRole(item);
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
                    <div className="w-full flex items-center justify-center">
                      <RushAnimation
                        loop={false}
                        animation={emptyAnt}
                        width="60%"
                        height="60%"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      {editRoleModalOpen && (
        <RoleEditModal
          isOpen={editRoleModalOpen}
          setIsOpen={setEditRoleModalOpen}
          getRoleList={getRoleList}
          selectedRole={selectedRole}
        />
      )}
      {isAddModalOpen && (
        <RoleCreateModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          getRoleList={getRoleList}
        />
      )}

      {deleteRoleModalOpen && (
        <RoleDeleteModal
          isOpen={deleteRoleModalOpen}
          setIsOpen={setDeleteRoleModalOpen}
          getRoleList={getRoleList}
          selectedRole={selectedRole}
        />
      )}

      {roleAccessTableModalOpen && (
        <RoleMenuAccessTable
          isOpen={roleAccessTableModalOpen}
          setIsOpen={setRoleAccessTableModalOpen}
          getRoleList={getRoleList}
          selectedRole={selectedRole}
        />
      )}
    </>
  );
};

export default RoleTable;
