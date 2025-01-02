import { useContext, useEffect, useState } from "react";
import { logo } from "../../utils/imageImport";
import { Link, useLocation } from "react-router-dom";
import { GiPayMoney, GiReceiveMoney, GiTargetShot } from "react-icons/gi";
import { BiTask } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BsShieldPlus } from "react-icons/bs";
import { PiUsersThree } from "react-icons/pi";
import { TbCategoryPlus, TbHttpPost } from "react-icons/tb";
import { SiVirustotal } from "react-icons/si";

import {
  ChildDropdownMenu,
  ChildMenuItem,
  DropdownMenu,
  MenuItem,
  SubChildMenuItem,
} from "./DropdownAndMenuItem";
import { FiUsers } from "react-icons/fi";
import {
  FaCcAmazonPay,
  FaMoneyBillAlt,
  FaProductHunt,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import {
  MdAccountBalanceWallet,
  MdOutlinePayments,
  MdSettingsSuggest,
} from "react-icons/md";
import { RiFolderReceivedFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { AuthContext } from "@/context/AuthProvider";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { AiFillMoneyCollect } from "react-icons/ai";

const SideNavBar = () => {
  const { user, loading } = useContext(AuthContext);

  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null); // Centralized state to track open dropdown
  const [activeChildDropdown, setActiveChildDropdown] = useState(null); // Centralized state to track open dropdown

  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = localStorage.getItem("activeDropdown");
    if (saveDropDown) {
      setActiveDropdown(saveDropDown);
    }
    const saveChildDropDown = localStorage.getItem("activeChildDropdown");
    if (saveChildDropDown) {
      setActiveDropdown(saveChildDropDown);
    }
  }, []);

  // Toggle dropdowns, collapse others when one is opened
  const toggleDropdown = (dropdown) => {
    const newActiveDropdown = activeDropdown === dropdown ? null : dropdown;
    setActiveDropdown(newActiveDropdown);

    localStorage.setItem("activeDropdown", newActiveDropdown);
  };
  // Toggle dropdowns, collapse others when one is opened
  const toggleChildDropdown = (dropdown) => {
    const newActiveChildDropdown =
      activeChildDropdown === dropdown ? null : dropdown;
    setActiveChildDropdown(newActiveChildDropdown);

    localStorage.setItem("activeChildDropdown", newActiveChildDropdown);
  };

  // Collapse all dropdowns when a menu item is clicked
  const closeAllDropdowns = () => {
    setActiveDropdown(null);

    localStorage.removeItem("activeDropdown");
  };

  const closeAllChildDropdowns = () => {
    setActiveChildDropdown(null);
    localStorage.removeItem("activeChildDropdown");
  };
  const isActive = (route) =>
    pathname === route
      ? "bg-primaryVariant-600 text-white font-semibold border-primaryVariant-100 "
      : "";

  if (loading) {
    return <LoaderOverlay />;
  }

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
          {/* ....Dashvoard .....*/}
          {/* {user?.user_role_id?.dashboard_show == true && ( */}
          <MenuItem
            to="/"
            icon={GoHome}
            label="Dashboard"
            isActive={isActive("/")}
            onClick={closeAllDropdowns}
          />
          {/* // )} */}
          {/* .......Employe...... */}
          {user?.user_role_id?.employee_route_show == true && (
            <>
              <MenuItem
                to="/empolye-customers"
                icon={TbCategoryPlus}
                label="Customers"
                isActive={isActive("/empolye-customers")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/empolye-orders"
                icon={TbCategoryPlus}
                label="Orders"
                isActive={isActive("/empolye-orders")}
                onClick={closeAllDropdowns}
              />
              {/* <MenuItem
            to="/empolye-profile"
            icon={TbCategoryPlus}
            label="Profile"
            isActive={isActive("/empolye-profile")}
            onClick={closeAllDropdowns}
          /> */}
              {/* <MenuItem
            to="/empolye-salery"
            icon={TbCategoryPlus}
            label="Salery"
            isActive={isActive("/empolye-salery")}
            onClick={closeAllDropdowns}
          /> */}
              <MenuItem
                to="/empolye-sale-Target"
                icon={TbCategoryPlus}
                label="Sale Target"
                isActive={isActive("/empolye-sale-Target")}
                onClick={closeAllDropdowns}
              />
              <MenuItem
                to="/employe-payment"
                icon={TbCategoryPlus}
                label="Payment List"
                isActive={isActive("/employe-payment")}
                onClick={closeAllDropdowns}
              />

              <MenuItem
                to="/add-payment"
                icon={TbCategoryPlus}
                label="Check Collection"
                isActive={isActive("/add-payment")}
                onClick={closeAllDropdowns}
              />
            </>
          )}

          {/* ....Task Bar....... */}
          {(user?.user_role_id?.category_post === true ||
            user?.user_role_id?.category_patch === true ||
            user?.user_role_id?.brand_post === true ||
            user?.user_role_id?.brand_patch === true) && (
            // ||
            // user?.user_role_id?.unit_dashboard_show === true
            // ||
            // user?.user_role_id?.unit_post === true ||
            // user?.user_role_id?.unit_patch === true
            <DropdownMenu
              label="Task"
              icon={BiTask}
              isOpen={activeDropdown === "task"}
              onClick={() => toggleDropdown("task")}
            >
              {(user?.user_role_id?.category_post === true ||
                user?.user_role_id?.category_patch === true) && (
                <ChildMenuItem
                  to="/category"
                  icon={TbCategoryPlus}
                  label="Category"
                  isActive={isActive("/category")}
                />
              )}

              {(user?.user_role_id?.brand_post === true ||
                user?.user_role_id?.brand_patch === true) && (
                <ChildMenuItem
                  to="/brand"
                  icon={TbCategoryPlus}
                  label="Brand"
                  isActive={isActive("/brand")}
                />
              )}

              {/* {user?.user_role_id?.unit_dashboard_show === true && (
                <ChildMenuItem
                  to="/units"
                  icon={TbCategoryPlus}
                  label="Units"
                  isActive={isActive("/units")}
                />
              )} */}
            </DropdownMenu>
          )}
          {/* ....Site Setting..... */}
          {user?.user_role_id?.site_setting_patch === true && (
            <MenuItem
              to="/site_setting"
              icon={MdSettingsSuggest}
              label="Site Setting"
              isActive={isActive("/site_setting")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* .....Staff.....  */}
          {(user?.user_role_id?.user_post === true ||
            user?.user_role_id?.user_patch === true ||
            user?.user_role_id?.user_dashboard_show === true ||
            user?.user_role_id?.role_post === true ||
            user?.user_role_id?.role_patch === true) && (
            <DropdownMenu
              label="Staff"
              icon={FiUsers}
              isOpen={activeDropdown === "staff"}
              onClick={() => toggleDropdown("staff")}
            >
              {user?.user_role_id?.user_dashboard_show === true && (
                <ChildMenuItem
                  to="/all-staff"
                  icon={PiUsersThree}
                  label="All Staff"
                  isActive={isActive("/all-staff")}
                />
              )}
              {(user?.user_role_id?.role_post === true ||
                user?.user_role_id?.role_patch === true) && (
                <ChildMenuItem
                  to="/create-staff-role"
                  icon={BsShieldPlus}
                  label="Add Staff Role"
                  isActive={isActive("/create-staff-role")}
                />
              )}

              {(user?.user_role_id?.role_post === true ||
                user?.user_role_id?.role_patch === true) && (
                <ChildMenuItem
                  to="/staff-role"
                  icon={BsShieldPlus}
                  label="Staff Role"
                  isActive={isActive("/staff-role")}
                />
              )}
            </DropdownMenu>
          )}
          {/* .....Sale Target..... */}
          {(user?.user_role_id?.sale_target_post === true ||
            user?.user_role_id?.sale_target_patch === true) && (
            <MenuItem
              to="/sale-target"
              icon={GiTargetShot}
              label="Sales Target"
              isActive={isActive("/sale-target")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* ....Supplier List.... */}
          {user?.user_role_id?.supplier_dashboard_show === true && (
            <MenuItem
              to="/supplier"
              icon={FaUsers}
              label="Supplier List"
              isActive={isActive("/supplier")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* ....Bank Account.... */}
          {user?.user_role_id?.bank_dashboard_show === true && (
            <MenuItem
              to="/bank-account"
              icon={FaUsers}
              label="Bank Account"
              isActive={isActive("/bank-account")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* ....Customers.... */}
          {user?.user_role_id?.customer_dashboard_show === true && (
            <MenuItem
              to="/customers"
              icon={FaUsers}
              label="Customers"
              isActive={isActive("/customers")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* .......Product  ...... */}
          {(user?.user_role_id?.product_post === true ||
            user?.user_role_id?.product_patch === true ||
            user?.user_role_id?.product_dashboard_show === true ||
            user?.user_role_id?.stock_post === true) && (
            <DropdownMenu
              label="Product"
              icon={BiTask}
              isOpen={activeDropdown === "product"}
              onClick={() => toggleDropdown("product")}
            >
              {user?.user_role_id?.product_dashboard_show === true && (
                <ChildMenuItem
                  to="/product"
                  icon={TbCategoryPlus}
                  label="Stock List"
                  isActive={isActive("/product")}
                />
              )}
              {user?.user_role_id?.product_post === true && (
                <ChildMenuItem
                  to="/add-product"
                  icon={TbCategoryPlus}
                  label="Add Product"
                  isActive={isActive("/add-product")}
                />
              )}
              {user?.user_role_id?.stock_post === true && (
                <ChildMenuItem
                  to="/stock_manage"
                  icon={TbCategoryPlus}
                  label="Product Purchase"
                  isActive={isActive("/stock_manage")}
                />
              )}
            </DropdownMenu>
          )}
          {/* ...Expense.... */}
          {user?.user_role_id?.expense_show === true && (
            <MenuItem
              to="/expense"
              icon={BiTask}
              label="Expenses"
              isActive={isActive("/expense")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* ...Income.... */}
          {user?.user_role_id?.income_show === true && (
            <MenuItem
              to="/income"
              icon={BiTask}
              label="Incomes"
              isActive={isActive("/income")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/* ...Income.... */}
          {user?.user_role_id?.order_post === true && (
            <MenuItem
              to="/pos"
              icon={TbHttpPost}
              label="POS"
              isActive={isActive("/pos")}
              onClick={closeAllDropdowns} // Close all dropdowns when clicked
            />
          )}
          {/*....... Order....... */}
          {(user?.user_role_id?.order_patch === true ||
            user?.user_role_id?.order_dashboard_show === true ||
            user?.user_role_id?.management_order_show === true ||
            user?.user_role_id?.account_order_show === true ||
            user?.user_role_id?.warehouse_order_show === true ||
            user?.user_role_id?.out_of_warehouse_order_show === true) && (
            <DropdownMenu
              label="Order"
              icon={BiTask}
              isOpen={activeDropdown === "order"}
              onClick={() => toggleDropdown("order")}
            >
              {user?.user_role_id?.order_dashboard_show === true && (
                <ChildMenuItem
                  to="/order"
                  icon={FaShoppingCart}
                  label="All Order"
                  isActive={isActive("/order")}
                />
              )}
              {user?.user_role_id?.account_order_show === true && (
                <ChildMenuItem
                  to="/account-order"
                  icon={FaShoppingCart}
                  label="Account Order"
                  isActive={isActive("/account-order")}
                />
              )}
              {user?.user_role_id?.management_order_show === true && (
                <ChildMenuItem
                  to="/management-order"
                  icon={FaShoppingCart}
                  label="Management Order"
                  isActive={isActive("/management-order")}
                />
              )}
              {user?.user_role_id?.warehouse_order_show === true && (
                <ChildMenuItem
                  to="/warehouse-order"
                  icon={FaShoppingCart}
                  label="Warehouse Order"
                  isActive={isActive("/warehouse-order")}
                />
              )}
              {user?.user_role_id?.out_of_warehouse_order_show === true && (
                <ChildMenuItem
                  to="/out-of-warehouse"
                  icon={FaShoppingCart}
                  label="Out Of Warehouse"
                  isActive={isActive("/out-of-warehouse")}
                />
              )}
            </DropdownMenu>
          )}
          {/* .....Pdf File...... */}
          {/* <DropdownMenu
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
          </DropdownMenu> */}

          {/* ....Cheque Collection */}
          
          {(user?.user_role_id?.check_dashboard_show === true ||
            user?.user_role_id?.check_today_dashboard_show === true ||
            user?.user_role_id?.check_today_dashboard_show === true) && (
            <DropdownMenu
              label="Cheque Collection"
              icon={AiFillMoneyCollect}
              isOpen={activeDropdown === "collection"}
              onClick={() => toggleDropdown("collection")}
            >
              {user?.user_role_id?.check_dashboard_show === true && (
                <ChildMenuItem
                  to="/payment"
                  icon={GiReceiveMoney}
                  label="Check Callection List"
                  isActive={isActive("/payment")}
                />
              )}
              {user?.user_role_id?.check_today_dashboard_show === true && (
                <ChildMenuItem
                  to="/today-payment"
                  icon={GiReceiveMoney}
                  label="Today Callection List"
                  isActive={isActive("/today-payment")}
                />
              )}
              {user?.user_role_id?.check_today_dashboard_show === true && (
                <ChildMenuItem
                  to="/due-payment"
                  icon={GiReceiveMoney}
                  label="Due Callection List"
                  isActive={isActive("/due-payment")}
                />
              )}
            </DropdownMenu>
          )}

          {/* .....Account Manegement..... */}

          {(user?.user_role_id?.supplier_payment_patch === true ||
            user?.user_role_id?.supplier_paid_payment_show === true ||
            user?.user_role_id?.supplier_unpaid_payment_show === true ||
            user?.user_role_id?.supplier_check_or_cash_out_payment_show ===
              true ||
            user?.user_role_id?.supplier_payment_dashboard_show === true ||
            user?.user_role_id?.check_dashboard_show === true ||
            user?.user_role_id?.customer_ar_show === true ||
            user?.user_role_id?.check_today_dashboard_show === true ||
            user?.user_role_id?.check_due_dashboard_show === true ||
            user?.user_role_id?.check_or_cash_in_payment_show === true ||
            user?.user_role_id?.profit_show === true ||
            user?.user_role_id?.ledger_show === true ||
            user?.user_role_id?.stock_ap_show === true) && (
            <DropdownMenu
              label="Accounts"
              icon={MdAccountBalanceWallet}
              isOpen={activeDropdown === "accounts"}
              onClick={() => toggleDropdown("accounts")}
            >
              {user?.user_role_id?.profit_show === true && (
                <ChildMenuItem
                  to="/profit"
                  icon={FaProductHunt}
                  label="Profit"
                  isActive={isActive("/profit")}
                  onClick={closeAllChildDropdowns}
                />
              )}

              {/* Account Receiveable */}

              {(user?.user_role_id?.customer_ar_show === true ||
                user?.user_role_id?.check_dashboard_show === true ||
                user?.user_role_id?.check_today_dashboard_show === true ||
                user?.user_role_id?.check_due_dashboard_show === true) && (
                <ChildDropdownMenu
                  label="Account Receivable"
                  icon={RiFolderReceivedFill}
                  isOpen={activeChildDropdown === "ar"}
                  onClick={() => toggleChildDropdown("ar")}
                >
                  {user?.user_role_id?.customer_ar_show === true && (
                    <SubChildMenuItem
                      to="/ar-list"
                      icon={GiReceiveMoney}
                      label="A/R List"
                      isActive={isActive("/ar-list")}
                    />
                  )}
                </ChildDropdownMenu>
              )}

              {/* Account Payable */}

              {(user?.user_role_id?.supplier_payment_dashboard_show === true ||
                user?.user_role_id?.stock_ap_show === true ||
                user?.user_role_id?.supplier_paid_payment_show === true ||
                user?.user_role_id?.supplier_unpaid_payment_show === true) && (
                <ChildDropdownMenu
                  label="Account Payable"
                  icon={FaCcAmazonPay}
                  isOpen={activeChildDropdown === "ap"}
                  onClick={() => toggleChildDropdown("ap")}
                >
                  {user?.user_role_id?.stock_ap_show === true && (
                    <SubChildMenuItem
                      to="/ap-list"
                      icon={GiPayMoney}
                      label="A/P List"
                      isActive={isActive("/ap-list")}
                    />
                  )}
                  {user?.user_role_id?.supplier_payment_dashboard_show ===
                    true && (
                    <SubChildMenuItem
                      to="/purchase-list"
                      icon={GiPayMoney}
                      label="All Payment List"
                      isActive={isActive("/purchase-list")}
                    />
                  )}
                  {user?.user_role_id?.supplier_paid_payment_show === true && (
                    <SubChildMenuItem
                      to="/paid-payment"
                      icon={GiPayMoney}
                      label="Paid Payment List"
                      isActive={isActive("/paid-payment")}
                    />
                  )}
                  {user?.user_role_id?.supplier_unpaid_payment_show ===
                    true && (
                    <SubChildMenuItem
                      to="/unpaid-payment"
                      icon={GiPayMoney}
                      label="Un-Paid Payment List"
                      isActive={isActive("/unpaid-payment")}
                    />
                  )}
                </ChildDropdownMenu>
              )}

              {/* ....Ledger...... */}

              {user?.user_role_id?.ledger_show === true && (
                <ChildMenuItem
                  to="/leisure"
                  icon={SiVirustotal}
                  label="Ledger"
                  isActive={isActive("/leisure")}
                  onClick={closeAllChildDropdowns}
                />
              )}
              {/* Transaction History */}
              {(user?.user_role_id?.check_or_cash_in_payment_show === true ||
                user?.user_role_id?.supplier_check_or_cash_out_payment_show ===
                  true) && (
                <ChildDropdownMenu
                  label="Transaction History"
                  icon={BiTask}
                  isOpen={activeChildDropdown === "transaction-history"}
                  onClick={() => toggleChildDropdown("transaction-history")}
                >
                  {user?.user_role_id?.check_or_cash_in_payment_show ===
                    true && (
                    <SubChildMenuItem
                      to="/check-in"
                      icon={TbCategoryPlus}
                      label="Check In"
                      isActive={isActive("/check-in")}
                    />
                  )}
                  {user?.user_role_id
                    ?.supplier_check_or_cash_out_payment_show === true && (
                    <SubChildMenuItem
                      to="/check-out"
                      icon={TbCategoryPlus}
                      label="Check Out"
                      isActive={isActive("/check-out")}
                    />
                  )}
                  {user?.user_role_id?.check_or_cash_in_payment_show ===
                    true && (
                    <SubChildMenuItem
                      to="/cash-in"
                      icon={TbCategoryPlus}
                      label="Cash In"
                      isActive={isActive("/cash-in")}
                    />
                  )}

                  {user?.user_role_id
                    ?.supplier_check_or_cash_out_payment_show === true && (
                    <SubChildMenuItem
                      to="/cash-out"
                      icon={TbCategoryPlus}
                      label="Cash Out"
                      isActive={isActive("/cash-out")}
                    />
                  )}
                </ChildDropdownMenu>
              )}
            </DropdownMenu>
          )}
          {/* .....Payroll Manegement..... */}

          <DropdownMenu
            label="Payroll"
            icon={RiMoneyDollarBoxFill}
            isOpen={activeDropdown === "payroll"}
            onClick={() => toggleDropdown("payroll")}
          >
            <ChildMenuItem
              to="/salary-sheet"
              icon={FaMoneyBillAlt}
              label="Generate Salary Sheet"
              isActive={isActive("/salary-sheet")}
            />
            <ChildMenuItem
              to="/payment-history"
              icon={MdOutlinePayments}
              label="Payment History"
              isActive={isActive("/payment-history")}
            />
            <ChildMenuItem
              to="/my-payroll"
              icon={MdOutlinePayments}
              label="My Payroll"
              isActive={isActive("/my-payroll")}
            />
          </DropdownMenu>
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
