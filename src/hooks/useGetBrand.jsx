import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetBrand = () => {
  return useQuery({
    queryKey: [`/api/v1/brand`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/brand`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetBrand
