import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import MiniSpinner from '@/shared/MiniSpinner/MiniSpinner'
import Select from 'react-select'

const AddSupplierPayment = () => {
  const options = [
    { _id: 1, value: 'chocolate', label: 'Chocolate' },
    { _id: 2, value: 'strawberry', label: 'Strawberry' },
    { _id: 3, value: 'vanilla', label: 'Vanilla' },
  ]

  const [loading, setLoading] = useState(false)
  const [supplier_id, setSupplier_id] = useState('')
  const [payment_bank_id, setPayment_bank_id] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // get token
  // const token = getCookie(authKey);

  const handleDataPost = async (data) => {
    console.log(data, supplier_id, payment_bank_id)

    //setLoading(true)
    // try {
    //   const sendData = {
    //     supplier_payment_publisher_id: user?._id,
    //     transaction_id: data?.transaction_id,

    //   }

    //   const response = await fetch(
    //     `${BASE_URL}/supplier_payment?role_type=supplier_payment_create`,
    //     {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(sendData),
    //     }
    //   )
    //   const result = await response.json()
    //   if (result?.statusCode === 200 && result?.success === true) {
    //     toast.success(
    //       result?.message ? result?.message : 'Supplier Payment created successfully',
    //       {
    //         autoClose: 1000,
    //       }
    //     )
    //     refetch()
    //     setLoading(false)
    //     setSupplierPaymentCreateModal(false)
    //   } else {
    //     toast.error(result?.message || 'Something went wrong', {
    //       autoClose: 1000,
    //     })
    //     setLoading(false)
    //   }
    // } catch (error) {
    //   toast.error(error?.message, {
    //     autoClose: 1000,
    //   })
    //   setLoading(false)
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <div>
      <div>
        <div className=''>
          <div className=''>
            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Supplier Payment Title <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('supplier_payment_title', {
                    required: ' Payment Title is required',
                  })}
                  type='text'
                  placeholder='Supplier Payment Title'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.supplier_payment_title && (
                  <p className='text-red-600'>
                    {errors.supplier_payment_title.message}
                  </p>
                )}
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Supplier Payment Description
                </label>

                <textarea
                  {...register('supplier_payment_description')}
                  type='text'
                  placeholder='Supplier Payment Description'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Supplier Payment Date
                </label>

                <input
                  {...register('supplier_payment_date')}
                  type='date'
                  placeholder='Supplier Payment Date'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>

              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Supplier Payment amount
                  <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('supplier_payment_amount', {
                    required: ' Payment amount is required',
                    validate: (value) => {
                      if (value < 0) {
                        return 'Amount must be getter than 0'
                      }
                    },
                  })}
                  type='number'
                  placeholder='Enter Payment amount'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.supplier_payment_amount && (
                  <p className='text-red-600'>
                    {errors.supplier_payment_amount.message}
                  </p>
                )}
              </div>
              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Transaction id No
                </label>

                <input
                  {...register('transaction_id')}
                  type='text'
                  placeholder='Transaction id No'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-3'>
                <label className='block text-xs font-medium text-gray-700 mb-1 mt-2'>
                  Supplier Name <span className='text-red-500'>*</span>
                </label>

                <Select
                  id='supplier_id'
                  name='supplier_id'
                  aria-label='Supplier Name'
                  required
                  options={options}
                  getOptionLabel={(x) => x?.label}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setSupplier_id(selectedOption?._id)
                  }}
                />
              </div>
              <div className='mt-3'>
                <label className='block text-xs font-medium text-gray-700 mb-1 mt-2'>
                  Payment Bank Name
                </label>

                <Select
                  id='payment_bank_id'
                  name='payment_bank_id'
                  aria-label='Payment Bank Name'
                  options={options}
                  getOptionLabel={(x) => x?.label}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setPayment_bank_id(selectedOption?._id)
                  }}
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

export default AddSupplierPayment
