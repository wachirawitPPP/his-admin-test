"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RoleTable from "./RoleTable";
import { RoleType } from "@/utils/type/roleType";
import CardBox from "../shared/CardBox";
import TablePagination from "../shared/TablePagination";

const RoleManagementApps = () => {
  const [roleList, setRoleList] = useState<RoleType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [loading, setLoading] = useState(false); // Loading state

  // Filter state
  const [searchText, setSearchText] = useState("");
  const [searchStatus, setSearchStatus] = useState("-1"); // -1 for all, 1 for active, 0 for inactive

  const getRole = async (
    page: number,
    limit: number,
    searchText?: string,
    searchStatus?: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/role/pagination/${process.env.NEXT_PUBLIC_AP_ID}`,
        {
          search_text: searchText,
          search_status: Number(searchStatus),
          page,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        const sortedItems = response.data.data.items.sort(
          (a: RoleType, b: RoleType) => a.rl_sort - b.rl_sort
        );
        setRoleList(sortedItems);
        setTotalItems(response.data.data.count_all || 0);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRole(currentPage, itemsPerPage, searchText, searchStatus);
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
    getRole(1, itemsPerPage, searchText, searchStatus);
  };

  // Calculate total pages dynamically based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <CardBox>
        <RoleTable
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          searchStatus={searchStatus}
          handleSearchStatusChange={handleSearchStatusChange}
          handleSearch={handleSearch}
          loading={loading}
          roleList={roleList}
          getRoleList={() => getRole(currentPage, itemsPerPage)}
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

export default RoleManagementApps;
