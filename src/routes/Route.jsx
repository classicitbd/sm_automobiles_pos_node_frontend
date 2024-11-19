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

const route = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      // ------Task Start------
      {
        path: '/category',
        element: <CategoryPage />,
      },
      {
        path: '/supplier',
        element: <SupplierPage />,
      },
      // ------Staff And Role----
      {
        path: '/all-staff',
        element: <AllStaffPage />,
      },
      {
        path: '/staff-role',
        element: <StaffRoleTablePage />,
      },
      {
        path: '/create-staff-role',
        element: <AddStaffRolePage />,
      },

      // ------Bank Account----
      {
        path: '/bank-account',
        element: <BankPage />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
])

export default route;
