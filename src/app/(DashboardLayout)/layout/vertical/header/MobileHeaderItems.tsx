import { Icon } from "@iconify/react";
import Messages from "./Messages";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { Language } from "./Language";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import AppLinks from "./AppLinks";
import { CustomizerContext } from "@/app/context/customizerContext";
import React, { useContext } from "react";

const MobileHeaderItems = () => {
  const { setActiveMode, activeMode } = useContext(CustomizerContext);
  const toggleMode = () => {
    let currentTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", currentTheme == "light" ? "dark" : "light");
    setActiveMode(currentTheme == "light" ? "dark" : "light");
  };

  return (
    <Navbar
      fluid
      className="rounded-none bg-lightgray dark:bg-dark flex-1 px-9 "
    >
      {/* Toggle Icon   */}

      <div className="xl:hidden block w-full">
        <div className="flex gap-3 justify-center items-center">
          {/* Theme Toggle */}
          {/* <div onClick={() => toggleMode()}>
            <DarkThemeToggle className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-lightprimary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink" />
          </div> */}

          {/* Language Dropdown*/}
          <Language />

          {/* Notification Dropdown */}
          <Notifications />

          {/* Messages Dropdown */}
          {/* <Messages /> */}

          {/* App Link Dropwown   */}
          <AppLinks />

          {/* Profile Dropdown */}
          {/* <Profile /> */}
        </div>
      </div>
    </Navbar>
  );
};

export default MobileHeaderItems;
