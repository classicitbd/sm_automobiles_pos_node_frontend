import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetProductUnit = () => {
  return useQuery({
    queryKey: [`/api/v1/product_unit`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/product_unit`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetProductUnit
