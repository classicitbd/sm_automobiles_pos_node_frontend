import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import UpdateBankInfo from './UpdateBankInfo'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'
import NoDataFound from '@/shared/NoDataFound/NoDataFound'
import Pagination from '../common/pagination/Pagination'

const BankInfoTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  banks,
}) => {
  //Update Handle contoler
  const [bankAccountUpdateModal, setBankAccountUpdateModal] = useState(false)
  const [bankAccountUpdateData, setBankAccountUpdateData] = useState({})

  const handleBankUpdateModal = (bank) => {
    setBankAccountUpdateData(bank)
    setBankAccountUpdateModal(true)
  }

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className='rounded-lg border border-gray-200 mt-6'>
            {banks?.data?.length > 0 ? (
              <div className='overflow-x-auto rounded-t-lg'>
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                  <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                    <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                      <td className='whitespace-nowrap p-4 '>SL No</td>
                      <td className='whitespace-nowrap p-4 '>Bank Name</td>
                      <td className='whitespace-nowrap p-4 '>Account Name</td>
                      <td className='whitespace-nowrap p-4 '>Account No</td>
                      <td className='whitespace-nowrap p-4 '>Bank Balance</td>
                      <td className='whitespace-nowrap p-4 '>Bank Status</td>
                      <td className='whitespace-nowrap p-4 '>Created By</td>
                      <td className='whitespace-nowrap p-4 '>Updated By</td>
                      <td className='whitespace-nowrap p-4 '>Action</td>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 text-center'>
                  {banks?.data?.map((bank, i) => (
                  <tr
                    key={bank?._id}
                    className={`divide-x divide-gray-200 ${
                      i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {serialNumber + i + 1}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {bank?.bank_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {bank?.account_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {bank?.account_no}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {bank?.bank_balance}
                    </td>
                    <td className="whitespace-nowrap py-1.5 ">
                      {bank?.bank_status === "active" ? (
                        <p className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]">
                          <span>Active</span>
                        </p>
                      ) : (
                        <p className="bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]">
                          <span>In-Active</span>
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {bank?.bank_publisher_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {bank?.bank_updated_by?.user_name}
                    </td>
                    <td className="whitespace-nowrap py-1.5 px-2 text-gray-700">
                      <button
                        className="ml-3"
                        onClick={() => handleBankUpdateModal(bank)}
                      >
                        <FiEdit
                          size={25}
                          className="cursor-pointer text-gray-500 hover:text-gray-300"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
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
          {bankAccountUpdateModal && (
            <UpdateBankInfo
              setBankAccountUpdateModal={setBankAccountUpdateModal}
              bankAccountUpdateData={bankAccountUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  )
}

export default BankInfoTable
