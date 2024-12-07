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
import CustomerPayment from "@/pages/CustomersPage/CustomerPaymentPage/CustomerPayment";
import ProductPage from "@/pages/ProductPage/ProductPage";
import AddProductPage from "@/pages/ProductPage/AddProductPage/AddProductPage";
import UpDateProduct from "@/components/Products/UpDateProduct";
import PrivateRoute from "./privateRoute/PrivateRoute";
import StockManage from "@/pages/StockManage/StockManage";
import PosPage from "@/pages/Pos/PosPage";
import OrderPage from "@/pages/order/OrderPage";
import OrderDetails from "@/components/order/OrderDetails/OrderDetails";
import AllList from "@/components/Customers/CustomerPaymentDueOrderList/AllList";
import SypllierPaymentList from "@/components/Supplier/SypllierPaymentList";
import ProductUnitPage from "@/pages/ProductUnitPage/ProductUnitPage";
import SiteSetting from "@/pages/SiteSetting/SiteSetting";
import SaleTargetPage from "@/pages/SaleTarget/SaleTargetPage";
import CustomerAddPayment from "@/pages/CustomersPage/CustomerPaymentPage/CustomerAddPayment";
import TodayCustomerPayment from "@/pages/CustomersPage/CustomerPaymentPage/TodayCustomerPayment";
import DueCustomerPayment from "@/pages/CustomersPage/CustomerPaymentPage/DueCustomerPayment";
import PaidSupplierPaymentList from "@/pages/Supplier/PaidSupplierPaymentList";
import UnpaidSupplierPaymentList from "@/pages/Supplier/UnpaidSupplierPaymentList";
import ViewSaleTargetPage from "@/pages/SaleTarget/ViewSaleTargetPage/ViewSaleTargetPage";
import BankInPage from "@/pages/BankPage/BankInPage";
import BankOutPage from "@/pages/BankPage/BankOutPage";

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
        element: <div>Home</div>,
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
        path: "/supplierpaymentlist/:supplier_id",
        element: <SypllierPaymentList />,
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

      // ------Bank Account----
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

      // ------Customers----
      {
        path: "/customers",
        element: <CustomersPage />,
      },
      {
        path: "/allPaymentDueOrderList",
        element: <AllList />,
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
        path: "/order-details/:_id",
        element: <OrderDetails />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

export default route;
