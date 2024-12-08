import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";

const CustomerPaymentTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  checks,
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
            {checks?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Customer Name</td>
                      <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                      <td className="whitespace-nowrap p-4 ">Order Amount</td>
                      <td className="whitespace-nowrap p-4 ">Pay Amount</td>
                      <td className="whitespace-nowrap p-4 ">Payment Method</td>
                      <td className="whitespace-nowrap p-4 ">Bank Name</td>
                      <td className="whitespace-nowrap p-4 ">Check Number</td>
                      <td className="whitespace-nowrap p-4 ">
                        Check Withdraw Date
                      </td>
                      <td className="whitespace-nowrap p-4 ">Status</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {checks?.data?.map((check, i) => (
                      <tr
                        key={check?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.invoice_number}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.customer_id?.customer_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.customer_id?.customer_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.order_id?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.pay_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.payment_method}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.bank_id?.bank_name || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.check_number || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.check_withdraw_date || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.check_status || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.check_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.check_updated_by?.user_name || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center">
                          <button className="ml-3">
                            <FaEye
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                              size={25}
                            />
                          </button>
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

export default CustomerPaymentTable;
