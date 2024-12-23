import AddBrand from '@/components/Brand/AddBrand'
import BrandTable from '@/components/Brand/BrandTable'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthProvider'
import useDebounced from '@/hooks/useDebounced'
import { BASE_URL } from '@/utils/baseURL'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'

const BrandPage = () => {
  const [brandCreateModal, setBrandCreateModal] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useContext(AuthContext)

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 })
  useEffect(() => {
    setSearchTerm(searchText)
  }, [searchText])

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value)
    setLimit(10)
    setPage(1)
  }

  //Fetch Brand Data
  const {
    data: brandTypes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/brand?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=brand_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/brand?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=brand_show`,
          {
            credentials: 'include',
          }
        )

        if (!res.ok) {
          const errorData = await res.text()
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
  })

//console.log(brandTypes)



  return (
    <div className='py-6 px-4 '>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Brand</h1>
        </div>

        <div>
          <Button type='button' onClick={() => setBrandCreateModal(true)}>
            Create Brand
          </Button>
        </div>
      </div>
      {/* search Brand... */}
      <div className='mt-3'>
        <input
          type='text'
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Brand...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/*Brand Data Show and update and delete operation file */}
      <BrandTable
        brandTypes={brandTypes}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={brandTypes?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
      />

      {/*Brands Create  modal */}
      {brandCreateModal && (
        <AddBrand
          setBrandCreateModal={setBrandCreateModal}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  )
}

export default BrandPage
