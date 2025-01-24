"use client";
import React from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";

interface props {
  handleSearnch: (e: any) => void;
  handleStatus: (e: any) => void;
  handleAddUser: () => void;
  handleSubmit: () => void;
}

export default function AppTabalFilter({
  handleSearnch = () => {},
  handleAddUser = () => {},
  handleSubmit = () => {},
  handleStatus = (e) => {},
}: props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between w-full py-2 gap-4">
      <div className="w-2/3 flex justify-around">
        <div className="w-1/2 pr-2">
          <div className="mb-2 pt-2">
            <Label htmlFor="search_text" value={`${t("App Name")}`} />
          </div>
          <TextInput
            onChange={handleSearnch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder={`${t("Search")}, ${t("App Name")} EN, ${t(
              "App Name"
            )} TH, ${t("ID")}, ${t("Url")}, ${t("Callback Url")}`}
            id="search_text"
            type="text"
            sizing="md"
            className={`form-rounded-md text-primary`}
          />
        </div>
        <div className="w-1/2 px-2">
          <div className="my-2">
            <Label htmlFor="search_status" value={t("Status")} />
          </div>
          <Select
            id="search_status"
            onChange={(e) => {
              handleStatus(e);
            }}
            required
            className="select-md"
          >
            <option value={-1}>{t("All Status")}</option>
            <option value={1}>{t("Active")}</option>
            <option value={0}>{t("Inactive")}</option>
          </Select>
        </div>
        <div className="mt-8 pt-1">
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color={"primary"}
          >
            {t("Search")}
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Button
          color={"primary"}
          onClick={() => {
            handleAddUser();
          }}
        >
          {t("Add User")} <IconPlus />
        </Button>
      </div>
    </div>
  );
}
