import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { Link } from "react-router-dom";

const IncomeTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  incomes,
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
          <div className="rounded-lg shadow-md mt-3">
            {incomes?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full  bg-white text-sm">
                  <thead>
                    <tr className="font-semibold text-center ">
                      <th className="whitespace-nowrap p-4 font-medium ">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        incomes Title
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Created By
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium ">
                        Customer Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Customer Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Invoice Id
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Incomes Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium ">
                        Incomes Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {incomes?.data?.map((income, i) => (
                      <tr
                        key={income?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {income?.income_title || (
                            <span className="text-red-600">N/A</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {income?.income_publisher_id?.user_name}
                        </td>

                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {income?.income_customer_id?.customer_name || (
                            <span className="text-red-600">N/A</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {income?.income_customer_id?.customer_phone || (
                            <span className="text-red-600">N/A</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                            {income?.income_invoice_number ? (
                              <span>
                                {income?.income_invoice_number}
                              </span>
                            ) : (
                              <span className="text-red-600">N/A</span>
                            )}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {DateTimeFormat(income?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                          {(
                            <span span className="text-green-600">
                              {income?.income_amount}
                            </span>
                          ) || <span className="text-red-600">N/A</span>}
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
          {/* pagination */}

          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
            page={page}
            limit={limit}
          />
        </div>
      )}
    </>
  );
};

export default IncomeTable;
