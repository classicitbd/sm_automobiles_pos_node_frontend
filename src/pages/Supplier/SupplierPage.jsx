import { useState } from 'react'
import AddSupplier from '../../components/Supplier/AddSupplier'

import SupplierTable from '../../components/Supplier/SupplierTable'
import { Button } from '@/components/ui/button'

const SupplierPage = () => {
  //Add staff modal open state
  const [openAddModal, setOpenAddModal] = useState(false)

  return (
    <div className='bg-white rounded py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>All Supplier List </h1>
        </div>
        <div>
          <div>
            <Button onClick={() => setOpenAddModal(true)}>Add Supplier</Button>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <input
          type='text'
          //defaultValue={searchTerm}
          //onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Supplier...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* show All Supplier Table List Component*/}
      <SupplierTable />

      {/* add all ReSeller modal component */}
      {openAddModal && <AddSupplier setOpenAddModal={setOpenAddModal} />}
    </div>
  )
}

export default SupplierPage
