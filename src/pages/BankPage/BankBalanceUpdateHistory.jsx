
import BankBalanceUpdateHistoryTable from "@/components/Bank/BankBalanceUpdateHistoryTable";
import { AuthContext } from "@/context/AuthProvider";
import useGetBankDetails from "@/hooks/useGetABankDetails";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const BankBalanceUpdateHistory = () => {
  const { bank_id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { user } = useContext(AuthContext);

  //Fetch Bank Data
  const {
    data: bankUpdateBalanceHistoryData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/bank_balance_update_history?bank_id=${bank_id}&page=${page}&limit=${limit}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bank_balance_update_history?bank_id=${bank_id}&page=${page}&limit=${limit}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  //get bank data
  const { data: bankData = {}, isLoading: bankLoading } = useGetBankDetails(bank_id);

  return (
    <div className="py-6 px-4">
     
      <BankBalanceUpdateHistoryTable
        bankUpdateBalanceHistoryData={bankUpdateBalanceHistoryData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={bankUpdateBalanceHistoryData?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
        bankData={bankData}
        bankLoading={bankLoading}
      />
    </div>
  );
};

export default BankBalanceUpdateHistory;

