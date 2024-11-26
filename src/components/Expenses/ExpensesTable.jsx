import { IoMdEye } from 'react-icons/io'
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import ExpenseDocumentModalShow from './ExpenseDocumentModalShow'
import UpdateExpenses from './UpdateExpenses'

const ExpensesTable = () => {
  const [openExpenseModal, setOpenExpenseModal] = useState(false)
  const [getExpenseModalData, setGetExpenseModalData] = useState({})
  const [openDocumentModal, setOpenDocumentModal] = useState(false)
  const [getDocumentData, setGetDocumentData] = useState({})

  //Update handle Function
  const handleExpensesUpdateModal = (expense) => {
    setOpenExpenseModal(true)
    setGetExpenseModalData(expense)
  }

  //Document Show Function
  const handleShowDocumentModal = (expense) => {
    setOpenDocumentModal(true)
    setGetDocumentData(expense)
  }

  return (
    <div>
      <div className='rounded-lg border border-gray-200 mt-6'>
        <div className='overflow-x-auto rounded-t-lg'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
              <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  SL No
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expenses Title
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expense Voucher
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expense Description
                </th>

                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expenses Amount
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expenses Bank Name
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Expenses Date
                </th>

                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200 text-center'>
              <tr className='divide-x divide-gray-200 '>
                <td className='whitespace-nowrap px-4  py-1.5 font-medium text-gray-900'>
                  1
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 font-medium text-gray-900'>
                  Cost for Ring
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700 flex justify-center'>
                  <button
                    className='ml-[8px]'
                    onClick={() => handleShowDocumentModal()}
                  >
                    <IoMdEye
                      size={25}
                      className='cursor-pointer text-gray-500 hover:text-gray-300'
                    />
                  </button>
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700 max-w-xs overflow-y-auto scrollbar-thin text-wrap'>
                  <p className='h-8 text-justify'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Est eum accusantium id sit quisquam suscipit fugit molestias
                    quo eveniet totam, odio nisi voluptatem labore optio! Eaque
                    accusamus autem hic culpa.
                  </p>
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700 max-w-xs overflow-y-auto scrollbar-thin text-wrap'>
                  2000
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                  Sonali
                </td>
                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                  23-4-43
                </td>

                <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                  <button
                    className='ml-[8px]'
                    onClick={() => handleExpensesUpdateModal()}
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

      {/* pagination */}

      {/* {totalData > 10 && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalData={totalData}
        />
      )} */}

      {/* Show Expense Update Modal */}
      {openExpenseModal && (
        <UpdateExpenses
          setOpenExpenseModal={setOpenExpenseModal}
          getExpenseModalData={getExpenseModalData}
          //refetch={refetch}
          //user={user}
        />
      )}
      {/* Show Expense Document Modal */}
      {openDocumentModal && (
        <ExpenseDocumentModalShow
          setOpenDocumentModal={setOpenDocumentModal}
          getDocumentData={getDocumentData}
        />
      )}
    </div>
  )
}

export default ExpensesTable
