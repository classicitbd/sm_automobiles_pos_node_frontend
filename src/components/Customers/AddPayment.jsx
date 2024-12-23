import { AuthContext } from "@/context/AuthProvider";
import useGetSelfOrder from "@/hooks/useGetAllSelfOrder";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import Select from "react-select";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const AddPayment = ({ setCustomerAddPaymentModal }) => {
  const paymentOption = [
    { id: 1, value: "cash", label: "Cash" },
    { id: 2, value: "check", label: "Check" },
  ];

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [customer_id, setCustomer_id] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [order_id, setOrder_id] = useState("");
  const [invoice_number, setInvoice_number] = useState("");
  const [order_Info, setOrder_Info] = useState({});
  const [bank_id, setBank_id] = useState("");
  const [payment_method, setPaymentBy] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //get bank data
  const { data: bankTypes = [], isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/bank`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text(); // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow to propagate the error to react-query
      }
    },
  });

  //get order data
  const { data: orderTypes, isLoading: orderLoading } = useGetSelfOrder(
    user?._id
  );

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      if (order_Info?.due_amount < data?.pay_amount) {
        toast.error("Pay amount must be less than or equal due amount");
        setLoading(false);
        return;
      }
      const sendData = {
        customer_id,
        customer_phone,
        order_id,
        invoice_number,
        payment_method,
        pay_amount: parseFloat(data?.pay_amount).toFixed(2),
        payment_note: data?.payment_note,
        check_publisher_id: user?._id,
      };
      if (payment_method == "check") {
        (sendData.bank_id = bank_id),
          (sendData.check_number = data?.check_number),
          (sendData.check_withdraw_date = data?.check_withdraw_date);
      }
      const response = await fetch(`${BASE_URL}/check?role_type=check_create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message
            ? result?.message
            : "Customer Payment created successfully",
          {
            autoClose: 1000,
          }
        );
        reset();
        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // customer or invoice search
  const customFilter = (option, inputValue) => {
    const invoice_idMatch = option?.data?.order_id
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    const customerNameMatch = option?.data?.customer_id?.customer_name
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    const customerPhoneMatch = option?.data?.customer_id?.customer_phone
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    return invoice_idMatch || customerNameMatch || customerPhoneMatch;
  };

  if (isLoading || orderLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 py-5">
        <div
          className={`relative overflow-hidden text-left bg-white rounded-lg shadow-xl sm:w-[1050px]  p-6 max-h-[100vh] overflow-y-auto scrollbar-thin ${
            order_Info && customer_id && "h-[900px]"
          }`}
        >
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title "
            >
              Add Customer Payment
            </h3>
            <button
              type="button"
              className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
              onClick={() => setCustomerAddPaymentModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />
          <div className=" ">
            {/* payment form */}
            <div className="rounded py-6 px-4 max-w-5xl mx-auto shadow bg-white mt-5">
              <div className="sticky top-10">
                <form onSubmit={handleSubmit(handleDataPost)} className="">
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-gray-700 mb-2 mt-2">
                      Invoice Number or Customer Phone{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Select
                      id="order_id"
                      name="order_id"
                      aria-label="Customer Name"
                      isClearable
                      required
                      options={orderTypes?.data}
                      getOptionLabel={(x) =>
                        `${x?.order_id} ${x?.customer_id?.customer_name} (${x?.customer_id?.customer_phone})`
                      }
                      getOptionValue={(x) => x._id}
                      onChange={(selectedOption) => {
                        setOrder_id(selectedOption?._id);
                        setCustomer_id(selectedOption?.customer_id?._id);
                        setCustomer_phone(
                          selectedOption?.customer_id?.customer_phone
                        );
                        setInvoice_number(selectedOption?.order_id);
                        setOrder_Info(selectedOption);
                      }}
                      filterOption={customFilter} // Custom filtering by name and phone
                      placeholder="Search by invoice number or name or phone"
                      noOptionsMessage={() => "No customers found"}
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-xs font-medium text-gray-700 mb-2 mt-2">
                      Payment By
                    </label>

                    <Select
                      id="payment_method"
                      name="payment_method"
                      aria-label="Payment By"
                      required
                      isClearable
                      options={paymentOption}
                      getOptionLabel={(x) => x?.label}
                      getOptionValue={(x) => x?.value}
                      onChange={(selectedOption) => {
                        setPaymentBy(selectedOption?.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor=""
                      className="block text-xs font-medium text-gray-700"
                    >
                      Pay Amount
                    </label>

                    <input
                      {...register("pay_amount", {
                        required: "Pay Amount is required",
                        validate: (value) => {
                          if (value < 0) {
                            return "Amount must be getter than 0";
                          }
                        },
                      })}
                      min={0.01} // Allow decimal values with minimum 0.01
                      step="0.01" // Ensure step supports decimal precision
                      type="number"
                      placeholder="Pay Amount"
                      className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                    />

                    {errors?.pay_amount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.pay_amount?.message}
                      </p>
                    )}
                  </div>

                  {payment_method === "check" && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                        Payment Bank Name
                      </label>

                      <Select
                        id="bank_id"
                        name="bank_id"
                        required
                        isClearable
                        aria-label="Payment Bank Name"
                        options={bankTypes?.data}
                        getOptionLabel={(x) => x?.bank_name}
                        getOptionValue={(x) => x?._id}
                        onChange={(selectedOption) => {
                          setBank_id(selectedOption?._id);
                        }}
                      />
                    </div>
                  )}

                  {payment_method === "check" && (
                    <div className="mt-4">
                      <label
                        htmlFor=""
                        className="block text-xs font-medium text-gray-700"
                      >
                        Check Number
                      </label>

                      <input
                        {...register("check_number", {
                          required: "Check Number is required",
                        })}
                        type="text"
                        placeholder="Check Number"
                        className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />

                      {errors?.check_number && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors?.check_number?.message}
                        </p>
                      )}
                    </div>
                  )}

                  {payment_method === "check" && (
                    <div className="mt-4">
                      <label
                        htmlFor=""
                        className="block text-xs font-medium text-gray-700"
                      >
                        Check Issue Date
                      </label>

                      <input
                        {...register("check_withdraw_date", {
                          required: "Check Issue Date is required",
                        })}
                        type="date"
                        min={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
                        placeholder="Check Issue Date"
                        className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />

                      {errors?.check_withdraw_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors?.check_withdraw_date?.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="block text-xs font-medium text-gray-700"
                    >
                      Payment Note
                    </label>

                    <textarea
                      {...register("payment_note")}
                      type="text"
                      placeholder="Payment Note"
                      className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                    />
                  </div>

                  <div className="flex justify-end mt-3">
                    {loading == true ? (
                      <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                        <MiniSpinner />
                      </div>
                    ) : (
                      <Button type="submit">Create</Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            {/* customer info and order info */}
            <div className="max-w-6xl mx-auto">
              {/* customer info */}
              {order_Info && customer_id && (
                <>
                  <div className="mt-8 shadow-md py-4 px-3 pb-2">
                    <div className="overflow-x-auto rounded-lg">
                      <p className="text-[20px] font-bold text-gray-800 uppercase mb-2">
                        Customer Information
                      </p>
                      <table className="min-w-full   text-sm">
                        <thead>
                          <tr className="font-semibold text-center">
                            <td className="whitespace-nowrap p-4 ">
                              Customer Name
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Customer Phone
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Customer Address
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Customer Wallet
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Customer Status
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            className=" bg-secondary-100
                        hover:bg-blue-100"
                          >
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order_Info?.customer_id?.customer_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order_Info?.customer_id?.customer_phone}
                            </td>
                            <td className="whitespace-nowrap py-1.5 ">
                              {order_Info?.customer_id?.customer_address}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order_Info?.customer_id?.customer_wallet ? (
                                <>
                                  {" "}
                                  {order_Info?.customer_id?.customer_wallet >
                                  0 ? (
                                    <span className="text-green-600">
                                      {order_Info?.customer_id?.customer_wallet}
                                    </span>
                                  ) : (
                                    <span className="text-red-600">
                                      {order_Info?.customer_id?.customer_wallet}
                                    </span>
                                  )}
                                </>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order_Info?.customer_id?.customer_status ===
                              "active" ? (
                                <span className="text-green-600">
                                  {order_Info?.customer_id?.customer_status}
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  {order_Info?.customer_id?.customer_status}
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {/* order info */}
              {order_Info && order_id && (
                <>
                  <div className="mt-8 shadow-md py-4 px-3 pb-2">
                    <div className="overflow-x-auto rounded-lg">
                      <p className="text-[20px] font-bold text-gray-800 uppercase mb-2">
                        Order Information
                      </p>
                      <table className="min-w-full  text-sm">
                        <thead>
                          <tr className=" font-semibold text-center ">
                            <td className="whitespace-nowrap p-4 ">
                              Invoice ID
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Sub Total
                            </td>
                            <td className="whitespace-nowrap p-4 ">Discount</td>
                            <td className="whitespace-nowrap p-4 ">
                              Grand Total
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Received Amount
                            </td>
                            <td className="whitespace-nowrap p-4 ">
                              Due Amount
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            className=" bg-secondary-100
                        hover:bg-blue-100"
                          >
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              <Link>
                                <span className="text-blue-500 underline">
                                  {" "}
                                  {order_Info?.order_id}
                                </span>
                              </Link>
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {order_Info?.sub_total_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-purple">
                              {order_Info?.discount_percent_amount} %
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {order_Info?.grand_total_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {order_Info?.received_amount ===
                              order_Info?.grand_total_amount ? (
                                <span className="text-green-600">
                                  {order_Info?.received_amount}
                                </span>
                              ) : order_Info?.received_amount >
                                order_Info?.grand_total_amount ? (
                                <span className="text-blue-600">
                                  {order_Info?.received_amount}
                                </span>
                              ) : (
                                <span className="text-yellow-600">
                                  {order_Info?.received_amount}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                              {order_Info?.due_amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
              {/* product info */}
              {order_Info && order_id && (
                <>
                  <div className="mt-8  shadow-md py-4 px-3 pb-2">
                    <div className="overflow-x-auto rounded-lg">
                      <p className="text-[20px] font-bold text-gray-800 uppercase mb-2">
                        Product Information
                      </p>
                      <table className="min-w-full   text-sm">
                        <thead>
                          <tr className="  font-semibold text-center ">
                            <td className="whitespace-nowrap p-4 ">
                              Product Name
                            </td>
                            <td className="whitespace-nowrap p-4 ">Price</td>
                            <td className="whitespace-nowrap p-4 ">Quantity</td>
                            <td className="whitespace-nowrap p-4 ">
                              Total Price
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          {order_Info?.order_products?.map((product, i) => (
                            <tr
                              key={i}
                              className=" bg-secondary-100
                        hover:bg-blue-100"
                            >
                              <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                {product?.product_id?.product_name}
                              </td>
                              <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                                {product?.product_price}
                              </td>
                              <td className="whitespace-nowrap py-1.5 ">
                                {product?.product_quantity}
                              </td>
                              <td className="whitespace-nowrap py-1.5 font-medium text-blue-600">
                                {product?.product_total_price
                                  ? product?.product_total_price
                                  : "--"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;