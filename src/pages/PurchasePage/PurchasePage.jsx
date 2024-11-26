import AddPurchase from '@/components/Purchase/AddPurchase'
import PurchaseTable from '@/components/Purchase/PurchaseTable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const PurchasePage = () => {
  const [purchaseCreateModal, setPurchaseCreateModal] = useState(false)
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Purchase</h1>
        </div>

        <div>
          <Button type='button' onClick={() => setPurchaseCreateModal(true)}>
            Create Purchase
          </Button>
        </div>
      </div>
      {/* search Purchase.. */}
      <div className='mt-3'>
        <input
          type='text'
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Customers...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* Purchase Data Show and update and delete operation file */}
      <PurchaseTable />

      {/* Purchase Create  modal */}
      {purchaseCreateModal && (
        <AddPurchase setPurchaseCreateModal={setPurchaseCreateModal} />
      )}
    </div>
  )
}

export default PurchasePage
