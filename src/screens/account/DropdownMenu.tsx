import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import AllCountries from "./AllCountries";
type CustomDropdownprops = {
  country: string;
};
const DropdownMenu: FC<CustomDropdownprops> = ({ country }) => {
  const [selectedItem, setSelectedItem] = useState("Tanzania");

  const handleMenuItemClick = (item: React.SetStateAction<string>) => {
    setSelectedItem(item);
  };
  const [countryname] = AllCountries();

  return (
    <div className="h-64">
      <span className="mr-4 mt-4">Country:</span>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedItem}
        </MenuButton>
        <MenuList maxH="200px" overflowY="auto">
          {countryname?.map((items, index) => {
            return (
              <MenuItem
                key={index}
                minH="48px"
                onClick={() => handleMenuItemClick(items.country)}
              >
                <span>{items.country}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
