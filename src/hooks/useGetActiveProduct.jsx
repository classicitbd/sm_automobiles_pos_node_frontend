import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetActiveProduct = () => {
  return useQuery({
    queryKey: [`/api/v1/product`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetActiveProduct
