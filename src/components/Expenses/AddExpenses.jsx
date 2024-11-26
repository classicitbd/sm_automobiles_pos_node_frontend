import MiniSpinner from '@/shared/MiniSpinner/MiniSpinner'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '../ui/button'
import { RiImageAddFill } from 'react-icons/ri'

const AddExpenses = ({ setExpensesCreateModal }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  //Image preview....
  const fileInputRef = useRef(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setPdfFile(file?.name)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setValue('expense_voucher', file)
    }
  }

  const clearImagePreview = () => {
    setImagePreview(null)
    setValue('expense_voucher', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  //Data post
  const handleDataPost = async (data) => {
    console.log(data)
  }
  return (
    <div>
      <div>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[22px] font-bold text-gray-800 capitalize'
                id='modal-title '
              >
                Add Expenses
              </h3>
              <button
                type='button'
                className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50'
                onClick={() => setExpensesCreateModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className='space-y-4'>
              <div>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Expense Title <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('expense_title', {
                    required: 'Expense Title is required',
                  })}
                  type='text'
                  placeholder='Expense Title'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.expense_title && (
                  <p className='text-red-600'>
                    {errors.expense_title?.message}
                  </p>
                )}
              </div>
              <div className=''>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Expense Description
                </label>

                <textarea
                  {...register('expense_description')}
                  type='text'
                  placeholder=' Expense Description'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className=''>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Expense Date
                </label>

                <input
                  {...register('expense_date')}
                  type='date'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Expense Amount
                </label>

                <input
                  {...register('expense_amount', {
                    validate: (value) => {
                      if (value < 0) {
                        return 'Amount must be getter than 0'
                      }
                    },
                  })}
                  type='number'
                  placeholder='Enter Expense Amount'
                  className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Bank Name
                </label>
                <select
                  {...register('expense_bank_id')}
                  className='mt-1 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                >
                  <option value='active'>Sonali</option>
                  <option value='in-active'>Rupali</option>
                </select>
              </div>

              {/* ------Image or Pdf------- */}

              <div className='mt-6'>
                {imagePreview ? (
                  <>
                    {pdfFile?.endsWith('.pdf') || pdfFile?.endsWith('.PDF') ? (
                      <div className='relative'>
                        <button
                          type='button'
                          className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 '
                          onClick={clearImagePreview}
                        >
                          <RxCross1 size={15}></RxCross1>
                        </button>
                        {/* Image Preview */}
                        <iframe
                          src={imagePreview}
                          width='100%'
                          height='300'
                          title='PDF Preview'
                        />
                      </div>
                    ) : (
                      <div className='relative'>
                        <button
                          type='button'
                          className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 '
                          onClick={clearImagePreview}
                        >
                          <RxCross1 size={15}></RxCross1>
                        </button>
                        {/* Image Preview */}
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='w-full h-64 object-cover my-2 rounded'
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <label
                      className='mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                      htmlFor='expense_voucher'
                    >
                      <div className='flex flex-col items-center justify-center'>
                        <div>
                          <RiImageAddFill size={25} />
                        </div>
                        <p className='mt-2 text-[#C9CACA]'>upload image</p>
                      </div>
                    </label>
                  </>
                )}
                <input
                  {...register('expense_voucher')}
                  type='file'
                  id='expense_voucher'
                  ref={fileInputRef}
                  className='mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                  onChange={handleImageChange}
                />
                <p className='text-xs text-[#C9CACA]  text-end'>
                  Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                  MB).
                </p>
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

export default AddExpenses
