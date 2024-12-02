import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { IoMdEye } from "react-icons/io";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { FiEdit } from "react-icons/fi";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const OrderTable = ({
  setPage,
  setLimit,
  page,
  limit,
  totalData,
  refetch,
  user,
  isLoading,
  orders,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //   handle order status
  const handleOrderStatus = async (order_status, _id, products) => {
    try {
      const sendData = {
        _id: _id,
        order_status: order_status,
        order_updated_by: user?._id,
        order_status_update: true,
        order_products: products?.map((item) => ({
          product_id: item?.product_id?._id,
          product_quantity: item?.product_quantity,
          product_price: item?.product_price,
          product_buying_price: item?.product_buying_price,
          product_total_price: item?.product_total_price,
        })),
      };

      const response = await fetch(`${BASE_URL}/order?role_type=order_update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Status Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        refetch();
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      refetch();
    } finally {
      refetch();
    }
  };

  return (
    <>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {orders?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Customer Name</td>
                      <td className="whitespace-nowrap p-4 ">Phone</td>
                      <td className="whitespace-nowrap p-4 ">Email</td>
                      <td className="whitespace-nowrap p-4 ">
                        Customer Status
                      </td>
                      <td className="whitespace-nowrap p-4 ">Order Id</td>
                      <td className="whitespace-nowrap p-4 ">Sub Total</td>
                      <td className="whitespace-nowrap p-4 ">Discount(%)</td>
                      <td className="whitespace-nowrap p-4 ">Grand Total</td>
                      <td className="whitespace-nowrap p-4 ">Order Status</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {orders?.data?.map((order, i) => (
                      <tr
                        key={order?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                        }`}
                      >
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {serialNumber + i + 1}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.customer_id?.customer_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.customer_id?.customer_phone}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.customer_id?.customer_email}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.customer_id?.customer_status === "active"
                            ? "Active"
                            : "In-Active"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.sub_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.discount_percent_amount}%
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 uppercase">
                          {order?.order_status}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.order_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.order_updated_by?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center justify-between">
                          {/* handle order status */}
                          <select
                            onChange={(e) =>
                              handleOrderStatus(
                                e.target.value,
                                order?._id,
                                order?.order_products
                              )
                            }
                            id="order_status"
                            className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                          >
                            <option selected value={order?.order_status}>
                              {order?.order_status}
                            </option>
                            {order?.order_status !== "pending" &&
                              order?.order_status !== "processing" &&
                              order?.order_status !== "confirmed" &&
                              order?.order_status !== "cancelled" &&
                              order?.order_status !== "returned" && (
                                <option value="pending">Pending</option>
                              )}
                            {order?.order_status == "pending" && (
                              <option value="processing">Processing</option>
                            )}
                            {order?.order_status == "processing" && (
                              <option value="confirmed">Confirmed</option>
                            )}
                            {order?.order_status !== "cancelled" && (
                              <option value="cancelled">Cancelled</option>
                            )}
                            {order?.order_status == "confirmed" && (
                              <option value="returned">Returned</option>
                            )}
                          </select>
                          <button type="button" className="ml-3">
                            <FiEdit
                              size={25}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
                            />
                          </button>
                          <button
                            className="ml-[8px]"
                            // onClick={() => handleShowDocumentModal(order)}
                            disabled={!order?.order_voucher ? true : false}
                          >
                            <IoMdEye
                              size={30}
                              className="cursor-pointer text-gray-500 hover:text-gray-300"
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
          {totalData > 10 && (
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={totalData}
              page={page}
              limit={limit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default OrderTable;
