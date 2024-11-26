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
import PurchasePage from '@/pages/PurchasePage/PurchasePage'
import CustomerPayment from '@/pages/CustomersPage/CustomerPaymentPage/CustomerPayment'
import CustomerDue from '@/pages/CustomersPage/CustomerDuePage/CustomerDue'
import SupplierPayment from '@/pages/Supplier/SupplierPaymentPage/SupplierPayment'
import ProductPage from '@/pages/ProductPage/ProductPage'
import AddProductPage from '@/pages/ProductPage/AddProductPage/AddProductPage'
import UpDateProduct from '@/components/Products/UpDateProduct'

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
      // ------Supplier----

      {
        path: '/supplier',
        element: <SupplierPage />,
      },
      {
        path: '/supplier-payment',
        element: <SupplierPayment />,
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
      {
        path: '/customers-payment',
        element: <CustomerPayment />,
      },
      {
        path: '/customers-due',
        element: <CustomerDue />,
      },

      // ------Expenses----
      {
        path: '/expense',
        element: <ExpensesPage />,
      },
      // ------Purchase----
      {
        path: '/purchase',
        element: <PurchasePage />,
      },
      // ------Product----
      {
        path: '/product',
        element: <ProductPage />,
      },
      {
        path: '/add-product',
        element: <AddProductPage />,
      },
      // '/product/product-update/:id'
      {
        path:'/product/product-update' ,
        element: <UpDateProduct />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
])

export default route
