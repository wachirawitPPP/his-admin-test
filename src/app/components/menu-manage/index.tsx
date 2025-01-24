"use client";
import React, { useEffect, useState } from "react";
import CardBox from "../shared/CardBox";
import axios from "axios";
import MenuTable from "./GroupMenuTable";
import TablePagination from "../shared/TablePagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchStatus, setSearchStatus] = useState("-1");
  // Loading state
  const getMenuList = async (
    page?: number,
    limit?: number,
    searchText?: string,
    searchStatus?: string
  ) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/groupmenu/pagination/${process.env.NEXT_PUBLIC_AP_ID}`,
      {
        search_text: searchText,
        search_status: Number(searchStatus),
        page,
        limit,
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
      setTotalItems(res.data.data.count_all || 0);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuList(currentPage, itemsPerPage, searchText, searchStatus);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    setCurrentPage(1); // Reset to first page when changing search text
  };

  const handleSearchStatusChange = (searchStatus: string) => {
    setSearchStatus(searchStatus);
    setCurrentPage(1); // Reset to first page when changing search status
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSearch = () => {
    setCurrentPage(1);
    getMenuList(1, itemsPerPage, searchText, searchStatus);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      <CardBox>
        <MenuTable
          menuList={menuList}
          getMenuList={getMenuList}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          searchStatus={searchStatus}
          handleSearchStatusChange={handleSearchStatusChange}
          handleSearch={handleSearch}
          loading={loading}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </CardBox>
    </div>
  );
};

export default MenuMangement;
