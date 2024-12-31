import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import Pagination from "../common/pagination/Pagination";
import { useEffect, useState } from "react";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { CiMenuKebab } from "react-icons/ci";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import { FaEye, FaFileDownload, FaPrint } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderUpDateModal from "./OrderUpDateModal";
import { CSVLink } from "react-csv";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import Swal from "sweetalert2-optimized";
import ChallanPDF from "@/pages/AllPdfPrintPage/ChallanPDF";
import InVoicePdf from "@/pages/AllPdfPrintPage/InVoicePdf";

const AccountOrderTable = ({
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
  const [orderDocumentModal, setOrderDocumentModal] = useState(null);
  const [orderUpdateModal, setOrderUpdateModal] = useState(false);
  const [orderUpdateModalData, setOrderUpdateModalData] = useState({});

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const handleShowDocumentModal = (id) => {
    setOrderDocumentModal((prevId) => (prevId === id ? null : id));
  };

  // Close modal on outside click
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleOutsideClick = (event) => {
        if (!event.target.closest(".modal-container")) {
          setOrderDocumentModal(null);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, []);

  //Handle Order update  Function

  const handleOrderUpdate = (order) => {
    setOrderUpdateModal(true);
    setOrderUpdateModalData(order);
  };

  //   handle order status
  const handleSendWarehouse = async (order) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You send this order to management! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          income_amount: order?.grand_total_amount,
          income_customer_id: order?.customer_id?._id,
          customer_phone: order?.customer_id?.customer_phone,
          income_order_id: order?._id,
          income_invoice_number: order?.order_id,
          _id: order?._id,
          order_status: "management",
          order_updated_by: user?._id,
          account_user_id: user?._id,
        };
        try {
          const response = await fetch(
            `
                  ${BASE_URL}/order`,
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
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: `Order send to warehouse successfully!`,
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

  // Handle CSV Download data
  const csvData =
    orders?.data?.map((order) => ({
      Date: DateTimeFormat(order?.createdAt),
      Customer_Name: order?.customer_id?.customer_name,
      Customer_Phone: order?.customer_id?.customer_phone,
      Customer_Address: order?.customer_id?.customer_address,
      Order_ID: order?.order_id,
      Order_Status: order?.order_status,
      Sub_Total: order?.sub_total_amount,
      Discount_Percent: order?.discount_percent_amount,
      Grand_Total: order?.grand_total_amount,
      Order_Note: order?.order_note,
    })) || [];

  const [challanOpen, setChallanOpen] = useState(false);
  const [challanOpenData, setChallanOpenData] = useState(false);

  // handle challan print
  const handleChallanPrint = (order) => {
    setChallanOpenData(order);
    setChallanOpen(true);
    // Reload the page after printing
    setTimeout(() => {
      const printContent = document.getElementById("invoicePrintArea");
      const originalBody = document.body.innerHTML;

      document.body.innerHTML = printContent.innerHTML;

      window.print();

      // Restore the original content after printing
      document.body.innerHTML = originalBody;

      // Reload the page after printing
      setTimeout(() => {
        location.reload();
      }, 10);
    }, 100);
  };

  //InVoice Pdf Open
  const [inVoiceOpen, setInVoiceOpen] = useState(false);
  const [inVoiceData, setInVoiceData] = useState({});

  // handle challan print
  const handleInvoicePrint = (order) => {
    setInVoiceData(order);
    setInVoiceOpen(true);
    // Reload the page after printing
    setTimeout(() => {
      const printContent = document.getElementById("invoicePrintArea");
      const originalBody = document.body.innerHTML;

      document.body.innerHTML = printContent.innerHTML;

      window.print();

      // Restore the original content after printing
      document.body.innerHTML = originalBody;

      // Reload the page after printing
      setTimeout(() => {
        location.reload();
      }, 10);
    }, 100);
  };

  return (
    <>
      {/* <div className="flex justify-end gap-4">
        <CSVLink
          filename="order-list.csv"
          className="flex items-center gap-2 text-sm font-semibold bg-secondary-400 text-text-default shadow-sm hover:bg-secondary-400/80 px-4 rounded-lg py-2"
          type="button"
          data={csvData}
        >
          <FaFileDownload /> Export CSV
        </CSVLink>
      </div> */}
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className="rounded-lg shadow-md  mt-3">
            {orders?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="font-semibold text-center ">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Customer Name</td>
                      <td className="whitespace-nowrap p-4 ">Phone</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Updated By</td>
                      <td className="whitespace-nowrap p-4 ">Order Id</td>
                      <td className="whitespace-nowrap p-4 ">Order Status</td>
                      <td className="whitespace-nowrap p-4 ">Discount(%)</td>
                      <td className="whitespace-nowrap p-4 ">Sub Total</td>

                      <td className="whitespace-nowrap p-4 ">Grand Total</td>
                      <td className="whitespace-nowrap p-4 ">
                        Received Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Due Amount</td>

                      <td className="whitespace-nowrap p-4 ">Action</td>
                    </tr>
                  </thead>

                  <tbody>
                    {orders?.data?.map((order, i) => (
                      <tr
                        key={order?._id}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                        } hover:bg-blue-100`}
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
                          {order?.order_publisher_id?.user_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order?.order_updated_by?.user_name
                            ? order?.order_updated_by?.user_name
                            : "--"}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          <Link to={`/order-details/${order?._id}`}>
                            <span className="text-blue-600 underline">
                              {order?.order_id}
                            </span>
                          </Link>
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 uppercase">
                          {order?.order_status == "management" ? (
                            <span className="text-yellow-500">
                              {order?.order_status}
                            </span>
                          ) : (
                            <span className="text-green-600">
                              {order?.order_status}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-purple">
                          {order?.discount_percent_amount ? (
                            <span>{order?.discount_percent_amount} % </span>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {order?.sub_total_amount}
                        </td>

                        <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                          {order?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-blue-700">
                          {order?.received_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                          {order?.due_amount}
                        </td>

                        <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center justify-between">
                          {/* <select
                                                        onChange={(e) =>
                                                            handleOrderStatus(
                                                                e.target.value,
                                                                order?._id,
                                                                order?.order_orders,
                                                                order?.customer_id?._id,
                                                                order?.grand_total_amount
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
                                                        {order?.order_status !== "cancelled" &&
                                                            order?.order_status !== "returned" &&
                                                            order?.order_status !== "confirmed" && (
                                                                <option value="cancelled">Cancelled</option>
                                                            )}
                                                        {order?.order_status == "confirmed" && (
                                                            <option value="returned">Returned</option>
                                                        )}
                                                    </select> */}
                          {/* <div>
                                                        <div>
                                                            <button
                                                                className="ml-[8px]"
                                                                onClick={() =>
                                                                    handleShowDocumentModal(order?._id)
                                                                }
                                                            >
                                                                <CiMenuKebab
                                                                    size={30}
                                                                    className="cursor-pointer text-gray-500 hover:text-gray-300 font-bold"
                                                                />
                                                            </button>
                                                            {orderDocumentModal == order?._id && (
                                                                <div className=" bg-bgray-200 shadow-xl w-[150px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                                                                    <Link to={`/order-details/${order?._id}`}>
                                                                        {" "}
                                                                        <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                                                                            <FaEye size={16} /> View
                                                                        </button>
                                                                    </Link>

                                                                    <button
                                                                        className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                                                        onClick={() => handleOrderUpdate(order)}
                                                                    >
                                                                        <FiEdit size={18} />
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div> */}
                          {user?.user_role_id?.order_patch == true && (
                            <>
                              <div>
                                <div>
                                  <button
                                    className="ml-[8px]"
                                    onClick={() =>
                                      handleShowDocumentModal(order?._id)
                                    }
                                  >
                                    <CiMenuKebab
                                      size={30}
                                      className="cursor-pointer text-primaryVariant-300 hover:text-primaryVariant-700 font-bold"
                                    />
                                  </button>
                                  {orderDocumentModal == order?._id && (
                                    <div className="  bg-success-50 shadow-xl w-[200px] flex flex-col gap-2 py-2 modal-container absolute right-14 z-30">
                                      <Link to={`/order-details/${order?._id}`}>
                                        {" "}
                                        <button className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium">
                                          <FaEye size={16} /> View
                                        </button>
                                      </Link>
                                      {user?.user_role_id
                                        ?.order_invoice_print == true && (
                                        <button
                                          className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                          onClick={() =>
                                            handleInvoicePrint(order)
                                          }
                                        >
                                          <FaPrint size={18} />
                                          Invoice
                                        </button>
                                      )}

                                      {/* <button
                                                                                            className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                                                                            onClick={() => handleOrderUpdate(order)}
                                                                                          >
                                                                                            <FiEdit size={18} />
                                                                                            Edit
                                                                                          </button> */}
                                      {user?.user_role_id
                                        ?.order_challan_print == true && (
                                        <button
                                          className="w-full px-3 py-2 hover:bg-sky-400 hover:text-white flex justify-center items-center gap-2 font-medium "
                                          onClick={() =>
                                            handleChallanPrint(order)
                                          }
                                        >
                                          <FaPrint size={18} />
                                          Challan
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {order?.order_status == "account" && (
                                <button
                                  type="button"
                                  className="w-full px-3 py-2 hover:bg-primary hover:text-white flex justify-center items-center gap-2 font-medium btn bg-sky-400 text-white rounded-md"
                                  onClick={() => handleSendWarehouse(order)}
                                >
                                  Send Management
                                </button>
                              )}
                            </>
                          )}
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

          {/* Challan */}
          {challanOpen && <ChallanPDF challanOpenData={challanOpenData} />}
          {/* In-Voice */}
          {inVoiceOpen && <InVoicePdf inVoiceData={inVoiceData} />}

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

      {orderUpdateModal && (
        <OrderUpDateModal
          setOrderUpdateModal={setOrderUpdateModal}
          orderUpdateModalData={orderUpdateModalData}
          refetch={refetch}
          user={user}
        />
      )}
    </>
  );
};

export default AccountOrderTable;
