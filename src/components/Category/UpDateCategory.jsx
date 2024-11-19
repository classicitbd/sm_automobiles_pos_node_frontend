import { RxCross1 } from 'react-icons/rx'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { Button } from '../ui/button'

const UpDateCategory = ({ setCategoryUpdateModal }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  // Handle Update Category
  const handleDataPost = async (data) => {
    console.log(data)
  }

  return (
    <div>
      <div>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title'
              >
                Update Category
              </h3>
              <button
                type='button'
                className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 '
                onClick={() => setCategoryUpdateModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor='UserEmail'
                  className='block text-xs font-medium text-gray-700'
                >
                  Category Name
                </label>

                <input
                  {...register('category_name')}
                  type='text'
                  //defaultValue={categoryUpdateData?.category_name}
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>

              <div className='flex gap-8 mt-6 justify-end'>
                {loading ? (
                  <div className='px-10 py-2  bg-primary text-white rounded flex justify-center items-center'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button
                    
                    type='Submit'
                  >
                    Update
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpDateCategory
