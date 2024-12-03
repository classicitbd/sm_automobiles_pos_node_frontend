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

const RightSide = ({ user, addProducts, setAddProducts }) => {

  const [loading, setLoading] = useState(false);
  const [customerAddModal, setCustomerAddModal] = useState(false); //customer add modal
  const [customerInfo, setCustomerInfo] = useState({});

  // set all data in state
  const [customer_id, setCustomer_id] = useState("");
  const [sub_total, setSubTotal] = useState(0);
  const [discount_amount, setDiscountInputAmount] = useState(0);
  const [grand_total, setGrandTotal] = useState(0);
  const [order_note, setOrderNote] = useState("");

  //get bank data
  const { data: bankTypes, isLoading: bankLoading } = useGetBank();

  //Fetch Customer Data
  const {
    data: customerTypes = [],
    isLoading: customerLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/customer`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer`, {
          credentials: "include",
        });

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
      (prev, next) => prev + parseInt(next.total_amount || 0),
      0
    );
    setSubTotal(total);
    const discounted = total - (total * discount_amount) / 100;
    setGrandTotal(discounted);
  }, [addProducts, discount_amount, grand_total]);

  // submit order
  const HandleSubmitOrder = async () => {
    // setLoading(true);
    try {
      if (!customer_id) {
        setLoading(false);
        return toast.error("Please fill up customer name", {
          autoClose: 1000,
        });
      }
      if (addProducts?.length === 0) {
        setLoading(false);
        return toast.error("Please add at least one product", {
          autoClose: 1000,
        });
      }
      if (!sub_total) {
        setLoading(false);
        return toast.error("Must need at least one product", {
          autoClose: 1000,
        });
      }
      if (!grand_total) {
        setLoading(false);
        return toast.error("Must need at least one product", {
          autoClose: 1000,
        });
      }
      const sendData = {
        order_publisher_id: user?._id,
        order_status: "pending",
        customer_id: customer_id,
        customer_previous_due: customerInfo?.previous_due || 0,
        customer_previous_advance: customerInfo?.previous_advance || 0,
        sub_total_amount: sub_total,
        discount_percent_amount: discount_amount || 0,
        grand_total_amount: grand_total,
        order_note: order_note,
        order_products: addProducts?.map((item) => ({
          product_id: item?._id,
          product_quantity: item?.purchase_quantity,
          product_price: item?.product_price,
          product_buying_price: item?.product_buying_price || 0,
          product_total_price: item?.total_amount,
        })),
      };
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

  if (customerLoading || bankLoading) {
    return <LoaderOverlay />;
  }

  return (
    <>
      <div className="grid gap-4">
        {/* customer add and select */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <button
              onClick={() => setCustomerAddModal(true)}
              type="button"
              className="btn bg-primary rounded px-2 py-1 text-white"
            >
              + Add
            </button>
          </div>
          <Select
            id="customer_id"
            name="customer_id"
            aria-label="Customer Name"
            isClearable
            options={customerTypes?.data}
            getOptionLabel={(x) => x?.customer_name}
            getOptionValue={(x) => x?._id}
            onChange={(selectedOption) => {
              setCustomer_id(selectedOption?._id);
              setCustomerInfo(selectedOption);
            }}
          />
        </div>

        {/* customer information */}
        {customerInfo?.customer_name && (
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
              <thead className=" bg-[#fff9ee] ">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                  <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                    Name
                  </th>
                  <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                    Phone
                  </th>
                  <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                    Due
                  </th>
                  <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                    Advance
                  </th>
                  <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                    {customerInfo?.customer_name}
                  </td>
                  <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                    {customerInfo?.customer_phone}
                  </td>
                  <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                    {customerInfo?.previous_due
                      ? customerInfo?.previous_due
                      : 0}
                  </td>
                  <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                    {customerInfo?.previous_advance
                      ? customerInfo?.previous_advance
                      : 0}
                  </td>
                  <td className="whitespace-nowrap py-3 px-2 font-medium text-gray-700 text-center border">
                    {customerInfo?.first_payment_status == "active"
                      ? "Paid"
                      : "Unpaid"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {addProducts?.length > 0 && (
          <>
            {/* product information */}
            <p className="font-semibold underline text-gray-700 mb-1 mt-2 text-center">
              Product Information:
            </p>
            <div className="mt-5 overflow-x-auto rounded">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
                <thead className=" bg-[#fff9ee] ">
                  <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Image
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Name
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Price
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Quantity
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Total
                    </th>
                    <th className="divide-x divide-gray-300  font-semibold text-center text-gray-900 py-2 px-1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {addProducts?.length > 0 &&
                    addProducts?.map((product, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap font-medium text-gray-700 border">
                          <div className=" flex items-center justify-center">
                            <img
                              src={product?.product_image}
                              alt=""
                              className="w-20"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 text-center border">
                          {product?.product_name}
                        </td>
                        <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 text-center border">
                          {product?.product_price}
                        </td>
                        <td className="text-center p-2 border">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                setAddProducts((prev) =>
                                  prev.map((item) =>
                                    item._id === product._id
                                      ? {
                                          ...item,
                                          purchase_quantity:
                                            item.purchase_quantity > 1
                                              ? item.purchase_quantity - 1
                                              : item.purchase_quantity,
                                          total_amount:
                                            item.purchase_quantity > 1
                                              ? item.total_amount -
                                                product?.product_price
                                              : item.total_amount,
                                        }
                                      : item
                                  )
                                );
                              }}
                              type="button"
                              className="cursor-pointer text-red-500 hover:text-red-300"
                            >
                              <IoRemoveCircle size={28} />
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
                                          }
                                        : item
                                    )
                                  );
                                }
                              }}
                              value={product?.purchase_quantity}
                              className="rounded-md border-gray-200 shadow-sm sm:text-sm p-1 border-2 w-16 text-center"
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
                                            item.purchase_quantity <
                                            product?.product_quantity
                                              ? item.purchase_quantity + 1
                                              : item.purchase_quantity,
                                          total_amount:
                                            item.purchase_quantity <
                                            product?.product_quantity
                                              ? item.total_amount +
                                                product?.product_price
                                              : item.total_amount,
                                        }
                                      : item
                                  )
                                );
                              }}
                              className="cursor-pointer text-green-500 hover:text-green-300"
                            >
                              <IoAddCircle size={30} />
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap font-medium text-gray-700 text-center border">
                          {product?.total_amount}
                        </td>
                        <td className="border p-4">
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
            <div className="flex justify-between">
              <div>
                <h5>Sub Total</h5>
                <h5 className="mt-4">
                  Discount percent <small>(max 99)</small>
                </h5>
                <h5 className="mt-4">Grand Total</h5>
              </div>
              <div>
                <p className="font-bold">
                  <span className="mr-2">: </span>
                  {sub_total}
                </p>
                <p className="mt-4">
                  <span className="mr-2 font-bold">: </span>
                  <input
                    value={discount_amount} // Bind input to state
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);

                      if (!isNaN(value) && value >= 0 && value <= 99) {
                        setDiscountInputAmount(value); // Update state only for valid input
                      } else if (value > 99) {
                        toast.error("Must be less than 100", {
                          autoClose: 100,
                        });
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value, 10);

                      // Reset the value if it exceeds the limit
                      if (isNaN(value) || value > 99) {
                        setDiscountInputAmount(99); // Reset to max allowed value
                      }
                    }}
                    type="number"
                    placeholder="Discount On SubTotal"
                    className="border rounded-md p-1"
                  />
                </p>
                <p className="mt-4 font-bold">
                  <span className="mr-2">: </span>
                  {grand_total.toFixed(2)}
                </p>
              </div>
            </div>
          </>
        )}

        <textarea
          placeholder="Note"
          className="border rounded-md p-2"
          onChange={(e) => setOrderNote(e.target.value)}
        ></textarea>

        {loading == true ? (
          <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
            <MiniSpinner />
          </div>
        ) : (
          <Button type="btn" onClick={() => HandleSubmitOrder()}>
            Create
          </Button>
        )}
      </div>
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
