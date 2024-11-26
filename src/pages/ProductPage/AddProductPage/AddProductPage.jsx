import AddProducts from '@/components/Products/AddProducts'

const AddProductPage = () => {
  return (
    <div className=''>
      <div className='mt-6'>
        <h1 className='text-2xl p-6 '> Add Product </h1>
        <hr className='mt-2 mb-6 mx-4' />
      </div>
      <div className='mt-2 pl-6'>
        <AddProducts />
      </div>
    </div>
  )
}
export default AddProductPage
