"use client";
import React, { useContext, useEffect } from "react";
import { Badge, Breadcrumb } from "flowbite-react";
import CardBox from "@/app/components/shared/CardBox";
import { Icon } from "@iconify/react";
import { CustomizerContext } from "@/app/context/customizerContext";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  const { activeLayout, isLayout, isBorderRadius, isLanguage, setIsLanguage } =
    useContext(CustomizerContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/auth/auth1/login`; // Redirect to login
  };

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
      } else {
        // login again
        // router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}/auth/auth1/login`);
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
        }
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM /auth/loginsso/verify"
      );
    }
  };

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   apiAuthValidate(accessToken || "");
  // }, []);

  return (
    <CardBox className="mb-[30px]">
      <Breadcrumb>
        {/* Responsive flex direction for mobile and desktop */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          {/* Title with responsive font size */}
          <h6 className="text-base sm:text-lg mb-2 sm:mb-0">
            {t(`${title}`) || ""}
          </h6>
          <div className="flex flex-wrap items-center ">
            {items &&
              items.map((item, index) => (
                <div
                  key={item.to || item.title}
                  className="flex items-center text-sm sm:text-base"
                >
                  {item.to ? (
                    <Breadcrumb.Item href={item.to}>
                      {/* <Icon
                        icon="solar:home-2-line-duotone"
                        height={20}
                        className="hidden sm:inline"
                      /> */}
                      <span className="ms-3">{t(`${item.title}`) || ""}</span>
                    </Breadcrumb.Item>
                  ) : (
                    <Badge color="lightprimary" className="rounded-sm">
                      {t(`${item.title}`) || ""}
                    </Badge>
                  )}
                  {/* Separator for all except the last item */}
                  {index < items.length - 1 && (
                    <span className="mx-1 hidden sm:inline">/</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Breadcrumb>
    </CardBox>
  );
};

export default BreadcrumbComp;
