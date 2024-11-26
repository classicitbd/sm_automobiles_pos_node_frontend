import { FiEdit } from "react-icons/fi"
import PurchaseDocumentModalShow from "./PurchaseDocumentModalShow"
import UpdatePurchase from "./UpdatePurchase"
import { IoMdEye } from "react-icons/io"
import { useState } from "react"

const PurchaseTable = () => {
   const [OpenPurchaseModal, setOpenPurchaseModal] = useState(false)
   const [getPurchaseModalData, setGetPurchaseModalData] = useState({})
   const [openDocumentModal, setOpenDocumentModal] = useState(false)
   const [getDocumentData, setGetDocumentData] = useState({})

   //Update handle Function
   const handlePurchaseUpdateModal = () => {
     setOpenPurchaseModal(true)
     setGetPurchaseModalData()
   }

   //Document Show Function
   const handleShowDocumentModal = () => {
     setOpenDocumentModal(true)
     setGetDocumentData()
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
                  Purchase Title
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Purchase Voucher
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Purchase Description
                </th>

                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Purchase Amount
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Purchase Bank Name
                </th>
                <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                  Purchase Date
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
                  Cost for Purchase
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
                    onClick={() => handlePurchaseUpdateModal()}
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

      {/* Show Purchase Update Modal */}
      {OpenPurchaseModal && (
        <UpdatePurchase
          setOpenPurchaseModal={setOpenPurchaseModal}
          getPurchaseModalData={getPurchaseModalData}
          //refetch={refetch}
          //user={user}
        />
      )}
      {/* Show Purchase Document Modal */}
      {openDocumentModal && (
        <PurchaseDocumentModalShow
          setOpenDocumentModal={setOpenDocumentModal}
          getDocumentData={getDocumentData}
        />
      )}
    </div>
  )
}

export default PurchaseTable
