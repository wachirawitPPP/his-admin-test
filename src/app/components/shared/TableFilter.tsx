import { Select, Button, TextInput, Spinner } from "flowbite-react";

interface RoleFilterProps {
  searchText: string;
  searchStatus:string
  handleSearchStatusChange: (value:string) => void;
  handleSearchTextChange:(value:string)=>void;
  onSearch:()=>void;
  placeholderText?:string
}

const TableFilter: React.FC<RoleFilterProps> = ({
  searchText,
  searchStatus,
  handleSearchTextChange,
  handleSearchStatusChange,
  onSearch,
  placeholderText
}) => {
  return (
    <div className="flex flex-col md:flex-row   items-center gap-4 ">
      <TextInput
        type="text"
        placeholder={placeholderText||"Search"}
        value={searchText}
        onChange={(e) => handleSearchTextChange(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();  // Call the search function when Enter is pressed
            }
          }}
        className="form-rounded-md text-primary w-full md:w-6/12"
      />

      <Select
        value={searchStatus}
        onChange={(e) => handleSearchStatusChange(e.target.value)}
        className="select-md w-full md:w-6/12"
      >
        <option value="-1">All Status</option>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </Select>

      <Button
        onClick={onSearch}
        color={"primary"}
        className="w-full md:w-auto"
       
      >
       Search
      </Button>
    </div>
  );
};

export default TableFilter;
