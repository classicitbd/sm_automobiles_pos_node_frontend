
import CashBalanceUpdateHistoryTable from "@/components/Bank/CashBalanceUpdateHistoryTable";
import { AuthContext } from "@/context/AuthProvider";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

const CashBalanceHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { user } = useContext(AuthContext);

  //Fetch Bank Data
  const {
    data: balanceHistoryData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/cash_balance_update_history?page=${page}&limit=${limit}&role_type=cash_balance_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/cash_balance_update_history?page=${page}&limit=${limit}&role_type=cash_balance_history_show`,
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

  return (
    <div className=" py-6 px-4 ">
     
      <CashBalanceUpdateHistoryTable
        balanceHistoryData={balanceHistoryData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={balanceHistoryData?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CashBalanceHistory;
