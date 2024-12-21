import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";

const CashBalanceUpdateHistoryTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  balanceHistoryData,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      <div className="mt-4">
        <h3 className="sm:text-[26px] sm:font-medium text-gray-800 uppercase">
          Balance Update List
        </h3>
      </div>

      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="rounded-lg border border-gray-200 mt-2">
          {balanceHistoryData?.data?.length > 0 ? (
            <div className="overflow-x-auto rounded-t-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                  <tr className="divide-x  divide-gray-300  font-semibold text-center text-white">
                    <td className="whitespace-nowrap p-4 ">SL No</td>
                    <td className="whitespace-nowrap p-4 ">Time</td>
                    <td className="whitespace-nowrap p-4 ">Previous Balance</td>
                    <td className="whitespace-nowrap p-4 ">New Balance</td>
                    <td className="whitespace-nowrap p-4 ">Total Add</td>
                    <td className="whitespace-nowrap p-4 ">Created By</td>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-center">
                  {balanceHistoryData?.data?.map((payment, i) => (
                    <tr
                      key={payment?._id}
                      className={`divide-x divide-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                      }`}
                    >
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {DateTimeFormat(payment?.createdAt)}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {payment?.previous_balance}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {payment?.new_balance}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {payment?.new_balance - payment?.previous_balance}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {payment?.publisher_id?.user_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}

      {totalData > 10 && (
        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalData={totalData}
          page={page}
          limit={limit}
        />
      )}
    </>
  );
};

export default CashBalanceUpdateHistoryTable;
