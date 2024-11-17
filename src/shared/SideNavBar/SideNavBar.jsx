import { useEffect, useState } from "react";
import { logo } from "../../utils/imageImport";
import { Link, useLocation } from "react-router-dom";

import { BiTask } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BsShieldPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { TbCategoryPlus } from "react-icons/tb";

import { ChildMenuItem, DropdownMenu, MenuItem } from "./DropdownAndMenuItem";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const SideNavBar = () => {
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null); // Centralized state to track open dropdown
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = localStorage.getItem("activeDropdown");
    if (saveDropDown) {
      setActiveDropdown(saveDropDown);
    }
  }, []);

  // Toggle dropdowns, collapse others when one is opened
  const toggleDropdown = (dropdown) => {
    const newActiveDropdown = activeDropdown === dropdown ? null : dropdown;
    setActiveDropdown(newActiveDropdown);

    localStorage.setItem("activeDropdown", newActiveDropdown);
  };

  // Collapse all dropdowns when a menu item is clicked
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    localStorage.removeItem("activeDropdown");
  };
  const isActive = (route) =>
    pathname === route
      ? "bg-blueColor-600 text-white font-semibold border-blueColor-100 "
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-blueColor-800 text-gray-50">
      <div className="flex-grow">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-blueColor-600 mt-1 pb-3">
          <Link to="/">
            <img src={logo} alt="Logo" width={200} height={100} />
          </Link>
        </div>
        {/* Menu */}
        <ul className="flex flex-col pb-4 space-y-[2px]">
          <MenuItem
            to="/"
            icon={GoHome}
            label="Dashboard"
            isActive={isActive("/")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <DropdownMenu
            label="Task"
            icon={BiTask}
            isOpen={activeDropdown === "task"}
            onClick={() => toggleDropdown("task")}
          >
            <ChildMenuItem
              to="/category"
              icon={TbCategoryPlus}
              label="Category"
              isActive={isActive("/category")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Staff"
            icon={FiUsers}
            isOpen={activeDropdown === "staff"}
            onClick={() => toggleDropdown("staff")}
          >
            <ChildMenuItem
              to="/all-staff"
              icon={PiUsersThree}
              label="All Staff"
              isActive={isActive("/all-staff")}
            />
            <ChildMenuItem
              to="/create-staff-role"
              icon={BsShieldPlus}
              label="Add Staff Role"
              isActive={isActive("/create-staff-role")}
            />
            <ChildMenuItem
              to="/staff-role"
              icon={BsShieldPlus}
              label="Staff Role"
              isActive={isActive("/staff-role")}
            />
          </DropdownMenu>

          <MenuItem
            to="/supplier"
            icon={FaUsers}
            label="Supplier"
            isActive={isActive("/supplier")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
