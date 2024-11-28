import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetCustomer = () => {
  return useQuery({
    queryKey: [`/api/v1/customer`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/customer`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetCustomer;