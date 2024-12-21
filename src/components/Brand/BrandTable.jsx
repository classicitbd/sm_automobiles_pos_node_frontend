import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import UpdateBrand from './UpdateBrand'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'
import NoDataFound from '@/shared/NoDataFound/NoDataFound'
import Pagination from '../common/pagination/Pagination'

const BrandTable = ({
  brandTypes,
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
}) => {
  const [brandUpdateModal, setBrandUpdateModal] = useState(false)
  const [brandUpdateData, setBrandUpdateData] = useState({})

  //handle Update Function..

  const handleBrandUpdateModal = (category) => {
    setBrandUpdateData(category)
    setBrandUpdateModal(true)
  }

  const [serialNumber, setSerialNumber] = useState()
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit
    setSerialNumber(newSerialNumber)
  }, [page, limit])

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {brandTypes?.data?.length > 0 ? (
            <div className='rounded-lg border border-gray-200 mt-6'>
              <div className='overflow-x-auto rounded-t-lg'>
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                  <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                    <tr className='divide-x divide-gray-300  font-semibold text-center '>
                      <td className='whitespace-nowrap p-4 '>SL No</td>
                      <td className='whitespace-nowrap p-4 '>Brand Name</td>
                      <td className='whitespace-nowrap p-4 '>Created By</td>
                      <td className='whitespace-nowrap p-4 '>Updated By</td>

                      <td className='whitespace-nowrap p-4 '>Action</td>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 text-center'>
                    {brandTypes?.data?.map((brand, i) => (
                      <tr
                        key={brand?._id}
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-tableRowBGColor'
                          }`}
                      >
                        <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                          {serialNumber + i + 1}
                        </td>
                        <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                          {brand?.brand_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {brand?.brand_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {brand?.brand_updated_by?.user_name ? brand?.brand_updated_by?.user_name : '--'}
                        </td>
                        <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>

                          <button
                            className='ml-3'
                            onClick={() => handleBrandUpdateModal(brand)}
                          >
                            <FiEdit
                              size={25}
                              className='cursor-pointer text-gray-500 hover:text-gray-300'
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NoDataFound />
          )}

          {/* pagination */}

          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />

          {/* Show Brand Update Modal */}
          {brandUpdateModal && (
            <UpdateBrand
              setBrandUpdateModal={setBrandUpdateModal}
              brandUpdateData={brandUpdateData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  )
}

export default BrandTable
