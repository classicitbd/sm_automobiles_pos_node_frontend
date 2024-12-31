import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import Swal from "sweetalert2-optimized";
import { Link } from "react-router-dom";

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
      title: "Are you sure?",
      text: `You won't be able to Paid this ${checkInfo?.customer_id?.customer_name} Payment !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: checkInfo?._id,
          check_status: toDay_Payment_status,
          bank_id: checkInfo?.bank_id?._id,
          pay_amount: parseFloat(checkInfo?.pay_amount).toFixed(2),
          payment_note: checkInfo?.payment_note,
          check_number: checkInfo?.check_number,
          check_updated_by: user?._id,
          customer_id: checkInfo?.customer_id?._id,
          customer_phone: checkInfo?.customer_id?.customer_phone,
          order_id: checkInfo?.order_id?._id,
          invoice_number: checkInfo?.order_id?.order_id,
          payment_method: checkInfo?.payment_method,
        };
        try {
          const response = await fetch(
            `
            ${BASE_URL}/check`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: `${checkInfo?.customer_id?.customer_name} Payment has been Updated!`,
              icon: "success",
            });
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          toast.error("Network error or server is down", {
            autoClose: 1000,
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded-lg shadow-md mt-3">
            {checks?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full e text-sm">
                  <thead>
                    <tr className="font-semibold text-center ">
                      <td className="whitespace-nowrap py-4 px-2 ">SL No</td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Invoice No
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Customer Name
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Customer Phone
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Created By
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Updated By
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Check Withdraw Date
                      </td>

                      <td className="whitespace-nowrap py-4 px-2 ">
                        Check Number
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Payment Method
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Bank Name
                      </td>

                      <td className="whitespace-nowrap py-4 px-2 ">Status</td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Order Amount
                      </td>
                      <td className="whitespace-nowrap py-4 px-2 ">
                        Pay Amount
                      </td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody>
                    {checks?.data?.map((check, i) => (
                      <tr
                        key={check?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
                      >
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          <Link to={`/order-details/${check?.order_id?._id}`}>
                            <span className="text-blue-600 underline ">
                              {check?.invoice_number}
                            </span>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          {check?.customer_id?.customer_name}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          {check?.customer_id?.customer_phone}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          {check?.check_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700">
                          {check?.check_updated_by?.user_name || "--"}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700 capitalize">
                          {check?.check_withdraw_date || "--"}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700 capitalize">
                          {check?.check_number || "--"}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700 capitalize">
                          {check?.payment_method == "cash" ? (
                            <span className="text-secondary-700">
                              {check?.payment_method}
                            </span>
                          ) : (
                            <span className="text-purple">
                              {check?.payment_method}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-blue-600 capitalize">
                          {check?.bank_id?.bank_name || "--"}
                        </td>

                        <td className="whitespace-nowrap py-3 px-1 font-medium text-gray-700 capitalize">
                          {check?.check_status == "pending" ? (
                            <span className="text-yellow-500">
                              {check?.check_status}
                            </span>
                          ) : (
                            <span className="text-green-600">
                              {check?.check_status}
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-3 px-1 font-medium text-blue-600">
                          {check?.order_id?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-3 px-1 font-medium text-green-600">
                          {check?.pay_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center">
                          {check?.check_status == "pending" && (
                            <select
                              onChange={(e) =>
                                handleOrderStatus(e.target.value, check)
                              }
                              id=""
                              className="block w-full  py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                            >
                              <option selected disabled>
                                Select Status
                              </option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          )}
                          <div>
                            <button className="ml-3">
                              <FaEye
                                className="cursor-pointer text-gray-900 hover:text-gray-500"
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
