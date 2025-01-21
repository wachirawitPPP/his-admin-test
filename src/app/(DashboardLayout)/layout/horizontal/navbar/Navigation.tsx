import React, { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import Menuitems from "@/app/(DashboardLayout)/layout/horizontal/MenuData";
import { IconChevronDown } from "@tabler/icons-react";
import ChildComponent from "./ChildComponent";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [active, setActive] = useState(Menuitems[0].id);
  const [isClient, setIsClient] = useState(false);

  const handleDropdownEnter = (itemId: any) => {
    setActiveDropdown(itemId);
    setActive(itemId);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleChildClick = (parentId: any) => {
    setActive(parentId);
  };
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Navbar
          fluid={true}
          rounded={true}
          className="horizontal-nav bg-transparent dark:bg-transparent sm:px-0 xl:py-2.5 py-0"
        >
          <Navbar.Collapse className="xl:block">
            <ul className="flex items-center space-x-3">
              {Menuitems.map((item) => (
                <li key={item.id} className="relative group">
                  {item.children ? (
                    <div
                      className="relative group"
                      onMouseEnter={() => handleDropdownEnter(item.id)}
                    >
                      <p
                        className={`w-full ${
                          active === item.id || activeDropdown === item.id
                            ? "text-primary dark:text-primary bg-lightprimary"
                            : "group-hover/nav:bg-lightprimary group-hover/nav:text-primary"
                        } py-2 px-3 rounded-full flex gap-3 items-center text-ld`}
                      >
                        <Link href={item.url}>
                          <span className="flex gap-2 items-center w-full ">
                            <Icon icon={`${item.icon}`} height={18} />
                            <span>{t(`${item.title}`)}</span>
                            {item.children && (
                              <IconChevronDown size={18} className="ms-auto" />
                            )}
                          </span>
                        </Link>
                      </p>
                      {activeDropdown === item.id && (
                        <div
                          className={`absolute left-0 rtl:right-0 mt-2  bg-white dark:bg-dark rounded-md shadow-lg ${
                            item.column == 4 ? "w-screen max-w-[800px]" : "w-72"
                          }`}
                          onMouseEnter={() => handleDropdownEnter(item.id)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          <ul
                            className={`p-3 text-sm   gap-2  ${
                              item.column == 4 ? "two-cols" : "flex flex-col"
                            } `}
                          >
                            {item.children.map((child, index) => (
                              <li
                                key={`${item.name}_${index}`}
                                className={` ${
                                  item.column == 4 ? "mb-2" : ""
                                } `}
                              >
                                <ChildComponent
                                  item={child}
                                  isActive={activeDropdown === item.id}
                                  handleMouseEnter={() =>
                                    handleDropdownEnter(item.id)
                                  }
                                  handleMouseLeave={handleDropdownLeave}
                                  onClick={() => handleChildClick(item.id)}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.url}>
                      <p
                        className={`py-2 px-3 rounded-full flex gap-3 items-center ${
                          active === item.id
                            ? "bg-error text-white"
                            : "group-hover/nav:bg-lightprimary group-hover/nav:text-primary"
                        }`}
                      >
                        <Icon icon={`${item.icon}`} height={18} />
                        <span>{t(`${item.title}`)}</span>
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navigation;
