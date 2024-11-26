import MiniSpinner from '@/shared/MiniSpinner/MiniSpinner'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiImageAddFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '../ui/button'
import Select from 'react-select'

const AddProducts = () => {
  const [loading, setLoading] = useState(false)
  const [category_id, setCategory_id] = useState('')
  const [brand_id, setBrand_id] = useState('')

  const options = [
    { _id: 1, value: 'chocolate', label: 'Chocolate' },
    { _id: 2, value: 'strawberry', label: 'Strawberry' },
    { _id: 3, value: 'vanilla', label: 'Vanilla' },
  ]
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  //Image preview For Product....

  const fileInputRef = useRef(null)

  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setValue('product_image', file)
    }
  }

  const clearImagePreview = () => {
    setImagePreview(null)
    setValue('product_image', null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  //Image preview End  For Product....

  //Image preview For Product Barcode....
  const fileInputRefBarcode = useRef(null)
  const [imagePreviewBarcode, setImagePreviewBarcode] = useState(null)

  const handleImageChangeBarcode = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImagePreviewBarcode(URL.createObjectURL(file))
      setValue('product_barcode_image', file)
    }
  }

  const clearImagePreviewBarcode = () => {
    setImagePreviewBarcode(null)
    setValue('product_barcode_image', null)
    if (fileInputRefBarcode.current) {
      fileInputRefBarcode.current.value = ''
    }
  }
  //Image preview End  For Product....

  //Data post
  const handleDataPost = async (data) => {
    console.log(data)
  }
  return (
    <div>
      <div className='pl-6 max-h-[100vh]  mt-3'>
        <form onSubmit={handleSubmit(handleDataPost)} className=''>
          <div className='grid grid-cols-2 gap-5'>
            <div className='mt-2'>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Name <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_name', {
                  required: 'Product Name is required',
                })}
                type='text'
                placeholder='Product Name'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_name && (
                <p className='text-red-600'>{errors.product_name?.message}</p>
              )}
            </div>

            <div className='mt-2'>
              <label className='block text-xs font-medium text-gray-700'>
                Product Price <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_price', {
                  required: 'Product Price is required',
                  validate: (value) => {
                    if (value < 0) {
                      return 'Product Price be getter than 0'
                    }
                  },
                })}
                type='number'
                placeholder='Product Price'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_price && (
                <p className='text-red-600'>{errors.product_price?.message}</p>
              )}
            </div>
            <div className='mt-2'>
              <label className='block text-xs font-medium text-gray-700'>
                Product Buying Price <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_buying_price', {
                  required: 'Product Buying Price is required',
                  validate: (value) => {
                    if (value < 0) {
                      return 'Product Buying Price be getter than 0'
                    }
                  },
                })}
                type='number'
                placeholder='Product Buying Price'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_buying_price && (
                <p className='text-red-600'>
                  {errors.product_buying_price?.message}
                </p>
              )}
            </div>
            <div className='mt-2'>
              <label className='block text-xs font-medium text-gray-700'>
                Product Quantity <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_quantity', {
                  required: ' Product Quantity is required',
                  validate: (value) => {
                    if (value < 0) {
                      return ' Product Quantity be getter than 0'
                    }
                  },
                })}
                type='number'
                placeholder='Product Quantity'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_quantity && (
                <p className='text-red-600'>
                  {errors.product_quantity?.message}
                </p>
              )}
            </div>
            <div className='mt-2'>
              <label className='block text-xs font-medium text-gray-700'>
                Product Previous Quantity
              </label>

              <input
                {...register('product_previous_quantity', {
                  validate: (value) => {
                    if (value < 0) {
                      return 'Product Previous Quantity be getter than 0'
                    }
                  },
                })}
                type='number'
                placeholder='Product Previous Quantity'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
            </div>
            <div className='mt-2'>
              <label className='block text-xs font-medium text-gray-700'>
                Product Stock Low Alert
              </label>

              <input
                {...register('product_stock_low_alert', {
                  validate: (value) => {
                    if (value < 0) {
                      return '  Product Stock Low Alert be getter than 0'
                    }
                  },
                })}
                type='number'
                placeholder='Product Stock Low Alert'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
            </div>
            <div>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Id <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_id', {
                  required: 'Product Id is required',
                })}
                type='text'
                placeholder='Product Id'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_id && (
                <p className='text-red-600'>{errors.product_id?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Unit <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_unit')}
                type='text'
                placeholder='Product Unit'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1 mt-2'>
                Customer Name <span className='text-red-500'>*</span>
              </label>

              <Select
                id='category_id'
                name='category_id'
                aria-label='Category Name'
                required
                options={options}
                getOptionLabel={(x) => x?.label}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setCategory_id(selectedOption?._id)
                }}
              />
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1 mt-2'>
                Payment Bank Name
              </label>

              <Select
                id='brand_id'
                name='brand_id'
                aria-label='Brand Name'
                options={options}
                getOptionLabel={(x) => x?.label}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setBrand_id(selectedOption?._id)
                }}
              />
            </div>

            <div className=''>
              <label className='block text-xs font-medium text-gray-700'>
                Product Status
              </label>
              <select
                {...register('product_status')}
                className='mt-1 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
              >
                <option value='active'>Active</option>
                <option value='in-active'>In-Active</option>
              </select>
            </div>

            <div>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Barcode <span className='text-red-500'>*</span>
              </label>

              <input
                {...register('product_barcode', {
                  required: ' Product Barcode is required',
                })}
                type='text'
                placeholder='Product Barcode'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.product_barcode && (
                <p className='text-red-600'>
                  {errors.product_barcode?.message}
                </p>
              )}
            </div>
            <div className='mt-2'>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Details
              </label>

              <textarea
                {...register('product_details')}
                type='text'
                placeholder='Product Details'
                className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5'>
            {/* ------Image Of Product------- */}

            <div className='mt-6'>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Image
              </label>
              {imagePreview ? (
                <>
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
                </>
              ) : (
                <>
                  <label
                    className='mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                    htmlFor='product_image'
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
                {...register('product_image', {
                  required: 'Image is Required',
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith('image/')) ||
                      'Only image files are allowed',
                  },
                })}
                accept='image/*'
                type='file'
                id='product_image'
                ref={fileInputRef}
                className='mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                onChange={handleImageChange}
              />
              <p className='text-xs text-[#C9CACA]  text-end'>
                Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                MB).
              </p>
            </div>

            {/* ------Image Of Product Barcode------- */}

            <div className='mt-6'>
              <label
                htmlFor=''
                className='block text-xs font-medium text-gray-700'
              >
                Product Barcode Image
              </label>
              {imagePreviewBarcode ? (
                <>
                  <div className='relative'>
                    <button
                      type='button'
                      className='btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 '
                      onClick={clearImagePreviewBarcode}
                    >
                      <RxCross1 size={15}></RxCross1>
                    </button>
                    {/* Image Preview */}
                    <img
                      src={imagePreviewBarcode}
                      alt='Preview'
                      className='w-full h-64 object-cover my-2 rounded'
                    />
                  </div>
                </>
              ) : (
                <>
                  <label
                    className='mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                    htmlFor='product_barcode_image'
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
                {...register('product_barcode_image', {
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith('image/')) ||
                      'Only image files are allowed',
                  },
                })}
                accept='image/*'
                type='file'
                id='product_barcode_image'
                ref={fileInputRefBarcode}
                className='mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                onChange={handleImageChangeBarcode}
              />
              <p className='text-xs text-[#C9CACA]  text-end'>
                Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                MB).
              </p>
            </div>
          </div>

          <div className='flex justify-end mt-3'>
            {loading == true ? (
              <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                <MiniSpinner />
              </div>
            ) : (
              <Button type='submit' className='mb-4'>
                Create Product
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProducts
