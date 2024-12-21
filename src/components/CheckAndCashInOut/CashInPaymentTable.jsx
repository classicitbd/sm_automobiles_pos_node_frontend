
import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { DateTimeFormat } from "@/utils/dateTimeFormet";

const CashInPaymentTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  CashInPaymentData,
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
            {CashInPaymentData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center ">
                      <th className="whitespace-nowrap p-4 font-medium">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Invoice Id
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Pay Amount
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Customer Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Customer Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Created By
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {CashInPaymentData?.data?.map((income, i) => (
                      <tr
                        key={income?._id}
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                          }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.invoice_number || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {DateTimeFormat(income?.createdAt)}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.pay_amount || 0}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.customer_id?.customer_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.customer_id?.customer_phone || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {(income?.check_publisher_id?.user_name)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* pagination */}

                <Pagination
                  setPage={setPage}
                  setLimit={setLimit}
                  totalData={totalData}
                  page={page}
                  limit={limit}
                />
              </div>
            ) : (
              <NoDataFound />
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default CashInPaymentTable;
