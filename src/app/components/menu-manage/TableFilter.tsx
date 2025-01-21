import { Button } from "flowbite-react";
import React from "react";

interface FilterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getMenuList: () => void;
}

const TableFilter: React.FC<FilterProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default TableFilter;
