import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import NotFound from "../shared/NotFound/NotFound";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import SupplierPage from "@/pages/Supplier/SupplierPage";
import AllStaffPage from "@/pages/StaffAndRolePage/AllStaffPage/AllStaffPage";
import StaffRoleTablePage from "@/pages/StaffAndRolePage/StaffRoleTablePage/StaffRoleTablePage";
import AddStaffRolePage from "@/pages/StaffAndRolePage/AddStaffRolePage/AddStaffRolePage";
import BankPage from "@/pages/BankPage/BankPage";
import CustomersPage from "@/pages/CustomersPage/CustomersPage";
import BrandPage from "@/pages/BrandPage/BrandPage";
import CustomerPayment from "@/pages/CustomerPaymentPage/CustomerPayment";
import ProductPage from "@/pages/ProductPage/ProductPage";
import AddProductPage from "@/pages/ProductPage/AddProductPage/AddProductPage";
import UpDateProduct from "@/components/Products/UpDateProduct";
import PrivateRoute from "./privateRoute/PrivateRoute";
import StockManage from "@/pages/StockManage/StockManage";
import PosPage from "@/pages/Pos/PosPage";
import OrderPage from "@/pages/order/OrderPage";
import OrderDetails from "@/components/order/OrderDetails/OrderDetails";
import SypllierPaymentList from "@/components/Supplier/SypllierPaymentList";
import ProductUnitPage from "@/pages/ProductUnitPage/ProductUnitPage";
import SiteSetting from "@/pages/SiteSetting/SiteSetting";
import SaleTargetPage from "@/pages/SaleTarget/SaleTargetPage";
import CustomerAddPayment from "@/pages/CustomerPaymentPage/CustomerAddPayment";
import TodayCustomerPayment from "@/pages/CustomerPaymentPage/TodayCustomerPayment";
import DueCustomerPayment from "@/pages/CustomerPaymentPage/DueCustomerPayment";
import PaidSupplierPaymentList from "@/pages/Supplier/PaidSupplierPaymentList";
import UnpaidSupplierPaymentList from "@/pages/Supplier/UnpaidSupplierPaymentList";
import ViewSaleTargetPage from "@/pages/SaleTarget/ViewSaleTargetPage/ViewSaleTargetPage";
import BankInPage from "@/pages/BankPage/BankInPage";
import BankOutPage from "@/pages/BankPage/BankOutPage";
import ExpensePage from "@/pages/Expense/ExpensePage";

