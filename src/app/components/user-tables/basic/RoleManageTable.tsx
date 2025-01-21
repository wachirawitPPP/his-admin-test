"use client";
import { useState, useEffect } from "react";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Badge,
  Dropdown,
  Modal,
  Button,
  Label,
  Select,
  Tooltip,
  Flowbite,
  Spinner,
} from "flowbite-react";
import Image from "next/image";
import { IconDots } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import axios from "axios";
import UserManageModal from "./UserManageModal";

export interface User {
  avatar?: string | any;
  user_id?: number;
  username?: string;
  role?: string;
  menu_id?: number;
  menu_name?: string;
  shop_id?: number;
  access_role_id?: number;
  access_role_name?: string;
  app_name?: string;
  app_id?: number;
  shop_name?: string;
  actions?: any;
}

const columnHelper = createColumnHelper<User>();

const getUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/Users`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const RoleManageTable = () => {
  const [user, setUser] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading to true before data fetching
      try {
        const data = await getUser();
        if (Array.isArray(data)) {
          const userData = data.map((user: User) => ({
            user_id: user.user_id,
            username: user.username,
            avatar: "/images/profile/user-9.jpg",
            role: user.role,
          }));
          setUser(userData);
        } else {
          console.error("Unexpected data format", data);
          setUser([]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setUser([]);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    getData();
  }, []);

  const columns = [
    columnHelper.accessor("avatar", {
      cell: (info) => (
        <div className="flex gap-3 items-center">
          <Image
            src={info.getValue()}
            width={50}
            height={50}
            alt="icon"
            className="h-10 w-10 rounded-md"
          />
          <div className="truncate line-clamp-2 max-w-56">
            <h6 className="text-base">{info.row.original.username}</h6>
            <p className="text-sm text-darklink dark:text-bodytext">
              user-id: {info.row.original.user_id}
            </p>
          </div>
        </div>
      ),
      header: () => <span>ผู้ใช้</span>,
    }),

    columnHelper.accessor("role", {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {info.row.original.role}
        </p>
      ),
      header: () => <span>ROLE</span>,
    }),
    columnHelper.accessor("actions", {
      cell: ({ row }) => (
        <div className="flex flex-row gap-2">
          <Tooltip content="Edit">
            <Icon
              color="orange"
              className="flex gap-3 cursor-pointer hover:text-blue-500 hover:bg-gray-100 p-1 rounded-full hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => handleEditClick(row.original)}
              icon="solar:pen-new-square-broken"
              height={30}
            />
          </Tooltip>
          <Tooltip content="Disable User">
            <Icon
              color="red"
              className="flex gap-3 cursor-pointer hover:text-blue-500 hover:bg-gray-100 p-1 rounded-full hover:scale-110 transition-transform duration-200 ease-in-out"
              onClick={() => handleEditClick(row.original)}
              icon="tabler:user-x"
              height={30}
            />
          </Tooltip>
        </div>
      ),
      header: () => <span>Action</span>,
    }),
  ];

  const table = useReactTable({
    data: user,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="border rounded-md border-ld overflow-hidden ">
        <div className="overflow-y-auto max-h-96 ">
          {loading ? (
            <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
          ) : (
            <table className="min-w-full ">
              <thead className="sticky top-0 bg-white dark:bg-gray-800 z-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-base text-ld font-semibold py-3 text-left border-b border-ld px-4 py-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-border dark:divide-darkborder">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        dismissible
        className="text-white"
        size={"7xl"}
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <Modal.Header className="text-2xl font-semibold dark:text-white rounded-t-3xl">
          <span>แก้ไขข้อมูลลูกค้า</span>
        </Modal.Header>
        <hr className="w-full h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <Modal.Body className="p-6">
          <UserManageModal user={selectedUser} />
        </Modal.Body>
        <hr className="w-full h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <Modal.Footer className="w-full p-4 flex justify-end gap-4">
          <Button
            color={"primary"}
            onClick={() => setIsEditModalOpen(false)}
            className="px-6 py-2 rounded-lg font-semibold"
          >
            บันทึก
          </Button>
          <Button
            color={"error"}
            onClick={() => setIsEditModalOpen(false)}
            className="px-6 py-2 rounded-lg font-semibold"
          >
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleManageTable;
