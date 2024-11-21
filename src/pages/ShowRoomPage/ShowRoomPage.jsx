import AddShowRoom from '@/components/ShowRoom/AddShowRoom'
import ShowRoomTable from '@/components/ShowRoom/ShowRoomTable'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const ShowRoomPage = () => {
  const [showRoomCreateModal, setShowRoomCreateModal] = useState(false)
  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Show Room</h1>
        </div>

        <div>
          <Button type='button' onClick={() => setShowRoomCreateModal(true)}>
            Create Show Room
          </Button>
        </div>
      </div>
      {/* search Show Room... */}
      <div className='mt-3'>
        <input
          type='text'
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Customers...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/*Show Room Data Show and update and delete operation file */}
      <ShowRoomTable />
      {/*Show Room Create  modal */}
      {showRoomCreateModal && (
        <AddShowRoom setShowRoomCreateModal={setShowRoomCreateModal} />
      )}
    </div>
  )
}

export default ShowRoomPage
