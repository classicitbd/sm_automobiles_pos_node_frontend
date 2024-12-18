import Pagination from "../common/pagination/Pagination"


const StockAlert = () => {
  return (
    <>

      <div>
        <h2>Stock Alert</h2>
        <div className='rounded-lg  mt-6 overflow-x-auto'>
          <div className='rounded-t-lg scrollbar-thin'>
            <table className='min-w-full  divide-y divide-gray-200 text-sm'>
              <thead className='ltr:text-left rtl:text-right '>
                <tr className='divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap p-4 '>SL</td>
                  <td className='whitespace-nowrap p-4 '>Code</td>
                  <td className='whitespace-nowrap p-4 '>PRODUCT</td>
                  <td className='whitespace-nowrap p-4 '>WAREHOUSE</td>
                  <td className='whitespace-nowrap p-4 '>QUANTITY</td>

                  <td className='whitespace-nowrap p-4 '>ALERT QUANTITY</td>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 text-center'>

                <tr

                  className=' '
                >
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    1
                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    87305928
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    Oil
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    Warehouse 02
                  </td>
                  <td className='whitespace-nowrap py-2.5 px-2 text-gray-400'>
                    05
                  </td>
                  <td className='whitespace-nowrap py-2.5 px-2 text-red-600'>
                    10
                  </td>
                </tr>
                <tr

                  className=' divide-gray-200'
                >
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    2
                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    87305928
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    Oil
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    Warehouse 02
                  </td>
                  <td className='whitespace-nowrap py-2.5 px-2 text-gray-400'>
                    05
                  </td>
                  <td className='whitespace-nowrap py-2.5 px-2 text-red-600'>
                    10
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* pagination */}

        <Pagination

        />

      </div>

    </>
  )
}

export default StockAlert