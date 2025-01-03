import BankOut from "@/components/Bank/BankOut";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import useGetBankDetails from "@/hooks/useGetABankDetails";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BankOutPage = () => {
  const { id } = useParams();
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

  //Fetch Bank Data
  const {
    data: bankOutData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/bank_out?bank_id=${id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bank_out?bank_id=${id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
  //get bank data
  const { data: bankData = {}, isLoading: bankLoading } = useGetBankDetails(id);


  return (
    <div className="rounded-lg py-6 px-4">

      <BankOut bankOutData={bankOutData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={bankOutData?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
        handleSearchValue={handleSearchValue}
        searchTerm={searchTerm}
        bankData={bankData}
        bankLoading={bankLoading}
      />
    </div>
  );
};

export default BankOutPage;
