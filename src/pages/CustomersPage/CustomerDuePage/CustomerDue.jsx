import AddCustomerDue from '@/components/CustomerDue/AddCustomerDue'

const CustomerDue = () => {
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow  max-w-3xl mx-auto'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Customers Due</h1>
        </div>
      </div>

      <AddCustomerDue />
    </div>
  )
}

export default CustomerDue
