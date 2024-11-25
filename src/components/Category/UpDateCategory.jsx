import { RxCross1 } from 'react-icons/rx'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { Button } from '../ui/button'
import { BASE_URL } from '@/utils/baseURL'
import { toast } from 'react-toastify'

const UpDateCategory = ({
  setCategoryUpdateModal,
  categoryUpdateData,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  // Handle Update Category
  const handleDataPost = async (data) => {
    setLoading(true)
    try {
      const sendData = {
        _id: categoryUpdateData?._id,
        category_updated_by: user?._id,
        category_name: data?.category_name
          ? data?.category_name
          : categoryUpdateData?.category_name,
        category_status: data?.category_status
          ? data?.category_status
          : categoryUpdateData?.category_status,
      }

      const response = await fetch(`${BASE_URL}/category`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      })
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'category Update successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setCategoryUpdateModal(false)
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      })
      setLoading(false)
    } finally {
      setLoading(false)
    }
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
                  defaultValue={categoryUpdateData?.category_name}
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Category Status
                </label>
                <select
                  {...register('category_status')}
                  defaultValue={categoryUpdateData?.category_status}
                  className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                >
                  <option value='active'>Active</option>
                  <option value='in-active'>In-Active</option>
                </select>
              </div>

              <div className='flex gap-8 mt-6 justify-end'>
                {loading ? (
                  <div className='px-10 py-2  bg-primary text-white rounded flex justify-center items-center'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button type='Submit'>Update</Button>
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
