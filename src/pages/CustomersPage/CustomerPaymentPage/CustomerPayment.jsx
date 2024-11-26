import AddCustomersPayment from '@/components/CustomersPayment/AddCustomersPayment'

const CustomerPayment = () => {
  //console.log(customersPayment)
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow max-w-3xl mx-auto'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Customers Payment</h1>
        </div>
      </div>

      {/*Customers Payment Create  modal */}
      <AddCustomersPayment />
    </div>
  )
}

export default CustomerPayment
