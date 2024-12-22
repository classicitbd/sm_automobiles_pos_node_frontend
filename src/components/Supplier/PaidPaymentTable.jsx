import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { Link } from "react-router-dom";

const PaidPaymentTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  paidPaymentLists,
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
            {paidPaymentLists?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className=" font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Supplier name</td>
                      <td className="whitespace-nowrap p-4 ">Supplier Phone</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Payment Date</td>
                      <td className="whitespace-nowrap p-4 ">Payment Note</td>

                      <td className="whitespace-nowrap p-4 ">Payment Method</td>

                      <td className="whitespace-nowrap p-4 ">Bank Name</td>
                      <td className="whitespace-nowrap p-4 ">Reference ID</td>
                      <td className="whitespace-nowrap p-4 ">Payment Status</td>

                      <td className="whitespace-nowrap p-4 ">Payment Amount</td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody>
                    {paidPaymentLists?.data?.map((paymentInfo, i) => (
                      <tr
                        key={paymentInfo?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {paymentInfo?.supplier_id?.supplier_name}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {paymentInfo?.supplier_id?.supplier_phone}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {
                            paymentInfo?.supplier_payment_publisher_id
                              ?.user_name
                          }
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {paymentInfo?.supplier_payment_updated_by
                            ?.user_name || "-"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {paymentInfo?.supplier_payment_date}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 capitalize">
                          {paymentInfo?.supplier_payment_title || "-"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                          {paymentInfo?.supplier_payment_method == "cash" ? (
                            <span className="text-secondary-600">Cash</span>
                          ) : (
                            <span className="text-success-300">Bank</span>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-2.5 font-medium text-blue-600 uppercase">
                          {paymentInfo?.payment_bank_id?.bank_name || "-"}
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 capitalize">
                          <Link to="">
                            {paymentInfo?.reference_id ? (
                              <span className="text-blue-600 underline ">
                                {paymentInfo?.reference_id}
                              </span>
                            ) : (
                              <span className="text-gray-900">--</span>
                            )}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 capitalize">
                          {paymentInfo?.supplier_payment_status == "paid" ? (
                            <span className="text-green-600">Paid</span>
                          ) : (
                            <span className="text-red-600">Un Paid</span>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                          {paymentInfo?.supplier_payment_amount}
                        </td>
                        <td className="whitespace-nowrap py-2.5 px-2 text-gray-700 flex items-center">
                          <button className="ml-3">
                            <FaEye
                              className="cursor-pointer text-gray-900 hover:text-gray-500"
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

export default PaidPaymentTable;
