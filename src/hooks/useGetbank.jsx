import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetBank = () => {
  return useQuery({
    queryKey: [`/api/v1/bank`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/bank`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetBank
