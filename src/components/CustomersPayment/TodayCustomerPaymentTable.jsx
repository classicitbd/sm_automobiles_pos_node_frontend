import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import Swal from "sweetalert2-optimized";

const TodayCustomerPaymentTable = ({
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

  // Today Payment Status
  const handleOrderStatus = (toDay_Payment_status, checkInfo) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to Paid this ${checkInfo?.customer_id?.customer_name} Payment !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: checkInfo?._id,
          check_status: toDay_Payment_status,
          bank_id: checkInfo?.bank_id?._id,
          pay_amount: checkInfo?.pay_amount,
          payment_note: checkInfo?.payment_note,
          check_number: checkInfo?.check_number,
          check_updated_by: user?._id,
          customer_id: checkInfo?.customer_id?._id,
          customer_phone: checkInfo?.customer_id?.customer_phone,
          order_id: checkInfo?.order_id?._id,
          invoice_number: checkInfo?.order_id?.order_id,
          payment_method: checkInfo?.payment_method,
        }
        try {
          const response = await fetch(
            `
            ${BASE_URL}/check?role_type=check_update`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(sendData),
            }
          )
          const result = await response.json()
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch()
            Swal.fire({
              title: 'Updated!',
              text: `${checkInfo?.customer_id?.customer_name} Payment has been Updated!`,
              icon: 'success',
            })
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            })
          }
        } catch (error) {
          toast.error('Network error or server is down', {
            autoClose: 1000,
          })
          console.error(error)
        }
      }
    })
  };

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
                        className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
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
                          {
                            check?.check_status == "pending" && (
                              <select
                                onChange={(e) => handleOrderStatus(e.target.value, check)}
                                id=""
                                className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                              >
                                <option selected disabled>
                                  Select A Status
                                </option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            )
                          }
                          <div>
                            <button className="ml-3">
                              <FaEye
                                className="cursor-pointer text-gray-500 hover:text-gray-300"
                                size={25}
                              />
                            </button>
                          </div>
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

export default TodayCustomerPaymentTable;