import CustomerPaymentList from "@/components/Customers/CustomerPaymentList";
import CustomerOrderList from "@/components/Customers/CustomerOrderList";
import PdfPrintPage from "@/pages/AllPdfPrintPage/PdfPrintPage";
import SupplierPdf from "@/pages/AllPdfPrintPage/SupplierPdf";
import PaymentVoucher from "@/pages/AllPdfPrintPage/PaymentVoucher";
import ManagementOrder from "@/pages/order/ManagementOrder";
import WarehouseOrder from "@/pages/order/WarehouseOrder";
import StaffPerfomance from "@/components/AllStaff/StaffPerfomance";
import SalleTargetView from "@/components/AllStaff/SalleTargetView";
import PriceHistory from "@/components/Products/PriceHistory";
import PurchageHistory from "@/components/Products/PurchageHistory";
import OrderHistory from "@/components/Products/OrderHistory";
import IncomePage from "@/pages/income/IncomePage";
import ProfitPage from "@/pages/ProfitPage/ProfitPage";
import LeisurePage from "@/pages/LeisurePage/LeisurePage";
import OutOfWarehouse from "@/pages/order/OutOfWarehouse";
import Customers from "@/components/CustomersPayment/Employe/Customers";
import Orders from "@/components/CustomersPayment/Employe/Orders";
import Profile from "@/components/CustomersPayment/Employe/Profile";
import Salery from "@/components/CustomersPayment/Employe/Salery";
import SaleTarget from "@/components/CustomersPayment/Employe/SaleTarget";
import StockPurchase from "@/components/Supplier/StockPurchase";
import EmployePaymentList from "@/components/CustomersPayment/Employe/EmployePaymentList";
import CheckInPayment from "@/pages/CheckAndCashInOut/CheckInPayment";
import CashInPayment from "@/pages/CheckAndCashInOut/CashInPayment";
import CheckOutPayment from "@/pages/CheckAndCashInOut/CheckOutPayment";
import CashOutPayment from "@/pages/CheckAndCashInOut/CashOutPayment";
import PurchaseListPage from "@/pages/PurchaseListPage/PurchaseListPage";
import ARPaymentPage from "@/pages/CustomerPaymentPage/ARPaymentPage";
import DashBoardPage from "@/pages/DashboardPage/DashBoardPage";
import APListPage from "@/pages/AP/APListPage";
import AccountOrder from "@/pages/order/AccountOrder";
import CashBalanceHistory from "@/pages/BankPage/CashBalanceHistory";
import BankBalanceUpdateHistory from "@/pages/BankPage/BankBalanceUpdateHistory";
import SaleryPage from "@/pages/SalaryModulePage/SaleryPage";
import GeneRateSalarySheet from "@/components/Salary/GeneRateSalarySheet";
import PaymentHistoryPage from "@/pages/SalaryModulePage/PaymentHistoryPage";
import MyPayrollPage from "@/pages/SalaryModulePage/MyPayrollPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <DashBoardPage />,
      },
      // ------Pos Start------
      {
        path: "/pos",
        element: <PosPage />,
      },
      // ------Task Start------
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/brand",
        element: <BrandPage />,
      },
      {
        path: "/units",
        element: <ProductUnitPage />,
      },
      {
        path: "/site_setting",
        element: <SiteSetting />,
      },
      {
        path: "/sale-target",
        element: <SaleTargetPage />,
      },
      {
        path: "/sale-target-view/:id",
        element: <ViewSaleTargetPage />,
      },
      // ------Supplier----

      {
        path: "/supplier",
        element: <SupplierPage />,
      },
      {
        path: "/paid-payment",
        element: <PaidSupplierPaymentList />,
      },
      {
        path: "/unpaid-payment",
        element: <UnpaidSupplierPaymentList />,
      },
      {
        path: "/supplier-paymentlist/:supplier_id",
        element: <SypllierPaymentList />,
      },

      {
        path: "/stock_manage/supplier_stock/:supplier_id",
        element: <StockPurchase />,
      },
      // ------Staff And Role----
      {
        path: "/all-staff",
        element: <AllStaffPage />,
      },
      {
        path: "/staff-role",
        element: <StaffRoleTablePage />,
      },
      {
        path: "/create-staff-role",
        element: <AddStaffRolePage />,
      },
      {
        path: "/staff-Perfomance/:user_id",
        element: <StaffPerfomance />,
      },
      {
        path: "/sale-target/:user_id",
        element: <SalleTargetView />,
      },

      // ------Bank Account----
      {
        path: "/cash-balance-history",
        element: <CashBalanceHistory />,
      },
      {
        path: "/bank-balance-history/:bank_id",
        element: <BankBalanceUpdateHistory />,
      },
      {
        path: "/bank-account",
        element: <BankPage />,
      },
      {
        path: "/bank-in/:id",
        element: <BankInPage />,
      },
      {
        path: "/bank-out/:id",
        element: <BankOutPage />,
      },
      // check and cash in out
      {
        path: "/check-in",
        element: <CheckInPayment />,
      },
      {
        path: "/cash-in",
        element: <CashInPayment />,
      },
      {
        path: "/check-out",
        element: <CheckOutPayment />,
      },
      {
        path: "/cash-out",
        element: <CashOutPayment />,
      },

      // ------Customers----
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/customer-viewOrder/:customer_id",
        element: <CustomerOrderList />,
      },
      {
        path: "/customer-paymentList/:customer_id",
        element: <CustomerPaymentList />,
      },
      {
        path: "/ar-list",
        element: <ARPaymentPage />,
      },
      {
        path: "/payment",
        element: <CustomerPayment />,
      },
      {
        path: "/today-payment",
        element: <TodayCustomerPayment />,
      },
      {
        path: "/due-payment",
        element: <DueCustomerPayment />,
      },
      {
        path: "/add-payment",
        element: <CustomerAddPayment />,
      },
      {
        path: "/expense",
        element: <ExpensePage />,
      },
      {
        path: "/income",
        element: <IncomePage />,
      },

      // ------Stock Manage----
      {
        path: "/stock_manage",
        element: <StockManage />,
      },
      // ------Product----
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/add-product",
        element: <AddProductPage />,
      },
      {
        path: "/price-update-history/:product_id",
        element: <PriceHistory />,
      },
      {
        path: "/purchage-history/:product_id",
        element: <PurchageHistory />,
      },
      {
        path: "/order-history/:product_id",
        element: <OrderHistory />,
      },
      // '/product/product-update/:id'
      {
        path: "/update-product/:product_id",
        element: <UpDateProduct />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/management-order",
        element: <ManagementOrder />,
      },
      {
        path: "/account-order",
        element: <AccountOrder />,
      },
      {
        path: "/warehouse-order",
        element: <WarehouseOrder />,
      },
      {
        path: "/out-of-warehouse",
        element: <OutOfWarehouse />,
      },
      {
        path: "/order-details/:_id",
        element: <OrderDetails />,
      },
      // 'Pdf Print'
      {
        path: "/pdf-print",
        element: <PdfPrintPage />,
      },
      {
        path: "/supplier-print",
        element: <SupplierPdf />,
      },
      {
        path: "/voucher-pdf",
        element: <PaymentVoucher />,
      },
      // Accounts Start......
      {
        path: "/profit",
        element: <ProfitPage />,
      },
      {
        path: "/leisure",
        element: <LeisurePage />,
      },
      //Employe.......
      {
        path: "/empolye-customers",
        element: <Customers />,
      },
      {
        path: "/empolye-orders",
        element: <Orders />,
      },
      {
        path: "/empolye-profile",
        element: <Profile />,
      },
      {
        path: "/empolye-salery",
        element: <Salery />,
      },
      {
        path: "/empolye-sale-Target",
        element: <SaleTarget />,
      },
      {
        path: "/employe-payment",
        element: <EmployePaymentList />,
      },
      {
        path: "/purchase-list",
        element: <PurchaseListPage />,
      },
      {
        path: "/ap-list",
        element: <APListPage />,
      },
      //Salery routes..........
      {
        path: "/salary-sheet",
        element: <SaleryPage />,
      },
      {
        path: "/generate-salary-sheet/:id",
        element: <GeneRateSalarySheet />,
      },
      {
        path: "/payment-history",
        element: <PaymentHistoryPage />,
      },
      {
        path: "/my-payroll",
        element: <MyPayrollPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

export default route;
