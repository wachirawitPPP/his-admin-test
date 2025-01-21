"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RoleTable from "./RoleTable";
import { RoleType } from "@/utils/type/roleType";
import CardBox from "../shared/CardBox";

const RoleManagementApps = () => {
  const [roleList, setRoleList] = useState<RoleType[]>([]);

  const getRole = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/role/pagination/${process.env.NEXT_PUBLIC_AP_ID}`,
      {
        search_text: "",
        search_status: -1,
        page: 1,
        limit: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (res.data.status === "success") {
      const sortedItems = res.data.data.items.sort(
        (a: RoleType, b: RoleType) => a.rl_sort - b.rl_sort // Sort ascending by mng_sort
      );
      setRoleList(sortedItems);
    }
  };
  useEffect(() => {
    getRole();
  }, []);
  return (
    <div>
      <CardBox>
        <RoleTable roleList={roleList} getRoleList={getRole} />
      </CardBox>
    </div>
  );
};

export default RoleManagementApps;
