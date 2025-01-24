"use client";
import React, { useEffect, useState } from "react";
import CardBox from "../components/shared/CardBox";
import BreadcrumbComp from "./layout/shared/breadcrumb/BreadcrumbComp";
import homeIcon from "../../../public/images/svgs/home.svg";
import user from "../../../public/images/svgs/user.svg";
import sms from "../../../public/images/svgs/sms.svg";
import mail from "../../../public/images/svgs/mail.svg";
import growth from "../../../public/images/svgs/growth.svg";
import pepleGroup from "../../../public/images/svgs/peple_group.svg";
import lock from "../../../public/images/svgs/lock.svg";
import notification from "../../../public/images/svgs/notification.svg";
import ChartComponent from "../components/shared/chartComponent";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../components/shared/LoadingComponent";

const page = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "Dashboard",
    },
  ];

  let dashboardMenu = [
    {
      id: 1,
      icon: homeIcon.src,
      iconBg: "bg-amber-500",
      title: `193 ${t("Store")}`,
      detail: t("Chart Title02"),
    },
    {
      id: 2,
      icon: user.src,
      iconBg: "bg-cyan-500",
      title: `1,612 ${t("Person")}`,
      detail: t("Chart Title03"),
    },
    {
      id: 3,
      icon: sms.src,
      iconBg: "bg-lime-500",
      title: "0",
      detail: t("Chart Title04"),
    },
    {
      id: 4,
      icon: mail.src,
      iconBg: "bg-indigo-500",
      title: "0",
      detail: t("Chart Title05"),
    },
    {
      id: 5,
      icon: growth.src,
      iconBg: "bg-blue-500",
      title: `4,722,659.00 (${t("Year")}) / 0%`,
      detail: `${t("Sales")} 0.00 (${t("Last Year")})`,
    },
    {
      id: 6,
      icon: pepleGroup.src,
      iconBg: "bg-green-500",
      title: "763,018",
      detail: t("Chart Title06"),
    },
    {
      id: 7,
      icon: lock.src,
      iconBg: "bg-red-500",
      title: "2",
      detail: `${t("Package Expire In")} 3 ${t("Day")}`,
    },
    {
      id: 8,
      icon: notification.src,
      iconBg: "bg-amber-500",
      title: "3",
      detail: `${t("Package Expire In")} 15 ${t("Day")}`,
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="w-full">
          <BreadcrumbComp title="Dashboard" items={BCrumb} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dashboardMenu.map((item, index) => {
              return (
                <CardBox key={item.id}>
                  <div className="flex">
                    <div className="w-1/4 flex items-center justify-center">
                      <div
                        className={`size-12 rounded-full ${item.iconBg} flex items-center justify-center`}
                      >
                        <img
                          src={item.icon}
                          alt={item.title}
                          height={24}
                          width={24}
                        />
                      </div>
                    </div>
                    <div className="w-3/4 p-2">
                      <h5 className="card-title">{item.title}</h5>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                </CardBox>
              );
            })}
          </div>
          <CardBox className="my-4">
            <div className="w-full flex flex-col justify-center">
              <span className="text-center">{t("Chart Title01")}</span>
              <h6 className="text-center">2566 - 2567</h6>
            </div>
            <div>
              <ChartComponent />
            </div>
          </CardBox>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-2/3">
            <LoadingComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
