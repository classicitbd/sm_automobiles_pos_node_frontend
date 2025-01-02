import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";

const CheckOutPaymentTable = ({
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
          <div className="rounded-lg shadow-md mt-3">
            {CheckOutPaymentData?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full  text-sm">
                  <thead>
                    <tr className="font-semibold text-center ">
                      <th className="whitespace-nowrap p-4 font-medium">
                        SL No
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Supplier Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Supplier Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Employee Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Employee Phone
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Created By
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Date
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Bank Name
                      </th>
                      <th className="whitespace-nowrap p-4 font-medium">
                        Reference No
                      </th>

                      <th className="whitespace-nowrap p-4 font-medium">
                        Pay Amount
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {CheckOutPaymentData?.data?.map((income, i) => (
                      <tr
                        key={income?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.supplier_id?.supplier_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.supplier_id?.supplier_phone || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.salary_user_id?.user_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.salary_user_id?.user_phone || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.supplier_payment_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {income?.supplier_payment_date}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-blue-700">
                          {income?.payment_bank_id?.bank_name || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-emerald-600">
                          {income?.reference_id || "N/A"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                          {income?.supplier_payment_amount || 0}
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

export default CheckOutPaymentTable;
