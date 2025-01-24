"use client";

import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import axios from "axios";
import { MessageError } from "@/utils/type/patientTypes";
import ModalError from "@/app/(DashboardLayout)/layout/shared/modal-error/modalError";
import { useTranslation } from "react-i18next";

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { t } = useTranslation();
 
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messageError, setmessageError] = useState<MessageError>({
    isError: false,
    message: "",
  });

  // Handle redirection after login
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form inputs
    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }
    // console.log(username, password);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/login`,
        {
          username: username,
          password: password,
        }
      );

      if (result.data.status === "success") {
        getProfile(result.data);
      } else {
        setmessageError({
          isError: true,
          message: result.data.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const apiLoginSso = async (rft: string, appId: string) => {
    if (rft != "") {
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/loginsso`,
          "",
          {
            headers: {
              "Ap-Id": appId,
              Authorization: "Bearer " + rft,
            },
          }
        );

        if (result.data.status === "success") {
          apiSsoVerify(result.data.verify_code);
        } else {
          setmessageError({
            isError: true,
            message: result.data.message,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const apiSsoVerify = async (code: string) => {
    if (code != "") {
      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/loginsso/verify`,
          {
            verify_code: code,
          }
        );

        if (result.data.status === "success") {
          // console.log(result.data);
          localStorage.setItem("refresh_token", result.data.refresh_token);
          localStorage.setItem("access_token", result.data.access_token);
          router.push(`/`);
        } else {
          setmessageError({
            isError: true,
            message: result.data.message,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getProfile = async (req: any) => {
    const profile = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${req.access_token}`,
        },
      }
    );
    if (profile.data.status === "success") {
      if (profile.data.data.us_apps.length > 0) {
        apiLoginSso(req.refresh_token, profile.data.data.us_apps[0].ap_id);
      } else {
        setmessageError({
          isError: true,
          message: t("Some thing wrong"),
        });
      }
    } else {
      setmessageError({
        isError: true,
        message: profile.data.message,
      });
    }
  };

  const apiLogout = async () => {
    try {
      const payload = {
        verify_code: "",
        password: "",
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`,
        payload,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("refresh_token"),
          },
        }
      );
      if (response.data.status == "success") {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}/auth/auth1/login`);
      }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "ERROR FROM /auth/logout"
      );
    }
  };


  return (
    <>
      {title && <p>{title}</p>}
      {subtext}

      {/* Error Alert */}
      {error && (
        <div className="mt-4">
          <Alert
            color="failure"
            icon={() => (
              <Icon
                icon="solar:info-circle-outline"
                className="me-3"
                height={20}
              />
            )}
          >
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Username Input */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="username" value={t("User Name")} />
          </div>
          <TextInput
            id="username"
            type="text"
            sizing="md"
            defaultValue={username}
            className={error ? "error-border" : ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password" value={t("Password")} />
          </div>
          <TextInput
            id="password"
            type="password"
            sizing="md"
            defaultValue={password}
            className={error ? "error-border" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember Device */}
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="opacity-90 font-normal cursor-pointer"
            >
              {t("Remember this Device")}
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-primary text-sm font-medium"
          >
            {t("Forgot Password")}?
          </Link>
        </div>

        {/* Submit Button */}
        <Button color="primary" type="submit" className="w-full">
          {t("Sign In")}
        </Button>
      </form>

      {/* <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
        <p>New to Hispitech X pert?</p>
        <Link
          href={"/auth/auth1/register"}
          className="text-primary text-sm font-medium"
        >
          {t("Create your account")}
        </Link>
      </div> */}
     
      <ModalError
        show={messageError.isError}
        content={messageError.message}
        cancelFunc={() => {
          setmessageError({
            isError: false,
            message: "",
          });
          apiLogout();
        }}
      />
    </>
  );
};

export default AuthLogin;
