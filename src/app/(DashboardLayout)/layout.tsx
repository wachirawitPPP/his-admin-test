"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { Customizer } from "./layout/shared/customizer/Customizer";
import { CustomizerContext } from "@/app/context/customizerContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { ToastBar, Toaster } from "react-hot-toast";
// Define the shape of the context state

interface TokenPayload {
  exp: number; // Token expiration timestamp (in seconds)
  [key: string]: any; // Other optional claims
}

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/auth/auth1/login`; // Redirect to login
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeLayout, isLayout } = useContext(CustomizerContext);
  const [isLoad, setIsLoad] = useState(true);
  const router = useRouter();

  const apiAuthRenew = async () => {
    try {
      const payload = {
        verify_code: "",
        password: "",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/renew`,
        payload,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("refresh_token"),
          },
        }
      );
      if (response.data.status == "success") {
        localStorage.setItem("access_token", response.data.access_token);
        let accessToken = response.data.access_token;

        if (accessToken != "") {
          const decoded: TokenPayload = jwtDecode(accessToken); // Decode the token
          const currentTime = Math.floor(Date.now() / 1000);
          const timeToExpire = (decoded.exp - currentTime) * 1000;

          if (timeToExpire > 0) {
            setTimeout(() => {
              apiAuthValidate(accessToken);
            }, Math.max(0, timeToExpire) - 3000);
          }
        }
        setIsLoad(false);
      } else {
        // login again
        handleLogout();
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM /auth/renew"
      );
    }
  };

  const apiAuthValidate = async (access_token: string) => {
    try {
      if (access_token != "") {
        const payload = {
          verify_code: "",
          password: "",
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/loginsso/verify`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );
        if (response.data.status == "error") {
          apiAuthRenew();
        } else {
          setIsLoad(false);
        }
      } else {
        handleLogout();
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM /auth/loginsso/verify"
      );
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || "";
    apiAuthValidate(accessToken);
  }, []);
  return isLoad ? (
    <div></div>
  ) : (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "custom-enter 2s ease"
                  : "custom-exit 2s ease forwards",
              }}
            />
          )}
        </Toaster>
        {/* Header/sidebar */}
        {activeLayout == "vertical" ? <Sidebar /> : null}
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          {/* Top Header  */}
          {activeLayout == "horizontal" ? (
            <Header layoutType="horizontal" />
          ) : (
            <Header layoutType="vertical" />
          )}
          {/* Body Content  */}
          <div
            className={` ${
              isLayout == "full"
                ? "w-full py-[30px] md:px-[30px] px-5"
                : "container mx-auto  py-[30px]"
            } ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
            `}
          >
            {children}
          </div>
          <Customizer />
        </div>
      </div>
    </div>
  );
}
