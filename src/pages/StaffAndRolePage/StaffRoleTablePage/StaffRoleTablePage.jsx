import { Link } from 'react-router-dom'
import StaffRoleTable from '../../../components/StaffRole/StaffRoleTable'

const StaffRoleTablePage = () => {
  //Add Staff Role Modal State

  return (
    <div className='bg-white rounded py-6 px-4 max-w-7xl mx-auto shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Staff Role</h1>
        </div>
        <div>
          <Link to='/create-staff-role'>
            <button className='w-[138px] h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor  text-white text-sm'>
              Add Staff Role
            </button>
          </Link>
        </div>
      </div>
      {/* Show Staff Role Table */}
      <StaffRoleTable />
    </div>
  )
}

export default StaffRoleTablePage
