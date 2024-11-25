import MiniSpinner from '@/shared/MiniSpinner/MiniSpinner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '../ui/button'
import { BASE_URL } from '@/utils/baseURL'
import { toast } from 'react-toastify'

const AddCustomers = ({ setCustomersCreateModal , refetch,
  user}) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // get token
  // const token = getCookie(authKey);
  

  const handleDataPost = async (data) => {
   setLoading(true)
    try {
      const sendData = {
        customer_publisher_id: user?._id,
        customer_name: data?.customer_name,
        customer_phone: data?.customer_phone,
        customer_email: data?.customer_email,
        customer_address: data?.customer_address,
        previous_due: data?.previous_due,
        previous_advance: data?.previous_advance,
       
      }

      const response = await fetch(
        `${BASE_URL}/customer?role_type=customer_create`,
        {
          method: 'POST',
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
          result?.message ? result?.message : 'Customer created successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setCustomersCreateModal(false)
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
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title '
              >
                Add Customers Info
              </h3>
              <button
                type='button'
                className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50'
                onClick={() => setCustomersCreateModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Customers Name <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('customer_name', {
                    required: 'Customer name is required',
                  })}
                  type='text'
                  placeholder='Customers Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.customer_name && (
                  <p className='text-red-600'>
                    {errors.customer_name?.message}
                  </p>
                )}
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Customer Address
                </label>

                <input
                  {...register('customer_address')}
                  type='text'
                  placeholder='Customer Address'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Customer Email
                </label>

                <input
                  {...register('customer_email')}
                  type='email'
                  placeholder='Customer Email'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Customer Phone
                </label>

                <input
                  {...register('customer_phone')}
                  type='number'
                  placeholder='Customer Phone'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Previous Advance
                </label>

                <input
                  {...register('previous_advance', {
                    validate: (value) => {
                      if (value < 0) {
                        return 'Advance must be getter than 0'
                      }
                    },
                  })}
                  type='number'
                  placeholder='Enter  Previous Advance'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Previous Due
                </label>

                <input
                  {...register('previous_due', {
                    validate: (value) => {
                      if (value < 0) {
                        return 'Due must be getter than 0'
                      }
                    },
                  })}
                  type='number'
                  placeholder='Enter  Previous Due'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>

              <div className='flex justify-end mt-3'>
                {loading == true ? (
                  <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button type='submit'>Create</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomers
