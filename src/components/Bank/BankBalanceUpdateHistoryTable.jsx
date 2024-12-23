import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";

const BankBalanceUpdateHistoryTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  bankUpdateBalanceHistoryData,
  bankData,
  bankLoading,
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

      <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
        <div className="font-bold">
          <p className="sm:text-[20px] text-bgray-700">
            {" "}
            Bank Name :{" "}
            <span className="sm:text-[20px] text-blue-600">
              {bankData?.data?.bank_name}
            </span>
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Bank Balance :{" "}
            {bankData?.data?.bank_balance ? (
              <span className="sm:text-[20px] text-green-600">
                {bankData?.data?.bank_balance}
              </span>
            ) : (
              <span className="sm:text-[20px] text-red-600">0</span>
            )}
          </p>
        </div>
        <div className="font-bold text-bgray-700">
          <p className="sm:text-[20px] text-bgray-700">
            Accout Name : {bankData?.data?.account_name}
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Accout Number : {bankData?.data?.account_no}
          </p>
        </div>
      </div>

      {isLoading === true || bankLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="rounded-lg shadow-md  mt-8">
          {bankUpdateBalanceHistoryData?.data?.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full  text-sm">
                <thead >
                  <tr className="  font-semibold text-center ">
                    <td className="whitespace-nowrap p-4 ">SL No</td>
                    <td className="whitespace-nowrap p-4 ">Date</td>
                    <td className="whitespace-nowrap p-4 ">Created By</td>
                    <td className="whitespace-nowrap p-4 ">Previous Balance</td>
                    <td className="whitespace-nowrap p-4 ">New Balance</td>
                    <td className="whitespace-nowrap p-4 ">Total Add</td>
                  </tr>
                </thead>

                <tbody >
                  {bankUpdateBalanceHistoryData?.data?.map((payment, i) => (
                    <tr
                      key={payment?._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                      } hover:bg-blue-100`}
                    >
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {DateTimeFormat(payment?.createdAt)}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                        {payment?.publisher_id?.user_name}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-yellow-500">
                        {payment?.previous_balance}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                        {payment?.new_balance}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-blue-600">
                        {payment?.previous_balance > payment?.new_balance ? (
                          <span className="text-red-600">
                            {" "}
                            {payment?.new_balance - payment?.previous_balance}
                          </span>
                        ) : (
                          <span>
                            {" "}
                            {payment?.new_balance - payment?.previous_balance}
                          </span>
                        )}
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

export default BankBalanceUpdateHistoryTable;
