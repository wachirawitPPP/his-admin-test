"use client";
import React, { useContext } from "react";
import { Badge, Breadcrumb } from "flowbite-react";
import CardBox from "@/app/components/shared/CardBox";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react/dist/iconify.js";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const BreadcrumbComp = ({ items, title }: BreadCrumbType) => {
  const { t } = useTranslation();

  return (
    <CardBox className="mb-[30px]">
      <Breadcrumb>
        {/* Responsive flex direction for mobile and desktop */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          {/* Title with responsive font size */}
          
          <div className="flex flex-wrap items-center ">
            {items &&
              items.map((item, index) => (
                <div
                  key={item.to || item.title}
                  className="flex items-center text-sm sm:text-base"
                >
                  {item.to ? (
                    <Breadcrumb.Item href={item.to}>
                      <Icon
                        icon="solar:home-2-line-duotone"
                        height={20}
                        className="hidden sm:inline"
                      />
                      <span className="ms-3">{t(`${item.title}`)}</span>
                    </Breadcrumb.Item>
                  ) : (
                    <Badge color="lightprimary">
                      {t(`${item.title}`)}
                    </Badge>
                  )}
                  {/* Separator for all except the last item */}
                  {index < items.length - 1 && (
                    <span className="mx-1 hidden sm:inline">/</span>
                  )}
                </div>
              ))}
          </div>
          <h6 className="text-base sm:text-lg mb-2 sm:mb-0">
            {t(`${title}`)}
          </h6>
        </div>
      </Breadcrumb>
    </CardBox>
  );
};

export default BreadcrumbComp;
