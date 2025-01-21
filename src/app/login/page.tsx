"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import LoadingComponent from "../components/shared/LoadingComponent";

const Login = () => {
  const router = useRouter();
  const [urlParam, setUrlParam] = useState("");
  // const searchParams = useSearchParams();

  const verify = async (code: string) => {
    const ssoVerify = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/loginsso/verify`,
      {
        verify_code: code,
      }
    );
    if (ssoVerify.data.status === "success") {
      localStorage.setItem("refresh_token", ssoVerify.data.refresh_token);
      localStorage.setItem("access_token", ssoVerify.data.access_token);
      document.cookie = `access_token=${ssoVerify.data.access_token}; path=/`;
      router.push("/");
    }
  };

  useEffect(() => {
    let url = window.location.href;
    if (url != "") {
      let urlList = url.split("vrfc=");
      if (urlList.length > 0) {
        const vrfc = urlList[1]; 
        setUrlParam(vrfc);
        verify(vrfc);
      }
    }
  }, [router]);

  return <div><LoadingComponent /></div>;
};

export default Login;
