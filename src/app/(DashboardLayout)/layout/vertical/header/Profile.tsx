import { Icon } from "@iconify/react";
import { Button, Dropdown } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
import SimpleBar from "simplebar-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CustomizerContext } from "@/app/context/customizerContext";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

interface TokenPayload {
  exp: number; // Token expiration timestamp (in seconds)
  us_id: string;
  [key: string]: any; // Other optional claims
}

export interface UserModel {
  id: number;
  us_id: string;
  us_username: string;
  us_password: string;
  us_email: string;
  us_fullname: string;
  us_phone: string;
  us_status: number;
  us_create: Date;
  us_update: Date;
  us_delete: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserModel>();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { setUserProfile } = useContext(CustomizerContext);

  const apiLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`,
        null,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("refresh_token"),
          },
        }
      );
      if (response.data.status == "success") {
        localStorage.removeItem("username");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}/app-menu`);
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM /auth/logout"
      );
    }
  };

  const getUserData = async (acctk: string) => {
    if (acctk != "") {
      try {
        const decoded: TokenPayload = jwtDecode(acctk); // Decode the token
        if (decoded.us_id != null) {
          let localUser = localStorage.getItem("user") || "";
          if (localUser == "") {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/user/${decoded.us_id}`,
              {
                headers: {
                  Authorization: "Bearer " + acctk,
                },
              }
            );
            // console.log(response);
            if (response.data.status == "success") {
              localStorage.setItem("user", JSON.stringify(response.data.data));
              setUser(response.data.data);
              setUserProfile(JSON.stringify(response.data.data));
            } else {
              // login again
            }
          }
        }
      } catch (error: any) {
        throw new Error(`ERROR FROM /user/:userId`);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    let acctk = localStorage.getItem("access_token");
    if (acctk != null && acctk != "") {
      let localUser = localStorage.getItem("user") || "";
      if (localUser == "") {
        getUserData(acctk);
      } else {
        setUser(JSON.parse(localUser));
      }
    }
  }, []);
  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] py-6  rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        )}
      >
        <div className="px-6">
          <h3 className="text-lg font-semibold text-ld">{t("User Profile")}</h3>
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="80"
              width="80"
              className="rounded-full"
            />
            <div>
              <h5 className="card-title">{user?.us_fullname}</h5>
              <span className="card-subtitle">Admin</span>
              <p className="card-subtitle mb-0 mt-1 flex items-center">
                <Icon
                  icon="solar:mailbox-line-duotone"
                  className="text-base me-1"
                />
                {user?.us_email}
              </p>
            </div>
          </div>
        </div>

        <SimpleBar>
          {profileData.profileDD.map((items, index) => (
            <Dropdown.Item
              as={Link}
              href="#"
              className="px-6 py-3 flex justify-between items-center bg-hover group/link w-full"
              key={index}
            >
              <div className="flex items-center w-full">
                <div
                  className={`h-11 w-11 flex-shrink-0 rounded-md flex justify-center items-center ${items.bgcolor}`}
                >
                  <Icon icon={items.icon} height={20} className={items.color} />
                </div>
                <div className="ps-4 flex justify-between w-full">
                  <div className="w-3/4 ">
                    <h5 className="mb-1 text-sm  group-hover/link:text-primary">
                      {items.title}
                    </h5>
                    <div className="text-xs  text-darklink">
                      {items.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>

        <div className="pt-6 px-6">
          <Button
            color={"primary"}
            as={Link}
            href="/auth/auth1/login"
            className="w-full"
            onClick={() => apiLogout()}
          >
            {t("Logout")}
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
