import Select from "react-select";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import useGetBank from "@/hooks/useGetbank";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { Button } from "../ui/button";
import { set, useForm } from "react-hook-form";
import { parse } from "postcss";
import { IoMdAddCircleOutline } from "react-icons/io";
import useGetProductUnit from "@/hooks/useGetUnit";

const RightSide = ({ user, addProducts, setAddProducts, settingData }) => {
  const paymentOption = [
    {
      _id: 1,
      payment_type: "Full Payment",
      payment_value: "full-payment",
    },
    {
      _id: 2,
      payment_type: "Partial Payment",
      payment_value: "partial-payment",
    },
    {
      _id: 3,
      payment_type: "Due Payment",
      payment_value: "due-payment",
    },
  ];

  const partialPaymentOption = [
    { id: 1, value: "cash", label: "Cash" },
    { id: 2, value: "check", label: "Check" },
  ];

  //get unit data
  const { data: unitTypes, isLoading: unitLoading } = useGetProductUnit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [customerAddModal, setCustomerAddModal] = useState(false); //customer add modal
  const [customerInfo, setCustomerInfo] = useState({}); //customer info data
  const [product_discount, setProductDiscount] = useState(0); //product discount
  const [product_discount_idInfo, setProductDiscountIDInfo] = useState(null); //product discount id set

  // set add product discount ammount and calculate grand total price
  useEffect(() => {
    setAddProducts((prev) =>
      prev.map((item) =>
        item?._id === product_discount_idInfo?._id
          ? {
              ...item,
              discount_percent: product_discount,
              grand_total:
                product_discount_idInfo?.total_amount -
                (product_discount_idInfo?.total_amount * product_discount) /
                  100,
            }
          : item
      )
    );
  }, [product_discount, product_discount_idInfo, setAddProducts]);

  // set all data in state
  const [customer_id, setCustomer_id] = useState("");
  const [sub_total, setSubTotal] = useState(0);
  const [discount_amount, setDiscountInputAmount] = useState(0);
  const [grand_total, setGrandTotal] = useState(0);
  const [order_note, setOrderNote] = useState("");
  const [payment_type, setPaymentType] = useState(null); //payment type
  const [received_amount, setReceivedAmount] = useState(0); //received amount
  const [due_amount, setDueAmount] = useState(0); //due amount
  const [payment_method, setPaymentBy] = useState(""); //payment method bank or cash
  const [pay_amount, setPayAmount] = useState(0); //payment method bank or cash
  const [bank_id, setBank_id] = useState(""); //bank id

  //get bank data
  const { data: bankTypes, isLoading: bankLoading } = useGetBank();

  //Fetch Customer Data
  const {
    data: customerTypes = [],
    isLoading: customerLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/customer?customer_publisher_id=${user?._id}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/customer?customer_publisher_id=${user?._id}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  // Calculate discounted total whenever addProducts or discount_amount changes
  useEffect(() => {
    const total = addProducts?.reduce(
      (prev, next) => prev + parseFloat(next.grand_total || 0),
      0
    );
    setSubTotal(total);
    const discounted = total - (total * discount_amount) / 100;
    setGrandTotal(discounted);
    setDueAmount(discounted);
    setReceivedAmount(0);
  }, [addProducts, discount_amount, grand_total]);

  // set payment amount in received amount and calculate due amount
  useEffect(() => {
    setReceivedAmount(parseFloat(pay_amount));
    setDueAmount(parseFloat(grand_total) - parseFloat(pay_amount));
  }, [grand_total, pay_amount]);

  // submit order
  const handleDataPost = async (data) => {
    if (addProducts?.length === 0) {
      return toast.error("Please add at least one product", {
        autoClose: 1000,
      });
    }
    setLoading(true);
    try {
      if (addProducts?.length === 0) {
        setLoading(true);
        return toast.error("Please add at least one product", {
          autoClose: 1000,
        });
      }
      const sendData = {
        order_publisher_id: user?._id,
        order_status: "management",
        customer_id: customer_id,
        customer_phone: customerInfo?.customer_phone,
        order_products: addProducts?.map((item) => ({
          product_id: item?._id,
          product_buying_price: item?.product_buying_price || 0,
          product_price: item?.product_price,
          product_quantity: item?.purchase_quantity,
          total_amount: parseFloat(item?.total_amount.toFixed(2)),
          discount_percent: item?.discount_percent || 0,
          grand_total: parseFloat(item?.grand_total.toFixed(2)),
          total_measurement: parseInt(item?.total_measurement),
          product_unit_name: item?.product_unit_id?.product_unit_name,
        })),
        sub_total_amount: parseFloat(sub_total.toFixed(2)),
        discount_percent_amount: parseFloat(discount_amount).toFixed(2) || 0,
        grand_total_amount: parseFloat(grand_total.toFixed(2)),
        received_amount: 0,
        due_amount: parseFloat(grand_total.toFixed(2)),
        // received_amount: parseFloat(received_amount.toFixed(2)),
        // due_amount: parseFloat(due_amount.toFixed(2)),
        order_note: order_note,
        payment_type: payment_type,
        total_measurement_count: addProducts?.reduce(
          (prev, next) => prev + parseInt(next?.total_measurement || 0),
          0
        ),
      };
      if (payment_type !== "due-payment") {
        sendData.payment_method = payment_method;
        sendData.pay_amount = pay_amount;
        if (payment_method === "check") {
          sendData.bank_id = bank_id;
          sendData.check_number = data?.check_number;
          sendData.check_withdraw_date = data?.check_withdraw_date;
        }
      }
      const response = await fetch(`${BASE_URL}/order?role_type=order_create`, {
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
          result?.message ? result?.message : "order created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
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

  if (customerLoading || bankLoading || unitLoading) {
    return <LoaderOverlay />;
  }

  // customer search
  const customFilter = (option, inputValue) => {
    const customerNameMatch = option?.data?.customer_name
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    const customerPhoneMatch = option?.data?.customer_phone
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    return customerNameMatch || customerPhoneMatch;
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleDataPost)}>
        <div className="grid gap-4">
          {/* customer add and select */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block  font-medium text-gray-700 mb-1 ">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setCustomerAddModal(true)}
                type="button"
                className="btn bg-primary rounded px-2.5 py-0.5 text-white flex items-center mb-1 gap-x-1"
              >
                <IoMdAddCircleOutline size={18} />
                ADD
              </button>
            </div>
            <Select
              id="customer_id"
              name="customer_id"
              aria-label="customer Name"
              isClearable
              required
              options={customerTypes?.data}
              getOptionLabel={(x) => `${x.customer_name} (${x.customer_phone})`}
              getOptionValue={(x) => x._id}
              onChange={(selectedOption) => {
                setCustomer_id(selectedOption?._id);
                setCustomerInfo(selectedOption);
              }}
              filterOption={customFilter} // Custom filtering by name and phone
              placeholder="Search by name or phone"
              noOptionsMessage={() => "No customers found"}
            />
          </div>

          {/* customer information */}
          {customerInfo?.customer_name && (
            <div className="mt-5 overflow-x-auto rounded shadow-md">
              <table className="min-w-full  bg-white text-sm">
                <thead>
                  <tr className=" font-semibold text-center ">
                    <th className="divide-x divide-gray-300  font-semibold text-center py-2 px-1">
                      Name
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center  py-2 px-1">
                      Phone
                    </th>
                    {/* <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Account Balance
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-900 text-center">
                      {customerInfo?.customer_name}
                    </td>
                    <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-900 text-center">
                      {customerInfo?.customer_phone}
                    </td>
                    {/* <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                      {customerInfo?.customer_wallet > 0 ? (
                        <span className="text-green-500">
                          {customerInfo?.customer_wallet}
                        </span>
                      ) : (
                        <span className="text-red-500">
                          {customerInfo?.customer_wallet}
                        </span>
                      )}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {addProducts?.length > 0 && (
            <>
              {/* product information */}
              <p className="font-semibold  text-gray-700  mt-2 text-xl">
                Product Information :
              </p>
              <div className="overflow-x-auto rounded shadow-md">
                <table className="min-w-full rounded">
                  <thead className="">
                    <tr className=" font-semibold text-center ">
                      <th className=" font-semibold text-center  py-2 px-3">
                        ID
                      </th>
                      {/* <th className="  font-semibold text-center  py-2 px-3">
                        Name
                      </th> */}
                      <th className="  font-semibold text-center  py-2 px-3">
                        Price
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Quantity
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Unit
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Measurement
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Total
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Discount (%)
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Grand Total
                      </th>
                      <th className="  font-semibold text-center  py-2 px-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addProducts?.length > 0 &&
                      addProducts?.map((product, index) => (
                        <tr
                          key={index}
                          className={`text-center ${
                            index % 2 === 0
                              ? "bg-secondary-50"
                              : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 text-center  px-3">
                            {product?.product_id}
                          </td>
                          {/* <td className="whitespace-nowrap font-medium text-gray-700 text-center  px-3">
                            {product?.product_name}
                          </td> */}
                          <td className="whitespace-nowrap py-1.5 font-medium text-blue-600 text-center  px-3">
                            {product?.product_price}
                          </td>
                          <td className="text-center p-2  px-3">
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => {
                                  setAddProducts((prev) =>
                                    prev.map((item) =>
                                      item._id === product._id
                                        ? {
                                            ...item,
                                            purchase_quantity:
                                              item?.purchase_quantity > 1
                                                ? item?.purchase_quantity - 1
                                                : item?.purchase_quantity,
                                            total_amount:
                                              item?.purchase_quantity > 1
                                                ? item?.total_amount -
                                                  product?.product_price
                                                : item?.total_amount,
                                            grand_total:
                                              item?.purchase_quantity > 1
                                                ? item?.total_amount -
                                                  product?.product_price -
                                                  ((item?.total_amount -
                                                    product?.product_price) *
                                                    item?.discount_percent) /
                                                    100
                                                : item?.grand_total,
                                            total_measurement:
                                              item?.purchase_quantity > 1
                                                ? (product?.purchase_quantity -
                                                    1) *
                                                  product?.product_unit_id
                                                    ?.product_unit_value
                                                : item?.total_measurement,
                                          }
                                        : item
                                    )
                                  );
                                }}
                                type="button"
                                className="cursor-pointer text-red-500 hover:text-red-300"
                              >
                                <IoRemoveCircle size={28} className="mr-2" />
                              </button>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  if (!isNaN(newQuantity)) {
                                    setAddProducts((prev) =>
                                      prev.map((item) =>
                                        item._id === product._id
                                          ? {
                                              ...item,
                                              purchase_quantity:
                                                newQuantity <
                                                product?.product_quantity
                                                  ? newQuantity
                                                  : product?.product_quantity,
                                              total_amount:
                                                newQuantity <
                                                product?.product_quantity
                                                  ? newQuantity *
                                                    product?.product_price
                                                  : product?.product_quantity *
                                                    product?.product_price,
                                              grand_total:
                                                newQuantity <
                                                product?.product_quantity
                                                  ? newQuantity *
                                                      product?.product_price -
                                                    (newQuantity *
                                                      product?.product_price *
                                                      item?.discount_percent) /
                                                      100
                                                  : product?.product_quantity *
                                                      product?.product_price -
                                                    (product?.product_quantity *
                                                      product?.product_price *
                                                      item?.discount_percent) /
                                                      100,
                                              total_measurement:
                                                newQuantity <
                                                product?.product_quantity
                                                  ? newQuantity *
                                                    product?.product_unit_id
                                                      ?.product_unit_value
                                                  : item?.total_measurement,
                                            }
                                          : item
                                      )
                                    );
                                  }
                                }}
                                value={product?.purchase_quantity}
                                className="rounded-md  shadow-sm sm:text-sm p-1 w-16 text-center"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setAddProducts((prev) =>
                                    prev.map((item) =>
                                      item._id === product._id
                                        ? {
                                            ...item,
                                            purchase_quantity:
                                              item?.purchase_quantity <
                                              product?.product_quantity
                                                ? item?.purchase_quantity + 1
                                                : item?.purchase_quantity,
                                            total_amount:
                                              item?.purchase_quantity <
                                              product?.product_quantity
                                                ? item?.total_amount +
                                                  product?.product_price
                                                : item?.total_amount,
                                            grand_total:
                                              item?.purchase_quantity <
                                              product?.product_quantity
                                                ? item?.total_amount +
                                                  product?.product_price -
                                                  ((item?.total_amount +
                                                    product?.product_price) *
                                                    item?.discount_percent) /
                                                    100
                                                : item?.grand_total,
                                            total_measurement:
                                              item?.purchase_quantity <
                                              product?.product_quantity
                                                ? (product?.purchase_quantity +
                                                    1) *
                                                  product?.product_unit_id
                                                    ?.product_unit_value
                                                : item?.total_measurement,
                                          }
                                        : item
                                    )
                                  );
                                }}
                                className="cursor-pointer text-green-500 hover:text-green-300"
                              >
                                <IoAddCircle size={30} className="ml-2" />
                              </button>
                            </div>
                          </td>
                          <td className="whitespace-nowrap font-medium text-gray-700 text-center px-3">
                            <Select
                              id="product_unit_name"
                              name="product_unit_name"
                              required
                              isClearable
                              aria-label="Unit Name"
                              options={unitTypes?.data}
                              getOptionLabel={(x) => x?.product_unit_name}
                              getOptionValue={(x) => x?._id}
                              onChange={(selectedOption) => {
                                console.log(selectedOption);
                                console.log(product);
                                setAddProducts((prev) =>
                                  prev.map((item) =>
                                    item?._id === product?._id
                                      ? {
                                          ...item,
                                          total_measurement:
                                            product?.purchase_quantity *
                                            selectedOption?.product_unit_value,
                                          product_unit_id: selectedOption,
                                        }
                                      : item
                                  )
                                );
                              }}
                            />
                            {/* measurement */}
                          </td>
                          <td className="whitespace-nowrap font-medium text-gray-700 text-center  px-3">
                            {product?.purchase_quantity}{" "}
                            {product?.product_unit_id?.product_unit_name}
                            {"="}
                            {product?.total_measurement}{" "}
                            {settingData?.unit_name}
                          </td>
                          <td className="whitespace-nowrap font-medium text-green-600 text-center  px-3">
                            {product?.total_amount}
                          </td>
                          <td className="whitespace-nowrap font-medium text-purple text-center  px-3">
                            <input
                              value={product?.discount_percent} // Bind input to state
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);

                                if (
                                  !isNaN(value) &&
                                  value >= 0 &&
                                  value <= 99.99
                                ) {
                                  setProductDiscount(value); // Update state only for valid input
                                  setProductDiscountIDInfo(product);
                                } else if (value > 99.99) {
                                  setProductDiscount(99.99); // Update state only for valid input
                                  setProductDiscountIDInfo(product);
                                }
                              }}
                              onBlur={(e) => {
                                const value = parseFloat(e.target.value);

                                // Reset the value if it exceeds the limit
                                if (isNaN(value) || value > 99.99) {
                                  setProductDiscount(99.99); // Reset to max allowed value
                                  setProductDiscountIDInfo(product);
                                }
                              }}
                              type="number"
                              placeholder="Discount On SubTotal"
                              className="rounded-md -gray-200 shadow-sm sm:text-sm p-1 -2 w-16 text-center px-3"
                            />
                          </td>
                          <td className="whitespace-nowrap font-medium text-green-600 text-center  px-3">
                            {product?.grand_total.toFixed(2)}
                          </td>
                          <td className=" p-4">
                            <div className="flex items-center justify-center">
                              <MdDeleteForever
                                onClick={() => {
                                  const filteredProduct = addProducts.filter(
                                    (item) => item?._id !== product?._id
                                  );
                                  setAddProducts(filteredProduct);
                                }}
                                className="cursor-pointer text-red-500 hover:text-red-300"
                                size={25}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <hr />

          {addProducts?.length && (
            <>
              <div className="grid grid-cols-2 gap-y-4 gap-x-1 sm:gap-x-2">
                <h5>Sub Total </h5>
                <p className="font-bold">
                  <span>
                    {" "}
                    :{" "}
                    <span className=" text-green-600">
                      {sub_total.toFixed(2)}
                    </span>{" "}
                  </span>
                </p>
                <h5 className="">
                  Discount percent{" "}
                  <small className="text-purple">(max 99)</small>
                </h5>
                <p className="">
                  <input
                    value={discount_amount} // Bind input to state
                    onChange={(e) => {
                      const value = parseFloat(e.target.value); // Use parseFloat for decimal values

                      if (!isNaN(value) && value >= 0 && value <= 99.99) {
                        setDiscountInputAmount(value); // Update state only for valid input
                      } else if (value > 99.99) {
                        setDiscountInputAmount(99.99); // Reset to max allowed value
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value); // Use parseFloat for decimal values

                      // Reset the value if it exceeds the limit
                      if (isNaN(value) || value > 99.99) {
                        setDiscountInputAmount(99.99); // Reset to max allowed value
                      }
                    }}
                    min={0} // Allow decimal values with minimum 0.01
                    step="0.01" // Ensure step supports decimal precision
                    type="number"
                    placeholder="Discount On SubTotal"
                    className=" rounded-md p-1 text-purple"
                  />
                </p>
                <h5 className="">Grand Total</h5>
                <p className=" font-bold">
                  <span>
                    {" "}
                    :{" "}
                    <span className="mr-2 text-green-600">
                      {grand_total.toFixed(2)}
                    </span>{" "}
                  </span>
                </p>
                <h5 className="">Select Payment Option</h5>
                <div className="">
                  <Select
                    id="payment_type"
                    name="payment_type"
                    aria-label="Payment Type"
                    isClearable
                    required
                    options={paymentOption}
                    getOptionLabel={(x) => x?.payment_type}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      if (selectedOption?.payment_value == "full-payment") {
                        setPayAmount(grand_total.toFixed(2));
                        setReceivedAmount(grand_total);
                        setDueAmount(0);
                      } else if (
                        selectedOption?.payment_value == "due-payment"
                      ) {
                        setReceivedAmount(0);
                        setDueAmount(grand_total);
                        setPayAmount(0);
                      } else {
                        setReceivedAmount(0);
                        setDueAmount(0);
                        setPayAmount(0);
                      }
                      setPaymentType(selectedOption?.payment_value);
                      setPaymentBy("");
                    }}
                  />
                </div>
                {(payment_type == "full-payment" ||
                  payment_type == "partial-payment") && (
                  <h5 className="">Payment Method</h5>
                )}
                {/* {payment_type !== "due-payment" select paymrnt method */}
                {(payment_type == "full-payment" ||
                  payment_type == "partial-payment") && (
                  <div className="">
                    <Select
                      id="payment_method"
                      name="payment_method"
                      aria-label="Payment By"
                      required
                      isClearable
                      options={partialPaymentOption}
                      getOptionLabel={(x) => x?.label}
                      getOptionValue={(x) => x?.value}
                      onChange={(selectedOption) => {
                        setPaymentBy(selectedOption?.value);
                      }}
                    />
                  </div>
                )}
                {payment_type == "partial-payment" && (
                  <h5 className="">Pay Amount</h5>
                )}
                {payment_type == "partial-payment" && (
                  <div>
                    <input
                      value={pay_amount} // Bind input to state
                      onChange={(e) => {
                        const value = parseFloat(e.target.value); // Use parseFloat for decimal values

                        if (
                          !isNaN(value) &&
                          value > 0 &&
                          value <= parseFloat(grand_total.toFixed(2))
                        ) {
                          setPayAmount(value); // Update state only for valid input
                        } else if (value > parseFloat(grand_total.toFixed(2))) {
                          setPayAmount(parseFloat(grand_total.toFixed(2))); // Limit to grand_total
                        }
                      }}
                      onBlur={(e) => {
                        const value = parseFloat(e.target.value); // Use parseFloat for decimal values

                        // Reset the value if it exceeds the limit or is invalid
                        if (
                          isNaN(value) ||
                          value > parseFloat(grand_total.toFixed(2))
                        ) {
                          setPayAmount(parseFloat(grand_total.toFixed(2))); // Reset to max allowed value
                        } else if (value <= 0) {
                          setPayAmount(""); // Clear if the value is invalid
                        }
                      }}
                      type="number"
                      min={0.01} // Allow decimal values with minimum 0.01
                      step="0.01" // Ensure step supports decimal precision
                      placeholder="Pay Amount"
                      className=" w-full rounded-md -gray-200 shadow-sm sm:text-sm p-2 -2"
                    />
                    {errors?.pay_amount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.pay_amount?.message}
                      </p>
                    )}
                  </div>
                )}

                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <h5 className="">Payment Bank Name</h5>
                  )}
                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <div className="">
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

                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <h5 className="">Check Number</h5>
                  )}
                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <div className="">
                      <input
                        {...register("check_number", {
                          required: "Check Number is required",
                        })}
                        type="text"
                        placeholder="Check Number"
                        className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />

                      {errors?.check_number && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors?.check_number?.message}
                        </p>
                      )}
                    </div>
                  )}

                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <h5 className="">Check Issue Date</h5>
                  )}

                {payment_type !== "due-payment" &&
                  payment_method === "check" && (
                    <div className="">
                      <input
                        {...register("check_withdraw_date", {
                          required: "Check Issue Date is required",
                        })}
                        type="date"
                        min={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
                        placeholder="Check Issue Date"
                        className=" w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                      />

                      {errors?.check_withdraw_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors?.check_withdraw_date?.message}
                        </p>
                      )}
                    </div>
                  )}
                <h5 className="">Received Amount</h5>
                <p className="font-bold">
                  <span className="">: </span>
                  <span className="text-blue-600">
                    {received_amount.toFixed(2)}
                  </span>
                </p>
                <h5 className="">Due Amount</h5>
                <p className="font-bold">
                  <span className="">: </span>
                  <span className="text-red-600">{due_amount.toFixed(2)}</span>
                </p>
              </div>
            </>
          )}

          <textarea
            placeholder="Note"
            className="border rounded-md p-2"
            onChange={(e) => setOrderNote(e.target.value)}
          ></textarea>

          {loading == true ? (
            <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
              <MiniSpinner />
            </div>
          ) : (
            <Button type="submit">Create</Button>
          )}
        </div>
      </form>
      {/* add new customer modal */}
      {customerAddModal && (
        <AddCustomer
          setCustomerAddModal={setCustomerAddModal}
          user={user}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default RightSide;
