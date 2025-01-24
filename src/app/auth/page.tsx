"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "../components/shared/LoadingComponent";

const Login = () => {
  const router = useRouter();
  const [rftk, setRftk] = useState("");
  const [acctk, setAcctk] = useState("");

  useEffect(() => {
    let url = window.location.href;
    if (url != "") {
      let urlRftkList = url.split("rftk=");
      let urlAcctkList = url.split("acctk=");
      if (urlRftkList.length > 0) {
        if (urlRftkList[1] != "") {
          let temp = urlRftkList[1].split(",");
          setRftk(temp[0]);
          document.cookie = `refresh_token=${rftk}; path=/; Secure; HttpOnly; SameSite=Strict;`;
        }
      }
      if (urlAcctkList.length > 0) {
        if (urlAcctkList[1] != "") {
          let temp = urlAcctkList[1].split(",");
          setAcctk(temp[0]);
          localStorage.setItem("access_token", acctk);
        }
      }

      if (rftk && acctk) {
        // Redirect after saving tokens
        router.push("/");
      }
    }
  }, [rftk, acctk, router]);

  return (
    <div>
      <LoadingComponent />
    </div>
  );
};

export default Login;
