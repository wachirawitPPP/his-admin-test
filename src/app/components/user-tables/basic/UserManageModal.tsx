import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Button } from "flowbite-react";
import CardBox from "../../shared/CardBox";

const getUserPermissions = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/UsersByUserID?userId=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching user permissions"
    );
  }
};

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

interface UserManageModalProps {
  user: User | null;
}

const UserManageModal = ({ user }: UserManageModalProps) => {
  const [userPermissions, setUserPermissions] = useState<any[]>([]);
  const [editingAppId, setEditingAppId] = useState<number | undefined>(undefined); // Track editing app

  useEffect(() => {
    if (user?.user_id) {
      getUserPermissions(user.user_id).then((permissions) => {
        if (permissions && Array.isArray(permissions.data)) {
          setUserPermissions(permissions.data);
        } else {
          console.error("Unexpected data format", permissions);
          setUserPermissions([]);
        }
      });
    }
  }, [user]);

  // Group permissions by app_id and then by menu_id within each app
  const groupedPermissions = userPermissions.reduce((acc, permission) => {
    if (!acc[permission.app_id]) {
      acc[permission.app_id] = {
        app_id: permission.app_id,
        app_name: permission.app_name,
        menus: {},
      };
    }
    if (!acc[permission.app_id].menus[permission.menu_id]) {
      acc[permission.app_id].menus[permission.menu_id] = {
        menu_id: permission.menu_id,
        menu_name: permission.menu_name,
        permissions: [],
      };
    }
    acc[permission.app_id].menus[permission.menu_id].permissions.push(permission);
    return acc;
  }, {});

  // Handle the "Edit Role Access" button click
  const handleEditClick = (appId: number) => {
    if (editingAppId === appId) {
      setEditingAppId(undefined); // Toggle off editing
    } else {
      setEditingAppId(appId); // Set the app to edit mode
    }
  };

  return (
    <>
      <div className="flex gap-4 px-4 ">
        <img
          src="https://uploads.commoninja.com/searchengine/wordpress/user-avatar-reloaded.png"
          alt="user-avatar"
          className="rounded-full border-4 border-gray-300 dark:border-gray-700 h-24 w-24"
        />
        <div className="flex flex-col justify-center space-y-2">
          <div className="flex flex-row items-center">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              ชื่อ:
            </p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 ml-2 px-2 py-1 rounded">
              {user?.username}
            </p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex items-center flex-row">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                ตำแหน่ง:
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 ml-2 px-2 py-1 rounded">
                {user?.role === "admin" ? "ผู้ดูแลระบบ (Admin)" : user?.role}
              </p>
            </div>
            <div className="flex items-center flex-row">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                แผนก:
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 ml-2 px-2 py-1 rounded">
                {user?.role === "admin" ? "ผู้ดูแลระบบ (Admin)" : user?.role}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-row">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              เลขประจำตัว:
            </p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 ml-2 px-2 py-1 rounded">
              102330293
            </p>
          </div>
        </div>
      </div>
      <hr className="w-full h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 my-4" />

      {/* Render grouped permissions */}
      <div className="flex flex-wrap gap-4">
        {Object.values(groupedPermissions).map((app: any) => (
          <CardBox
            key={app.app_id}
            className={`w-3/12 p-4 ${
              editingAppId && editingAppId !== app.app_id ? "opacity-50" : ""
            }`} // Disable effect for other cards
          >
            <div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {app.app_name}
              </p>
              <hr className="w-full h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

              {/* Render menus within each app */}
              {Object.values(app.menus).map((menu: any) => (
                <div key={menu.menu_id} className="mt-4">
                  <p className="text-md font-semibold text-gray-600 dark:text-gray-300">
                    {menu.menu_name}
                  </p>
                  <div className="flex flex-row pt-2">
                    {menu.permissions.map((permission: any, index: number) => (
                      <Badge
                        key={index}
                        color={
                          permission.access_role_name == "อ่าน"
                            ? "info"
                            : permission.access_role_name == "Full"
                            ? "success"
                            : permission.access_role_name == "แก้ไข"
                            ? "warning"
                            : "failure"
                        }
                        className="mr-2 mb-2"
                      >
                        {permission.access_role_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <Button
                size={"small"}
                className={`w-4/12 font-medium text-white ${editingAppId === app.app_id ?'bg-primary hover:bg-primary':'bg-warning hover:bg-warning'}  dark:text-white dark:bg-blue-500`}
                onClick={() => handleEditClick(app.app_id)}
                disabled={editingAppId !== undefined && editingAppId !== app.app_id} // Disable other edit buttons
              >
                {editingAppId === app.app_id ? "บันทึก" : "แก้ไขสิทธิ์"}
              </Button>
            </div>
          </CardBox>
        ))}
      </div>
    </>
  );
};

export default UserManageModal;
