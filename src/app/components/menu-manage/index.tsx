"use client";
import React, { useEffect, useState } from "react";
import CardBox from "../shared/CardBox";
import axios from "axios";
import MenuTable from "./GroupMenuTable";
interface menuType {
  mng_id: string;
  mng_name_th: string;
  mng_name_en: string;
  mng_icon: string;
  mng_sort: number;
  mng_status: number;
  mng_delete: string;
  app_id: number;
  action: any;
}

const MenuMangement = () => {
  const [menuList, setMenuList] = useState([]);

  const getMenuList = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/pagination/${process.env.NEXT_PUBLIC_AP_ID}`,
      {
        search_text: "",
        search_status: -1,
        page: 1,
        limit: 100,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    if (res.data.status === "success") {
      const sortedItems = res.data.data.items.sort(
        (a: menuType, b: menuType) => a.mng_sort - b.mng_sort // Sort ascending by mng_sort
      );
      setMenuList(sortedItems);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);
  return (
    <div>
      <CardBox>
        <MenuTable menuList={menuList} getMenuList={getMenuList} />
      </CardBox>
    </div>
  );
};

export default MenuMangement;
