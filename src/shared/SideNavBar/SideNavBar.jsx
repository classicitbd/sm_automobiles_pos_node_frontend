import { useEffect, useState } from 'react'
import { logo } from '../../utils/imageImport'
import { Link, useLocation } from 'react-router-dom'

import { BiTask } from 'react-icons/bi'
import { GoHome } from 'react-icons/go'
import { BsExplicit, BsShieldPlus } from 'react-icons/bs'
import { PiUsersThree } from 'react-icons/pi'
import { TbCategoryPlus } from 'react-icons/tb'

import { ChildMenuItem, DropdownMenu, MenuItem } from './DropdownAndMenuItem'
import { FiUsers } from 'react-icons/fi'
import { FaUsers, FaUserTie } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { SiPurgecss } from 'react-icons/si'

const SideNavBar = () => {
  const { pathname } = useLocation()
  const [activeDropdown, setActiveDropdown] = useState(null) // Centralized state to track open dropdown
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = localStorage.getItem('activeDropdown')
    if (saveDropDown) {
      setActiveDropdown(saveDropDown)
    }
  }, [])

  // Toggle dropdowns, collapse others when one is opened
  const toggleDropdown = (dropdown) => {
    const newActiveDropdown = activeDropdown === dropdown ? null : dropdown
    setActiveDropdown(newActiveDropdown)

    localStorage.setItem('activeDropdown', newActiveDropdown)
  }

  // Collapse all dropdowns when a menu item is clicked
  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    localStorage.removeItem('activeDropdown')
  }
  const isActive = (route) =>
    pathname === route
      ? 'bg-primaryVariant-600 text-white font-semibold border-primaryVariant-100 '
      : ''

  return (
    <div className='flex flex-col min-h-screen bg-primaryVariant-800'>
      <div className='flex-grow'>
        {/* Logo */}
        <div className='flex items-center justify-center border-b border-primaryVariant-600 mt-1 pb-3'>
          <Link to='/'>
            <img src={logo} alt='Logo' width={200} height={100} />
          </Link>
        </div>
        {/* Menu */}
        <ul className='flex flex-col pb-4 space-y-[2px]'>
          <MenuItem
            to='/'
            icon={GoHome}
            label='Dashboard'
            isActive={isActive('/')}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <DropdownMenu
            label='Task'
            icon={BiTask}
            isOpen={activeDropdown === 'task'}
            onClick={() => toggleDropdown('task')}
          >
            <ChildMenuItem
              to='/category'
              icon={TbCategoryPlus}
              label='Category'
              isActive={isActive('/category')}
            />
            <ChildMenuItem
              to='/brand'
              icon={TbCategoryPlus}
              label='Brand'
              isActive={isActive('/brand')}
            />
            <ChildMenuItem
              to='/showroom'
              icon={TbCategoryPlus}
              label='Show Room'
              isActive={isActive('/showroom')}
            />
          </DropdownMenu>

          <DropdownMenu
            label='Staff'
            icon={FiUsers}
            isOpen={activeDropdown === 'staff'}
            onClick={() => toggleDropdown('staff')}
          >
            <ChildMenuItem
              to='/all-staff'
              icon={PiUsersThree}
              label='All Staff'
              isActive={isActive('/all-staff')}
            />
            <ChildMenuItem
              to='/create-staff-role'
              icon={BsShieldPlus}
              label='Add Staff Role'
              isActive={isActive('/create-staff-role')}
            />
            <ChildMenuItem
              to='/staff-role'
              icon={BsShieldPlus}
              label='Staff Role'
              isActive={isActive('/staff-role')}
            />
          </DropdownMenu>
          <DropdownMenu
            label='About Supplier'
            icon={BiTask}
            isOpen={activeDropdown === 'supplier'}
            onClick={() => toggleDropdown('supplier')}
          >
            <ChildMenuItem
              to='/supplier'
              icon={FaUsers}
              label='Supplier'
              isActive={isActive('/supplier')}
            />
          </DropdownMenu>
          <DropdownMenu
            label='About Bank Account'
            icon={BiTask}
            isOpen={activeDropdown === 'bankAccount'}
            onClick={() => toggleDropdown('bankAccount')}
          >
            <ChildMenuItem
              to='/bank-account'
              icon={MdCheckBoxOutlineBlank}
              label='Bank Account'
              isActive={isActive('/bank-account')}
            />
          </DropdownMenu>
          <DropdownMenu
            label='About Customers'
            icon={BiTask}
            isOpen={activeDropdown === 'customers'}
            onClick={() => toggleDropdown('customers')}
          >
            <ChildMenuItem
              to='/customers'
              icon={FaUserTie}
              label='Customers'
              isActive={isActive('/customers')}
            />
          </DropdownMenu>
          <DropdownMenu
            label='About Expenses'
            icon={BiTask}
            isOpen={activeDropdown === 'expenses'}
            onClick={() => toggleDropdown('expenses')}
          >
            <ChildMenuItem
              to='/expense'
              icon={BsExplicit}
              label='Expenses'
              isActive={isActive('/expense')}
            />
          </DropdownMenu>
          <DropdownMenu
            label='About Purchase'
            icon={BiTask}
            isOpen={activeDropdown === 'purchase'}
            onClick={() => toggleDropdown('purchase')}
          >
            <ChildMenuItem
              to='/purchase'
              icon={SiPurgecss}
              label='Purchase'
              isActive={isActive('/purchase')}
            />
          </DropdownMenu>
        </ul>
      </div>
    </div>
  )
}

export default SideNavBar
