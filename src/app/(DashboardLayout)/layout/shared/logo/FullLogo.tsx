"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/images/logos/logo-dark.svg";
import Logowhite from "/public/images/logos/logo-light.svg";
import { useRouter } from "next/navigation";

const FullLogo = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div onClick={handleLogoClick} className="cursor-pointer">
      {/* Dark Logo */}
      <Image
        src={Logowhite}
        alt="logo-dark"
        height={50}
        className="block dark:hidden"
        loading="eager"
        priority={true}
      />
      {/* Light Logo */}
      <Image
        src={Logo}
        alt="logo-light"
        height={50}
        className="hidden dark:block"
        loading="eager"
        priority={true}
      />
    </div>
  );
};

export default FullLogo;
