"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/images/logos/logo-dark.svg";
import Logowhite from "/public/images/logos/logo-light.svg";
// import ApsxLogo from "/public/images/logos/logo.svg"
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"}>
      {/* Dark Logo   */}
      <Image src={Logowhite} alt="logo-dark" height={50} className="block dark:hidden" loading="eager" priority={true}/>
      {/* Light Logo  */}
      <Image src={Logo} alt="logo-light" height={50} className="hidden dark:block" loading="eager" priority={true} />
    </Link>
  );
};

export default FullLogo;
