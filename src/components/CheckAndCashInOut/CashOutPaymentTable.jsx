
import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";

const CashOutPaymentTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  CheckOutPaymentData,
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
            {CheckOutPaymentData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center ">
                      <th className="whitespace-nowrap p-4 font-medium">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Pay Amount
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Supplier Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Supplier Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Created By
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {CheckOutPaymentData?.data?.map((income, i) => (
                      <tr
                        key={income?._id}
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                          }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.supplier_payment_date}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.supplier_payment_amount || 0}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.supplier_id?.supplier_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {income?.supplier_id?.supplier_phone || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {(income?.supplier_payment_publisher_id?.user_name)}
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

export default CashOutPaymentTable;
