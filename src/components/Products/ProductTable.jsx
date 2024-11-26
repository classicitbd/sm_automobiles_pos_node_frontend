import { FiEdit } from 'react-icons/fi'
import Pagination from '../common/pagination/Pagination'
import { Link } from 'react-router-dom'

const ProductTable = () => {
  return (
    <>
      {/* {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : ( */}
      <div>
        <div className='rounded-lg border border-gray-200 mt-6'>
          {/* {customersPayment?.data?.length > 0 ? ( */}
          <div className='overflow-x-auto rounded-t-lg'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap p-4 '>SL No</td>
                  <td className='whitespace-nowrap p-4 '>Product Name</td>
                  <td className='whitespace-nowrap p-4 '>Product Image</td>
                  <td className='whitespace-nowrap p-4 '>Product Price</td>
                  <td className='whitespace-nowrap p-4 '>Product Quantity</td>
                  <td className='whitespace-nowrap p-4 '>Product Details</td>
                  <td className='whitespace-nowrap p-4 '>Product Unit</td>
                  <td className='whitespace-nowrap p-4 '>Product Status</td>

                  <td className='whitespace-nowrap p-4 '>Action</td>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 text-center'>
                <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    2
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    Product name..
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center'>
                    <img
                      className='w-[44px] h-[44px] rounded-[8px]'
                      src=''
                      alt=''
                    />
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    $ 2345
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    23
                  </td>
                  <td className='whitespace-nowrap px-4  py-1.5 text-gray-700 max-w-xs overflow-y-auto scrollbar-thin text-wrap'>
                    <p className='h-8 text-justify'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Est eum accusantium id sit quisquam suscipit fugit
                      molestias quo eveniet totam, odio nisi voluptatem labore
                      optio! Eaque accusamus autem hic culpa.
                    </p>
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    Product Unit...
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    In-Active
                  </td>

                  <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>
                    <Link to='/product/product-update'>
                      {/* {`/product/product-update/${}`} */}
                      <button className='ml-3'>
                        <FiEdit
                          size={25}
                          className='cursor-pointer text-gray-500 hover:text-gray-300'
                        />
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ) : (
              <NoDataFound />
            )} */}
        </div>
        <Pagination
        // setPage={setPage}
        // setLimit={setLimit}
        // totalData={totalData}
        // page={page}
        // limit={limit}
        />
      </div>
      {/* )} */}
    </>
  )
}

export default ProductTable
