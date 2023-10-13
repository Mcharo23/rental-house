import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchBarprops } from "../interfaces/type";

const SearchBar: FC<SearchBarprops> = ({ onSearch }) => {
  const [searchedItem, setSearchedItem] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedItem(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="relative h-full w-full sm:w-72 md:w-full lg:w-72 xl:w-80 2xl:w-1/2">
      <div className="absolute inset-y-0 flex items-center pl-2 border-none focus:border-none">
        <FaSearch className="text-slate-700" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchedItem}
        onChange={handleInputChange}
        className="h-full rounded-lg p-2 pl-10 w-full"
      />
    </div>
  );
};

export default SearchBar;
