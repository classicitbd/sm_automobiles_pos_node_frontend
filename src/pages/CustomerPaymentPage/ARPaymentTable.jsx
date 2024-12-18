import { useEffect, useState } from "react";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import Swal from "sweetalert2-optimized";
import Pagination from "@/components/common/pagination/Pagination";
import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";

const ARPaymentTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  arDatas,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  // Today Payment Status
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
            ${BASE_URL}/check?role_type=check_update`,
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
          <div className="rounded-lg border border-gray-200 mt-6">
            {arDatas?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Customer Name</td>
                      <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                      <td className="whitespace-nowrap p-4 ">Total Amount</td>
                      <td className="whitespace-nowrap p-4 ">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Due Amount</td>
                      <td className="whitespace-nowrap p-4 ">Status</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {arDatas?.data?.map((check, i) => (
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
                          {check?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.customer_id?.customer_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.customer_id?.customer_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.received_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.due_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                          {check?.order_status || "-"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {check?.order_publisher_id?.user_name}
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

export default ARPaymentTable;
