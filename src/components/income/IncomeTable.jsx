
import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { DateTimeFormat } from "@/utils/dateTimeFormet";

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
          <div className="rounded-lg border border-gray-200 mt-6">
            {incomes?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        incomes Title
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        incomes Amount
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Customer Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Customer Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Bank Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Reference No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Invoice Id
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        incomes Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                        Created By
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {incomes?.data?.map((income, i) => (
                      <tr
                        key={income?._id}
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                          }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_title || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_amount || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_customer_id?.customer_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_customer_id?.customer_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_bank_id?.bank_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.reference_id || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.income_invoice_number || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {DateTimeFormat(income?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {(income?.income_publisher_id?.user_name)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
            {/* pagination */}

            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
              page={page}
              limit={limit}
            />

          </div>
        </div>
      )}
    </>
  );
};

export default IncomeTable;