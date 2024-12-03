import { useForm } from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react'

import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import { BASE_URL } from '@/utils/baseURL'
const UpdateSupplier = ({ setUpdateModal, updateModalValue, refetch, user }) => {
  const [loading, setLoading] = useState(false)

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleDataPost = async (data) => {
    setLoading(true)
    try {
      const sendData = {
        _id: updateModalValue?._id,
        supplier_updated_by: user?._id,
        supplier_name: data?.supplier_name,
        supplier_phone: data?.supplier_phone,
        supplier_address: data?.supplier_address,
        supplier_status: data?.supplier_status,
      }

      const response = await fetch(
        `${BASE_URL}/supplier?role_type=supplier_update`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'supplier update successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setUpdateModal(false)
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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <h3
            className='text-[26px] font-bold text-gray-800 capitalize'
            id='modal-title'
          >
            Update Supplier
          </h3>
          <button
            type='button'
            className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50'
            onClick={() => setUpdateModal(false)}
          >
            {' '}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className='mt-2 mb-4' />

        <form onSubmit={handleSubmit(handleDataPost)} className=''>
          <div>
            <label
              htmlFor='supplier_name'
              className='block text-xs font-medium text-gray-700'
            >
              Supplier Name
            </label>

            <input
              {...register('supplier_name', {
                required: 'Supplier name is required',
              })}
              type='text'
              defaultValue={updateModalValue?.supplier_name}
              placeholder='Enter Supplier name'
              id='supplier_name'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
            {errors.supplier_name && (
              <p className='text-red-600 text-sm'>
                {errors.supplier_name?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='supplier_phone'
              className='block text-xs font-medium text-gray-700 mt-2'
            >
              Supplier Phone
            </label>

            <input
              {...register('supplier_phone', {
                validate: {
                  isPhone: (value) =>
                    !value ||
                    (value.length >= 7 && value.length <= 14) ||
                    'Invalid phone number',
                },
              })}
              type='text'
              id='supplier_phone'
              defaultValue={updateModalValue?.supplier_phone}
              placeholder='Enter Supplier phone'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
            {errors.supplier_phone && (
              <p className='text-red-600 text-sm'>
                {errors.supplier_phone?.message}
              </p>
            )}
          </div>

          <div className='mt-4 flex-1'>
            <label
              htmlFor='supplier_address'
              className='block text-sm font-medium text-gray-700 mt-2'
            >
              Supplier Address
            </label>
            <textarea
              rows='5'
              {...register('supplier_address')}
              id='supplier_address'
              defaultValue={updateModalValue?.supplier_address}
              placeholder='Enter user password'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
          </div>
          <div className='mt-4 flex-1'>
            <label
              htmlFor='supplier_status'
              className='block text-xs font-medium text-gray-700'
            >
              Status <span className='text-red-500'>*</span>
            </label>
            <select
              {...register('supplier_status', {
                required: ' Status is required',
              })}
              id='supplier_status'
              defaultValue={updateModalValue?.supplier_status}
              className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
            >
              <option value='active'>Active</option>
              <option value='in-active'>In-Active</option>
            </select>
            {errors.supplier_status && (
              <p className='text-red-600 text-sm'>
                {errors.supplier_status.message}
              </p>
            )}
          </div>

          <div className='flex gap-6 mt-6 justify-end'>
            <Button
              variant='outline'
              onClick={() => setUpdateModal(false)}
              type='button'
            >
              Cancel
            </Button>
            {loading ? (
              <div className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm rounded'>
                Loading...
                <MiniSpinner />
              </div>
            ) : (
              <Button type='submit'>Update User</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateSupplier
