import AddSupplierPayment from '@/components/SupplierPayment/AddSupplierPayment'

const SupplierPayment = () => {
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow  max-w-3xl mx-auto'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Supplier Payment</h1>
        </div>
      </div>
      <AddSupplierPayment />
    </div>
  )
}

export default SupplierPayment
