import React from "react";
import { Pagination, Select } from "flowbite-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
      <div>
        <span className="text-sm">
          Showing{" "}
          <span className="text-primary font-semibold">
            {Math.min(itemsPerPage, totalItems - (currentPage - 1) * itemsPerPage)}
          </span>{" "}
          of <span className="text-primary font-semibold">{totalItems}</span> records
        </span>
      </div>
      <div className="flex items-center gap-2">
      {totalPages > 1 && (
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          previousLabel=""
          nextLabel=""
          showIcons
        />
      )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Items per page:</span>
        <Select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="select-md w-20"
          
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </div>
      
    </div>
  );
};

export default TablePagination;
