import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import NotFound from '../shared/NotFound/NotFound'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import SignInPage from '@/pages/SignInPage/SignInPage'
import SupplierPage from '@/pages/Supplier/SupplierPage'
import AllStaffPage from '@/pages/StaffAndRolePage/AllStaffPage/AllStaffPage'
import StaffRoleTablePage from '@/pages/StaffAndRolePage/StaffRoleTablePage/StaffRoleTablePage'
import AddStaffRolePage from '@/pages/StaffAndRolePage/AddStaffRolePage/AddStaffRolePage'
import BankPage from '@/pages/BankPage/BankPage'
import CustomersPage from '@/pages/CustomersPage/CustomersPage'
import BrandPage from '@/pages/BrandPage/BrandPage'
import ShowRoomPage from '@/pages/ShowRoomPage/ShowRoomPage'
import ExpensesPage from '@/pages/ExpensesPage/ExpensesPage'

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
        path: '/brand',
        element: <BrandPage />,
      },
      {
        path: '/showroom',
        element: <ShowRoomPage />,
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

      // ------Customers----
      {
        path: '/customers',
        element: <CustomersPage />,
      },

      // ------Expenses----
      {
        path: '/expense',
        element: <ExpensesPage />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
])

export default route
