import ProductTable from '@/components/Products/ProductTable'
import { Button } from '@/components/ui/button'

import { Link } from 'react-router-dom'

const ProductPage = () => {
  //Add Supplier modal open state

  return (
    <div className='bg-white rounded py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>All Product List </h1>
        </div>
        <div>
          <Link to='/add-product'>
            <Button>Add Product</Button>
          </Link>
        </div>
      </div>
      <div className='mt-3'>
        <input
          type='text'
          //defaultValue={searchTerm}
          //onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Supplier...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* show Product Table List Component*/}
      <ProductTable />
    </div>
  )
}

export default ProductPage
