import AddBankInfo from '@/components/Bank/AddBankInfo'
import BankInfoTable from '@/components/Bank/BankInfoTable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const BankPage = () => {
  const [bankAccountCreateModal, setBankAccountCreateModal] = useState(false)
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Bank Account</h1>
        </div>

        <div>
          <Button type='button' onClick={() => setBankAccountCreateModal(true)}>
            Create Bank Account
          </Button>
        </div>
      </div>
      {/* search Bank Account... */}
      <div className='mt-3'>
        <input
          type='text'
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Category...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* Bank Account Data Show and update and delete operation file */}

      <BankInfoTable />

      {/*Bank Account Create  modal */}
      {bankAccountCreateModal && (
        <AddBankInfo setBankAccountCreateModal={setBankAccountCreateModal} />
      )}
    </div>
  )
}

export default BankPage
