import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../utils/baseURL'

const useGetSupplierStockInvoice = (supplier_id) => {
  return useQuery({
    queryKey: [`/api/v1/stock_manage/a_supplier_all_invoice/${supplier_id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/stock_manage/a_supplier_all_invoice/${supplier_id}`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetSupplierStockInvoice
