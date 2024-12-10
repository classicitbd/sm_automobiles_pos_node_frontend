import { useEffect, useState } from "react";
import { logo } from "../../utils/imageImport";
import { Link, useLocation } from "react-router-dom";
import { GiTargetShot } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BsExplicit, BsShieldPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { TbCategoryPlus, TbHttpPost } from "react-icons/tb";

import { ChildMenuItem, DropdownMenu, MenuItem } from "./DropdownAndMenuItem";
import { FiUsers } from "react-icons/fi";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";

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
      ? "bg-primaryVariant-600 text-white font-semibold border-primaryVariant-100 "
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-primaryVariant-800">
      <div className="flex-grow">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-primaryVariant-600 mt-1 pb-3">
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
            <ChildMenuItem
              to="/brand"
              icon={TbCategoryPlus}
              label="Brand"
              isActive={isActive("/brand")}
            />
            <ChildMenuItem
              to="/units"
              icon={TbCategoryPlus}
              label="Units"
              isActive={isActive("/units")}
            />
          </DropdownMenu>

          <MenuItem
            to="/site_setting"
            icon={MdSettingsSuggest}
            label="Site Setting"
            isActive={isActive("/site_setting")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

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
            to="/sale-target"
            icon={GiTargetShot}
            label="Sales Target"
            isActive={isActive("/sale-target")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <DropdownMenu
            label="Supplier"
            icon={BiTask}
            isOpen={activeDropdown === "supplier"}
            onClick={() => toggleDropdown("supplier")}
          >
            <ChildMenuItem
              to="/supplier"
              icon={FaUsers}
              label="Supplier List"
              isActive={isActive("/supplier")}
            />
            <ChildMenuItem
              to="/paid-payment"
              icon={TbCategoryPlus}
              label="Paid Payment List"
              isActive={isActive("/paid-payment")}
            />
            <ChildMenuItem
              to="/unpaid-payment"
              icon={TbCategoryPlus}
              label="Un-Paid Payment List"
              isActive={isActive("/unpaid-payment")}
            />
          </DropdownMenu>

          <MenuItem
            to="/bank-account"
            icon={FaUsers}
            label="Bank Account"
            isActive={isActive("/bank-account")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/customers"
            icon={FaUsers}
            label="Customers"
            isActive={isActive("/customers")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <DropdownMenu
            label="Customer Payment"
            icon={BiTask}
            isOpen={activeDropdown === "payment"}
            onClick={() => toggleDropdown("payment")}
          >
            <ChildMenuItem
              to="/payment"
              icon={TbCategoryPlus}
              label="Payment List"
              isActive={isActive("/payment")}
            />
            <ChildMenuItem
              to="/today-payment"
              icon={TbCategoryPlus}
              label="Today Payment List"
              isActive={isActive("/today-payment")}
            />
            <ChildMenuItem
              to="/due-payment"
              icon={TbCategoryPlus}
              label="Due Payment List"
              isActive={isActive("/due-payment")}
            />
            <ChildMenuItem
              to="/add-payment"
              icon={TbCategoryPlus}
              label="Add Payment"
              isActive={isActive("/add-payment")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Product"
            icon={BiTask}
            isOpen={activeDropdown === "product"}
            onClick={() => toggleDropdown("product")}
          >
            <ChildMenuItem
              to="/product"
              icon={TbCategoryPlus}
              label="Stock List"
              isActive={isActive("/product")}
            />
            <ChildMenuItem
              to="/add-product"
              icon={TbCategoryPlus}
              label="Add Product"
              isActive={isActive("/add-product")}
            />
            <ChildMenuItem
              to="/stock_manage"
              icon={TbCategoryPlus}
              label="Product Purchase"
              isActive={isActive("/stock_manage")}
            />
          </DropdownMenu>

          <MenuItem
            to="/expense"
            icon={BiTask}
            label="Expenses"
            isActive={isActive("/expense")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <MenuItem
            to="/pos"
            icon={TbHttpPost}
            label="POS"
            isActive={isActive("/pos")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <DropdownMenu
            label="Order"
            icon={BiTask}
            isOpen={activeDropdown === "order"}
            onClick={() => toggleDropdown("order")}
          >
            <ChildMenuItem
              to="/order"
              icon={FaShoppingCart}
              label="All Order"
              isActive={isActive("/order")}
            />
            <ChildMenuItem
              to="/management-order"
              icon={FaShoppingCart}
              label="Management Order"
              isActive={isActive("/management-order")}
            />
            <ChildMenuItem
              to="/warehouse-order"
              icon={FaShoppingCart}
              label="Warehouse Order"
              isActive={isActive("/warehouse-order")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="PDF FILE"
            icon={BiTask}
            isOpen={activeDropdown === "pdf"}
            onClick={() => toggleDropdown("pdf")}
          >
            <ChildMenuItem
              to="/pdf-print"
              icon={TbCategoryPlus}
              label="PDF-Print"
              isActive={isActive("/pdf-print")}
            />
            <ChildMenuItem
              to="/supplier-print"
              icon={TbCategoryPlus}
              label="SupplierPdf-Print"
              isActive={isActive("/supplier-print")}
            />
            <ChildMenuItem
              to="/voucher-pdf"
              icon={TbCategoryPlus}
              label="Payment Voucher"
              isActive={isActive("/voucher-pdf")}
            />
          </DropdownMenu>
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
