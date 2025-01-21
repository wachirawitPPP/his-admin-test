"use client";
import "flowbite";
import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "flowbite-react";
import Search from "./Search";
import { Icon } from "@iconify/react";
import AppLinks from "./AppLinks";
import Messages from "./Messages";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { CustomizerContext } from "@/app/context/customizerContext";

import { Language } from "./Language";
import FullLogo from "../../shared/logo/FullLogo";
import MobileHeaderItems from "./MobileHeaderItems";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import HorizontalMenu from "../../horizontal/header/HorizontalMenu";

interface HeaderPropsType {
  layoutType: string;
}

const Header = ({ layoutType }: HeaderPropsType) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    localStorage.setItem("theme", "light");
    let theme = localStorage.getItem("theme") || "light";
    let isLang = localStorage.getItem("language") || "th";
    let activeLayout = "vertical";
    let activeTheme = localStorage.getItem("activeTheme") || "CYAN_THEME";
    setActiveMode(theme);
    setIsLanguage(isLang);
    setActiveLayout(activeLayout);
    setActiveTheme(activeTheme);
    setIsLoad(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    isLayout,
    setActiveMode,
    activeMode,
    setIsLanguage,
    activeLayout,
    setActiveLayout,
    setActiveTheme,
  } = useContext(CustomizerContext);

  const [mobileMenu, setMobileMenu] = useState("");

  const handleMobileMenu = () => {
    if (mobileMenu === "active") {
      setMobileMenu("");
    } else {
      setMobileMenu("active");
    }
  };

  const toggleMode = () => {
    setActiveMode((prevMode: string) =>
      prevMode === "light" ? "dark" : "light"
    );
    let currentTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", currentTheme == "light" ? "dark" : "light");
    localStorage.setItem(
      "flowbite-theme-mode",
      currentTheme == "light" ? "dark" : "light"
    );
  };

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {isLoad ? (
        <div></div>
      ) : (
        <div>
          <header
            className={`sticky top-0 z-[5] ${
              isSticky
                ? "bg-lightgray dark:bg-dark shadow-md fixed w-full"
                : "bg-transparent"
            }`}
          >
            <Navbar
              fluid
              className={`xl:hidden rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4 ${
                layoutType == "horizontal" ? "container mx-auto" : ""
              }  ${isLayout == "full" ? "!max-w-full" : ""}`}
            >
              <span
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
              <Navbar.Collapse className="xl:block ">
                <div className="flex gap-3 items-center relative">
                  {layoutType == "horizontal" ? (
                    <div className="me-3">
                      <FullLogo />
                    </div>
                  ) : null}
                  {/* {layoutType != "horizontal" ? (
                    <span
                      onClick={() => {
                        if (isCollapse === "full-sidebar") {
                          setIsCollapse("mini-sidebar");
                        } else {
                          setIsCollapse("full-sidebar");
                        }
                      }}
                      className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <Icon
                        icon="solar:hamburger-menu-line-duotone"
                        height={21}
                      />
                    </span>
                  ) : null} */}

                  {/* App Link Dropwown   */}
                  {/* <AppLinks /> */}

                  {/* <Search /> */}
                </div>
              </Navbar.Collapse>

              {/* mobile-logo */}
              <div className="block xl:hidden">
                <FullLogo />
              </div>
              {/* <Navbar.Collapse className="xl:block hidden">
                <div className="flex gap-3 items-center">
                  {activeMode === "light" ? (
                    <div
                      className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                      onClick={toggleMode}
                    >
                      <span className="flex items-center">
                        <Icon icon="solar:moon-line-duotone" width="20" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                      onClick={toggleMode}
                    >
                      <span className="flex items-center">
                        <Icon icon="solar:sun-bold-duotone" width="20" />
                      </span>
                    </div>
                  )}
                  <Language />
                  <Messages />
                  <Notifications />
                  {activeLayout == "horizontal" ? <Profile /> : <div></div>}
                </div>
              </Navbar.Collapse> */}
              {/* Mobile Toggle Icon */}
              <span
                className="h-10 w-10 flex xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
                // onClick={handleMobileMenu}
              >
                {/* <Icon icon="tabler:dots" height={21} /> */}
              </span>
            </Navbar>
            {/* <div
              className={`w-full  xl:hidden block mobile-header-menu ${mobileMenu}`}
            >
              <MobileHeaderItems />
            </div> */}

            {/* Horizontal Menu  */}
            {layoutType == "horizontal" ? (
              <div className="xl:border-y xl:border-ld">
                <div
                  className={`${
                    isLayout == "full" ? "w-full px-6" : "container"
                  }`}
                >
                  <HorizontalMenu />
                </div>
              </div>
            ) : null}
          </header>

          {/* Mobile Sidebar */}
          <Drawer open={isOpen} onClose={handleClose} className="w-130">
            <Drawer.Items>
              <MobileSidebar />
            </Drawer.Items>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default Header;
