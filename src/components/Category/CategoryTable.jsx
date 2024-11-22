
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import UpDateCategory from './UpDateCategory'


 const CategoryTable = (
 
) => {
  

  //Update Handle contoler
  const [categoryUpdateModal, setCategoryUpdateModal] = useState(false)
  const [categoryUpdateData, setCategoryUpdateData] = useState({})

  const handleCategoryUpdateModal = (category) => {
    setCategoryUpdateData(category)
    setCategoryUpdateModal(true)
  }

 
 

  return (
    <>
      <div>
        <div className='rounded-lg border border-gray-200 mt-6'>
          <div className='overflow-x-auto rounded-t-lg'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap p-4 '>SL No</td>
                  <td className='whitespace-nowrap p-4 '>Category Name</td>
                  <td className='whitespace-nowrap p-4 '>Category Status</td>

                  <td className='whitespace-nowrap p-4 '>Action</td>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 text-center'>
                <tr  className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    2
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                  Pos System
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                   Active
                  </td>

                  <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>
                   

                    <button
                      className='ml-3'
                      onClick={() => handleCategoryUpdateModal()}
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

        {/* Show Category Update Modal */}
        {categoryUpdateModal && (
          <UpDateCategory
            setCategoryUpdateModal={setCategoryUpdateModal}
            categoryUpdateData={categoryUpdateData}
            // refetch={refetch}
            // user={user}
          />
        )}
      </div>
    </>
  )
}

export default CategoryTable
