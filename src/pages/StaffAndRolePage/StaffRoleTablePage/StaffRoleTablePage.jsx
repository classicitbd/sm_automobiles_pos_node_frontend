import { Link } from 'react-router-dom'
import StaffRoleTable from '../../../components/StaffRole/StaffRoleTable'
import { Button } from '@/components/ui/button'

const StaffRoleTablePage = () => {
  //Add Staff Role Modal State

  return (
    <div className=' py-6 px-4 max-w-7xl mx-auto'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Staff Role</h1>
        </div>
        <div>
          <Link to='/create-staff-role'>
            <Button>Add Staff Role</Button>
          </Link>
        </div>
      </div>
      {/* Show Staff Role Table */}
      <StaffRoleTable />
    </div>
  )
}

export default StaffRoleTablePage
