import AddCustomers from '@/components/Customers/AddCustomers'
import CustomersTable from '@/components/Customers/CustomersTable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const CustomersPage = () => {
  const [customersCreateModal, setCustomersCreateModal] = useState(false)
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Customers Information</h1>
        </div>

        <div>
          <Button type='button' onClick={() => setCustomersCreateModal(true)}>
            Create Customers
          </Button>
        </div>
      </div>
      {/* search Customers... */}
      <div className='mt-3'>
        <input
          type='text'
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Customers...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/*Customers Data Show and update and delete operation file */}
      <CustomersTable />


      {/*Customers Create  modal */}
      
      {customersCreateModal && (
        <AddCustomers setCustomersCreateModal={setCustomersCreateModal} />
      )}
    </div>
  )
}

export default CustomersPage
