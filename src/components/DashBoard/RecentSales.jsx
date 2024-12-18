import { Link } from "react-router-dom"
import Pagination from "../common/pagination/Pagination"


const RecentSales = () => {
  return (
    <>

      <div>
        <h2>Recent Sales</h2>
        <div className='rounded-lg  mt-6'>
          <div className='overflow-x-auto rounded-t-lg scrollbar-thin'>
            <table className='min-w-full divide-y divide-gray-200  text-sm'>
              <thead className='ltr:text-left rtl:text-right '>
                <tr className='divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap p-4 '>SL</td>
                  <td className='whitespace-nowrap p-4 '>REFERENCE</td>
                  <td className='whitespace-nowrap p-4 '>CUSTOMER</td>
                  <td className='whitespace-nowrap p-4 '>STATUS</td>
                  <td className='whitespace-nowrap p-4 '>GRAND TOTAL</td>
                  <td className='whitespace-nowrap p-4 '>PAID</td>
                  <td className='whitespace-nowrap p-4 '>DUE</td>
                  <td className='whitespace-nowrap p-4 '>PAYMENT STATUS</td>


                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 text-center'>

                <tr

                  className=' divide-gray-200'
                >
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    1
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    <Link to=''>
                      <span className="text-blue-600 underline font-bold">87305915</span>
                    </Link>

                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    Saiful Vai
                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    <button className="bg-green-50  text-green-600 px-4 py-1 font-medium rounded">
                      Completed
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>

                  <td className='whitespace-nowrap py-2.5 px-2 text-gray-400'>
                    <button className="border-green-600 border-2 text-green-600 px-4 py-1 font-medium rounded">
                      Paid
                    </button>
                    {/* <button className="border-red-600 border-2 text-red-600 px-4 py-1 font-medium rounded">
                      Due
                    </button> */}
                  </td>

                </tr>
                <tr

                  className=' divide-gray-200'
                >
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    1
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    <Link to=''>
                      <span className="text-blue-600 underline font-bold">87305915</span>
                    </Link>

                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    Saiful Vai
                  </td>
                  <td className='whitespace-nowrap py-2.5 font-medium text-gray-400'>
                    <button className="bg-red-50  text-red-600 px-4 py-1 font-medium rounded">
                      Completed
                    </button>
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-400">
                    $1200.00
                  </td>

                  <td className='whitespace-nowrap py-2.5 px-2 text-gray-400'>
                    {/* <button className="border-green-600 border-2 text-green-600 px-4 py-1 font-medium rounded">
                      Paid
                    </button> */}
                    <button className="border-red-600 border-2 text-red-600 px-4 py-1 font-medium rounded">
                      Due
                    </button>
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

export default RecentSales