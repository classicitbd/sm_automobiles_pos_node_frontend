import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { DateTimeFormat } from "@/utils/dateTimeFormet";

const ProfitTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  //refetch,
  // user,
  isLoading,
  profits,
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
          <div className="rounded-lg border border-gray-200 mt-6">
            {profits?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Profit Amount</td>

                      <td className="whitespace-nowrap p-4 ">
                        Discount Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">
                        Sub-Total Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Create Date</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {profits?.data?.map((profit, i) => (
                      <tr
                        key={profit?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {profit?.profit_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {profit?.discount_percent_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {profit?.received_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {profit?.sub_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {profit?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {" "}
                          {DateTimeFormat(profit?.createdAt)}
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

export default ProfitTable;
