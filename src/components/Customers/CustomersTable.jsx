import { FiEdit } from 'react-icons/fi'
import UpdateCustomers from './UpdateCustomers'
import { useState } from 'react'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'
import NoDataFound from '@/shared/NoDataFound/NoDataFound'
import Pagination from '../common/pagination/Pagination'

const CustomersTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  customers,
}) => {
  //Update Handle contoler
  const [customerUpdateModal, setCustomerUpdateModal] = useState(false)
  const [customerUpdateData, setCustomerUpdateData] = useState({})

  const handleCustomerUpdateModal = () => {
    setCustomerUpdateData()
    setCustomerUpdateModal(true)
  }
  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className='rounded-lg border border-gray-200 mt-6'>
            {customers?.data?.length > 0 ? (
              <div className='overflow-x-auto rounded-t-lg'>
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                  <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                    <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                      <td className='whitespace-nowrap p-4 '>SL No</td>
                      <td className='whitespace-nowrap p-4 '>Customers Name</td>
                      <td className='whitespace-nowrap p-4 '>
                        Customer Address
                      </td>
                      <td className='whitespace-nowrap p-4 '>Customer Email</td>
                      <td className='whitespace-nowrap p-4 '>Customer Phone</td>
                      <td className='whitespace-nowrap p-4 '>
                        Previous Advance
                      </td>
                      <td className='whitespace-nowrap p-4 '>Previous Due</td>
                      <td className='whitespace-nowrap p-4 '>
                        Customer Status
                      </td>
                      <td className='whitespace-nowrap p-4 '>
                        First Payment Status
                      </td>

                      <td className='whitespace-nowrap p-4 '>Action</td>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 text-center'>
                    <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        2
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        Istiak Ahamed
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        Gangni
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        istik@123.com
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        097664565
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        ad-64546
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        d-1235
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        Active
                      </td>
                      <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                        In-Active
                      </td>

                      <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>
                        <button
                          className='ml-3'
                          onClick={() => handleCustomerUpdateModal()}
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
            ) : (
              <NoDataFound />
            )}
          </div>
          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />
          {/* Show Bank Update Modal */}
          {customerUpdateModal && (
            <UpdateCustomers
              setCustomerUpdateModal={setCustomerUpdateModal}
              customerUpdateData={customerUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  )
}

export default CustomersTable
