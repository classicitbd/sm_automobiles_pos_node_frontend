//import { BASE_URL } from '@/utils/baseURL'
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Select from "react-select";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";
import useGetSelfOrder from "@/hooks/useGetAllSelfOrder";

const AddCustomersPayment = () => {
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
    <>
      <div className="grid grid-cols-6 gap-8">
        {/* payment form */}
        <div className="col-span-2 border p-4">
          <div className="sticky top-10">
            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
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

              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
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
        <div className="col-span-4 border p-4">
          {/* customer info */}
          {order_Info && customer_id && (
            <>
              <div>
                <div className="overflow-x-auto rounded-t-lg">
                  <p className="text-[20px] font-bold text-gray-800 capitalize text-center mb-6 underline">
                    Customer Information
                  </p>
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
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

                    <tbody className="divide-y divide-gray-200 text-center">
                      <tr>
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
                          {order_Info?.customer_id?.customer_wallet}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order_Info?.customer_id?.customer_status}
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
              <div>
                <div className="overflow-x-auto rounded-t-lg">
                  <p className="text-[20px] font-bold text-gray-800 capitalize text-center mb-6 underline">
                    Order Information
                  </p>
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">Invoice ID</td>
                        <td className="whitespace-nowrap p-4 ">Sub Total</td>
                        <td className="whitespace-nowrap p-4 ">Discount</td>
                        <td className="whitespace-nowrap p-4 ">Grand Total</td>
                        <td className="whitespace-nowrap p-4 ">Received Amount</td>
                        <td className="whitespace-nowrap p-4 ">Due Amount</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      <tr>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order_Info?.order_id}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order_Info?.sub_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 ">
                          {order_Info?.discount_percent_amount}%
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order_Info?.grand_total_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          {order_Info?.received_amount}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
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
              <div>
                <div className="overflow-x-auto rounded-t-lg">
                  <p className="text-[20px] font-bold text-gray-800 capitalize text-center mb-6 underline">
                    Product Information
                  </p>
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">Invoice ID</td>
                        <td className="whitespace-nowrap p-4 ">Price</td>
                        <td className="whitespace-nowrap p-4 ">Quantity</td>
                        <td className="whitespace-nowrap p-4 ">Total Price</td>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {order_Info?.order_products?.map((product, i) => (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {product?.product_id?.product_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {product?.product_price}
                          </td>
                          <td className="whitespace-nowrap py-1.5 ">
                            {product?.product_quantity}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {product?.product_total_price}
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
    </>
  );
};

export default AddCustomersPayment;
