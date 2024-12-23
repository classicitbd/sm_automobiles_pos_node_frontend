import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { Link } from "react-router-dom";

const LeisureTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  //refetch,
  // user,
  isLoading,
  ledgers,
}) => {
  const [serialNumber, setSerialNumber] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="shadow-md mt-3 rounded-lg">
            {ledgers?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full  text-sm">
                  <thead>
                    <tr className=" font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Date</td>
                      <td className="whitespace-nowrap p-4 ">Description</td>
                      <td className="whitespace-nowrap p-4 ">Category</td>
                      <td className="whitespace-nowrap p-4 ">
                        Debit (Expense)
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Credit (Income)
                      </td>
                      <td className="whitespace-nowrap p-4 ">Balance</td>
                    </tr>
                  </thead>

                  <tbody>
                    {ledgers?.data?.map((ledger, i) => (
                      <tr
                        key={ledger?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-blue-700">
                          {DateTimeFormat(ledger?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {" "}
                          {ledger?.ledger_title}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {ledger?.ledger_category}
                        </td>

                        <td className="whitespace-nowrap py-3 font-medium text-red-600">
                          {ledger?.ledger_debit}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-green-600">
                          {ledger?.ledger_credit}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-blue-600">
                          {ledger?.ledger_balance}
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

          {totalData > 3 && (
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
              page={page}
              limit={limit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LeisureTable;
