import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import UpdateBankInfo from './UpdateBankInfo'



const BankInfoTable = () => {

  //Update Handle contoler
  const [bankAccountUpdateModal, setBankAccountUpdateModal] = useState(false)
  const [bankAccountUpdateData, setBankAccountUpdateData] = useState({})

  const handleBankUpdateModal = () => {
    setBankAccountUpdateData()
    setBankAccountUpdateModal(true)
  }

 
  return (
    <div>
      <div className='rounded-lg border border-gray-200 mt-6'>
        <div className='overflow-x-auto rounded-t-lg'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
              <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                <td className='whitespace-nowrap p-4 '>SL No</td>
                <td className='whitespace-nowrap p-4 '>Account Name</td>
                <td className='whitespace-nowrap p-4 '>Account No</td>
                <td className='whitespace-nowrap p-4 '>Bank Name</td>
                <td className='whitespace-nowrap p-4 '>Bank Balance</td>
                <td className='whitespace-nowrap p-4 '>Bank Status</td>

                <td className='whitespace-nowrap p-4 '>Action</td>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200 text-center'>
              <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                  2
                </td>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                 Istiak
                </td>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                 24568
                </td>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                 Sonali
                </td>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                 2000
                </td>
                <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                 Active
                </td>

                <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>
                 

                  <button
                    className='ml-3'
                    onClick={() => handleBankUpdateModal()}
                  >
                    <FiEdit
                      size={25}
                      className='cursor-pointer text-gray-500 hover:text-gray-300'
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Show Bank Update Modal */}
      {bankAccountUpdateModal && (
        <UpdateBankInfo
          setBankAccountUpdateModal={setBankAccountUpdateModal}
          bankAccountUpdateData={bankAccountUpdateData}
        />
      )}
    </div>
  )
}

export default BankInfoTable
