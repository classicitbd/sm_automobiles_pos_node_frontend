import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetSupplier = () => {
  return useQuery({
    queryKey: [`/api/v1/supplier`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/supplier`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetSupplier;