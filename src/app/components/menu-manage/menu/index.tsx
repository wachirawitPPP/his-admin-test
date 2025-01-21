import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Tooltip,
} from "flowbite-react";
import { IconList, IconEdit, IconTrash } from "@tabler/icons-react";
import { t } from "i18next";
import { menuType, SubMenuType } from "@/utils/type/menuType";
import CardBox from "../../shared/CardBox";
import SubMenuTable from "./SubMenuTable";
import axios from "axios";

interface SubMenuProps {
  groupId: any;
}

const SubMenuApps: React.FC<SubMenuProps> = ({ groupId }) => {
  const [subMenuList, setSubMenuList] = useState([]);
  const [groupMenuData, setGroupMenuData] = useState<menuType>();

  const getGroupMenuData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/${groupId}`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );

      if (res.data.status === "success") {
        setGroupMenuData(res.data.data);
      }
    } catch (error) {}
  };

  const getSubMenuList = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/pagination/${groupId}`,
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
          (a: SubMenuType, b: SubMenuType) => a.mn_sort - b.mn_sort // Sort ascending by mng_sort
        );
        setSubMenuList(sortedItems);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getSubMenuList();
    getGroupMenuData();
  }, []);
  return (
    <div>
      <CardBox>
        <SubMenuTable
          subMenuList={subMenuList}
          getSubMenuList={getSubMenuList}
          groupName={groupMenuData?.mng_name_th}
        />
      </CardBox>
    </div>
  );
};

export default SubMenuApps;
