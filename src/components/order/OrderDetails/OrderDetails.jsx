
import {Link, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import { useContext, useEffect, useState } from "react";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { SettingContext } from "@/context/SettingProvider";
import { AuthContext } from "@/context/AuthProvider";
import Pagination from "@/components/common/pagination/Pagination";
import useDebounced from "@/hooks/useDebounced";

const OrderDetails = () => {
  const { _id } = useParams();
  const [activeNavButton, setActiveNavButton] = useState("order");
   const [serialNumber, setSerialNumber] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useContext(AuthContext);
    const { settingData } = useContext(SettingContext);

  const handleNavButtonClick = (buttonName) => {
    setActiveNavButton(buttonName);
    sessionStorage.setItem("activeTab", buttonName);
  };
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = sessionStorage.getItem("activeTab");
    if (saveDropDown) {
      setActiveNavButton(saveDropDown);
    }
  }, []);

  //Fetch OrderDetails Data
  const { data: orderDetail = {}, isLoading } = useQuery({
    queryKey: [`/api/v1/order/${_id}?role_type=order_details_show`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/order/${_id}?role_type=order_details_show`,
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
        return data?.data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  // .....Paymet View Start....//

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  const check_publisher_id = user?.check_publisher_id
    ? user?.check_publisher_id
    : user?._id;

  //Fetch Customer Data
  const {
    data: allEmployelist = [],
    isLoading:allPaymetViewLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/check/find_user_publish_check?check_publisher_id=${check_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/check/find_user_publish_check?check_publisher_id=${check_publisher_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
  // .....Paymet View End....//

  if (isLoading) {
    return <TableLoadingSkeleton />;
  }

  console.log(orderDetail);

  return (
    <div className="">
      <section className=" py-4">
        <div className="mt-6">
          <button
            className={`mr-3 border-2 border-green-600 px-8 py-2 hover:bg-success-400 font-bold  hover:text-white text-lg rounded shadow-xl transition-all duration-300  ${
              activeNavButton == "order"
                ? "bg-success-400 text-white"
                : "text-success-400"
            }`}
            onClick={() => handleNavButtonClick("order")}
          >
            Order View
          </button>

          <button
            className={`mr-3 border-2 border-purple px-8 py-2 hover:bg-purple font-bold  hover:text-white text-lg rounded shadow-xl transition-all duration-300 ${
              activeNavButton == "payment"
                ? "bg-purple text-white"
                : "text-purple"
            }`}
            onClick={() => handleNavButtonClick("payment")}
          >
            Payment View
          </button>
        </div>
        <hr className="my-3" />

        <div className="">
          {/* Order View */}

          {activeNavButton == "order" && (
            <div>
              <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
                <div className="font-bold">
                  <p className="sm:text-[20px] text-bgray-700">
                    Customer Name :{" "}
                    <span className="sm:text-[20px]">
                      {" "}
                      {orderDetail?.customer_id?.customer_name}
                    </span>
                  </p>
                  <p className="sm:text-[20px] text-bgray-700">
                    Customer Phone :{" "}
                    <span className="sm:text-[20px]">
                      {orderDetail?.customer_id?.customer_phone}
                    </span>
                  </p>
                  <p className="sm:text-[20px] text-bgray-700">
                    Order Date :{" "}
                    <span className="sm:text-[20px]">
                      {DateTimeFormat(orderDetail?.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="font-bold text-bgray-700">
                  <p className="sm:text-[20px] text-bgray-700">
                    Address : {orderDetail?.customer_id?.customer_address}
                  </p>
                  <p className="sm:text-[20px] text-bgray-700">
                    Order No :{" "}
                    <span className="sm:text-[20px]">
                      {" "}
                      {orderDetail?.order_id}
                    </span>
                  </p>
                  <p className="sm:text-[20px] text-bgray-700">
                    Grand Total :{" "}
                    <span className="sm:text-[20px] text-green-600">
                      {orderDetail?.grand_total_amount}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[20px] font-bold uppercase my-2">
                  Order List Table
                </p>
              </div>
              {orderDetail?.order_products?.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg mt-3">
                  <table className="min-w-full  text-sm">
                    <thead>
                      <tr className="font-semibold text-center">
                        <td className="whitespace-nowrap p-4 ">SL No</td>

                        <td className="whitespace-nowrap p-4 ">Product Name</td>
                        <td className="whitespace-nowrap p-4 ">Unit Price</td>
                        <td className="whitespace-nowrap p-4 ">Quantity</td>

                        <td className="whitespace-nowrap p-4 ">Sub Total</td>
                        <td className="whitespace-nowrap p-4 ">Discount(%)</td>
                        <td className="whitespace-nowrap p-4 ">Total Amount</td>
                      </tr>
                    </thead>

                    <tbody>
                      {orderDetail?.order_products?.map((product, i) => (
                        <tr
                          key={product?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {i + 1}
                          </td>

                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {product?.product_id?.product_name}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-blue-600">
                            {product?.product_price}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-green-600 uppercase">
                            {product?.product_quantity ? (
                              <>
                                {" "}
                                {product?.product_quantity}{" "}
                                {
                                  product?.product_id?.product_unit_id
                                    ?.product_unit_name
                                }
                              </>
                            ) : (
                              "--"
                            )}
                          </td>

                          <td className="whitespace-nowrap py-2.5 font-medium text-green-700">
                            {product?.total_amount}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-purple">
                            {product?.discount_percent} %
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                            {product?.grand_total}
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
          )}

          {/*  */}
          {activeNavButton == "payment" && (
            <>
              <div className="flex justify-between mt-6">
                <div>
                  <h1 className="text-2xl">Employe Payment View</h1>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    defaultValue={searchTerm}
                    onChange={(e) => handleSearchValue(e.target.value)}
                    placeholder="Search Customers..."
                    className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
              <>
                {allPaymetViewLoading === true ? (
                  <TableLoadingSkeleton />
                ) : (
                  <div>
                    <div className="rounded-lg shadow-md mt-6">
                      {allEmployelist?.data?.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="font-semibold text-center">
                                <td className="whitespace-nowrap p-4 ">
                                  SL No
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Invice No
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Customer Name
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Customer Phone
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Bank Name
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Payment Method
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Check No
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Withdraw Date
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Status
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Total Messurement
                                </td>

                                <td className="whitespace-nowrap p-4 ">
                                  Total Amount
                                </td>
                                <td className="whitespace-nowrap p-4 ">
                                  Pay Amount
                                </td>
                              </tr>
                            </thead>

                            <tbody>
                              {allEmployelist?.data?.map((employe, i) => (
                                <tr
                                  key={employe?._id}
                                  className={`text-center ${
                                    i % 2 === 0
                                      ? "bg-secondary-50"
                                      : "bg-secondary-100"
                                  } hover:bg-blue-100`}
                                >
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {serialNumber + i + 1}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    <Link>
                                      <span className="text-blue-600 underline">
                                        {" "}
                                        {employe?.invoice_number}
                                      </span>
                                    </Link>
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.customer_id?.customer_name}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.customer_phone}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-blue-600">
                                    {employe?.bank_id?.bank_name
                                      ? employe?.bank_id?.bank_name
                                      : "--"}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.payment_method === "cash" ? (
                                      <span className="text-secondary-default">
                                        {employe?.payment_method}
                                      </span>
                                    ) : (
                                      <span className="text-purple">
                                        {employe?.payment_method}
                                      </span>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.check_number
                                      ? employe?.check_number
                                      : "--"}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.check_withdraw_date
                                      ? employe?.check_withdraw_date
                                      : "--"}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700 capitalize">
                                    {employe?.check_status === "approved" ? (
                                      <span className="text-green-600">
                                        {employe?.check_status}
                                      </span>
                                    ) : (
                                      <span className="text-red-600">
                                        {employe?.check_status}
                                      </span>
                                    )}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-green-600">
                                    {employe?.order_id
                                      ?.total_messurement_count ? (
                                      <>
                                        {" "}
                                        {
                                          employe?.order_id
                                            ?.total_messurement_count
                                        }{" "}
                                        {settingData?.unit_name}
                                      </>
                                    ) : (
                                      "--"
                                    )}
                                  </td>

                                  <td className="whitespace-nowrap py-3 font-medium text-green-600">
                                    {employe?.order_id?.grand_total_amount}
                                  </td>
                                  <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                                    {employe?.pay_amount ===
                                    employe?.order_id?.grand_total_amount ? (
                                      <span className="text-green-600">
                                        {employe?.pay_amount}
                                      </span>
                                    ) : employe?.pay_amount >
                                      employe?.order_id?.grand_total_amount ? (
                                      <span className="text-blue-600">
                                        {employe?.pay_amount}
                                      </span>
                                    ) : (
                                      <span className="text-yellow-600">
                                        {employe?.pay_amount}
                                      </span>
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
                  </div>
                )}
                <Pagination
                  setPage={setPage}
                  setLimit={setLimit}
                  totalData={allEmployelist?.totalData}
                  page={page}
                  limit={limit}
                />
              </>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
