// import { toast } from "react-toastify";

import { useState } from 'react'



import UpdateSupplier from './UpdateSupplier'
import { FiEdit } from 'react-icons/fi'
const SupplierTable = () => {
  const [updateModal, setUpdateModal] = useState(false)
  const [updateModalValue, setUpdateModalValue] = useState(false)
  //   console.log(supplierData);
  const updateStaffModal = (item) => {
    setUpdateModal(true)
    setUpdateModalValue(item)
  }

 

  return (
    <div>
      {/* Table for showing data */}

      <div className='mt-5 overflow-x-auto rounded'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded'>
          {' '}
          <thead className=' bg-[#fff9ee] '>
            <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                SL
              </th>
              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                Supplier Name
              </th>

              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                Supplier Email
              </th>
              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                Supplier Phone
              </th>
              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                Address
              </th>
              <th className='whitespace-nowrap px-4 py-2.5   text-gray-800 '>
                Status
              </th>
              <th className='px-4 py-2.5 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 text-center '>
            <tr className='divide-x divide-gray-200 $'>
              <td className='whitespace-nowrap px-4 py-1.5 font-medium text-gray-900'>
                1
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-semibold'>
                Ashik
              </td>

              <td className='whitespace-nowrap px-4 py-2 font-semibold '>
                dfdfv@1242
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-semibold capitalize'>
                01-8766657
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-semibold capitalize'>
                Dhankhola
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-semibold capitalize'>
                Active
              </td>
              <td className='whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4'>
               
                <FiEdit
                  onClick={() => updateStaffModal()}
                  className='cursor-pointer text-gray-500 hover:text-gray-300'
                  size={25}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Update Sub Category */}
      {updateModal && (
        <UpdateSupplier
          setUpdateModal={setUpdateModal}
          updateModalValue={updateModalValue}
        />
      )}
    </div>
  )
}

export default SupplierTable
