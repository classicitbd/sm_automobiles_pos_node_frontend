import { SettingContext } from "@/context/SettingProvider";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import useGetSelfOrder from "@/hooks/useGetAllSelfOrder";
import useGetAUserDetails from "@/hooks/useGetAUserDetails";
import Pagination from "../common/pagination/Pagination";
//import OrderChart from "./OrderChart";
//import SaleChart from "./SaleChart";

const StaffPerfomance = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [orderLimit, setOrderLimit] = useState(10);
  const [ordePage, setOrdePage] = useState(1);
  const { user_id } = useParams();
  const { settingData } = useContext(SettingContext);
  const [activeNavButton, setActiveNavButton] = useState("order");

  //-----------//

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //------Order Seril-----//

  const [orderSerialNumber, setOrderSerialNumber] = useState();

  useEffect(() => {
    const newOrderSerialNumber = (ordePage - 1) * orderLimit;
    setOrderSerialNumber(newOrderSerialNumber);
  }, [ordePage, orderLimit]);

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

  //Fetch SaleTarget Data
  const { data: saleTargetData = [], isLoading } = useQuery({
    queryKey: [`/api/v1/sale_target/${user_id}?page=${page}&limit=${limit}`],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target/${user_id}?page=${page}&limit=${limit}`,
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

  //get order data
  const { data: orderData = [], isLoading: orderLoading } = useGetSelfOrder(
    user_id,
    orderLimit,
    ordePage
  );

  //get user data
  const { data: userData = {}, isLoading: userLoading } =
    useGetAUserDetails(user_id);

  if (isLoading || orderLoading || userLoading) return <LoaderOverlay />;

  return (
    <div className="mb-4 max-w-7xl mx-auto">
      <>
        <div className="mt-4">
          <h3 className="sm:text-[26px] sm:font-medium text-gray-800 ">
            STAFF PERFORMANCE REPORT
          </h3>
        </div>

        <>
          <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
            <div className="font-bold">
              <p className="sm:text-[20px] text-bgray-700">
                User Name : {userData?.data?.user_name}
              </p>
              <p className="sm:text-[20px] text-bgray-700">
                User Phone : {userData?.data?.user_phone}
              </p>
            </div>
            <div className="font-bold text-bgray-700">
              <p className="sm:text-[20px] text-bgray-700">
                User Address : {userData?.data?.user_address}
              </p>
              <p className="sm:text-[20px] text-bgray-700">
                User Status :{" "}
                {userData?.data?.user_status == "active" ? (
                  <span className="text-green-600 sm:text-[20px] font-bold">
                    {" "}
                    Active{" "}
                  </span>
                ) : (
                  <span className="text-red-600 sm:text-[20px] font-bold">
                    {" "}
                    In-Active{" "}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              className={`mr-3 border-2 border-green-600 px-8 py-2 hover:bg-success-400 font-bold  hover:text-white text-lg rounded shadow-xl transition-all duration-300  ${
                activeNavButton == "order"
                  ? "bg-success-400 text-white"
                  : "text-success-400"
              }`}
              onClick={() => handleNavButtonClick("order")}
            >
              Order List
            </button>

            <button
              className={`mr-3 border-2 border-purple px-8 py-2 hover:bg-purple font-bold  hover:text-white text-lg rounded shadow-xl transition-all duration-300 ${
                activeNavButton == "sale"
                  ? "bg-purple text-white"
                  : "text-purple"
              }`}
              onClick={() => handleNavButtonClick("sale")}
            >
              Sale Target
            </button>
          </div>
          <hr className="my-3" />

          <div className="">
            {/* OrderList */}

            {activeNavButton == "order" && (
              <div className="">
                {/* <p className="text-[20px] font-bold uppercase my-2">
                  Order List Chart
                </p>
                <div className="bg-gray-50  p-5 shadow-md ">
                  <OrderChart />
                </div> */}
                <div className="mt-6">
                  <p className="text-[20px] font-bold uppercase my-2">
                    Order List Table
                  </p>
                </div>
                {orderData?.data?.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full  text-sm">
                      <thead>
                        <tr className="font-semibold text-center">
                          <td className="whitespace-nowrap p-4 ">SL No</td>
                          <td className="whitespace-nowrap p-4 ">Invoice Id</td>
                          <td className="whitespace-nowrap p-4 ">
                            Total Amount
                          </td>
                          <td className="whitespace-nowrap p-4 ">
                            Received Amount
                          </td>
                          <td className="whitespace-nowrap p-4 ">Due Amount</td>
                          <td className="whitespace-nowrap p-4 ">
                            Order Status
                          </td>
                          <td className="whitespace-nowrap p-4 ">Total</td>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 text-center">
                        {orderData?.data?.map((order, i) => (
                          <tr
                            key={order?._id}
                            className={`divide-x divide-gray-200 ${
                              i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                            }`}
                          >
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {orderSerialNumber + i + 1}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-blue-700 underline">
                              <Link to={`/order-details/${order?._id}`}>
                                {order?.order_id}
                              </Link>
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-700">
                              {order?.grand_total_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {order?.received_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                              {order?.due_amount}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-600 uppercase">
                              {order?.order_status == "management" ? (
                                <span className="text-red-600">
                                  {" "}
                                  {order?.order_status}
                                </span>
                              ) : (
                                <span className="text-green-700">
                                  {" "}
                                  {order?.order_status}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-700">
                              {order?.total_measurement_count ? (
                                <>
                                  {" "}
                                  {order?.total_measurement_count}{" "}
                                  {settingData?.unit_name}
                                </>
                              ) : (
                                "--"
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
                <Pagination
                  setPage={setOrdePage}
                  setLimit={setOrderLimit}
                  totalData={orderData?.totalData}
                  page={ordePage}
                  limit={orderLimit}
                />
              </div>
            )}

            {/* Sale Target */}
            {activeNavButton == "sale" && (
              <div className="">
                {/* <p className="text-[20px] font-bold uppercase my-2">
                  Sale Target Chart
                </p>
                <div className="bg-gray-50  p-5 shadow-md mt-6">
                  <SaleChart />
                </div> */}
                <div className="mt-6">
                  <p className="text-[20px] font-bold uppercase my-2">
                    Sale Target Table
                  </p>
                </div>
                {saleTargetData?.data?.length > 0 ? (
                  <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full  text-sm">
                      <thead>
                        <tr className="font-semibold text-center">
                          <td className="whitespace-nowrap p-4 ">SL No</td>
                          <td className="whitespace-nowrap p-4 ">Start Date</td>
                          <td className="whitespace-nowrap p-4 ">End Date</td>
                          <td className="whitespace-nowrap p-4 ">
                            Brand Sale Target
                          </td>
                          <td className="whitespace-nowrap p-4 ">Fill Up</td>
                          <td className="whitespace-nowrap p-4 ">
                            Others Sale Target
                          </td>
                          <td className="whitespace-nowrap p-4 ">Fill Up</td>
                          <td className="whitespace-nowrap p-4 ">
                            Get Amount(1-50)%
                          </td>
                          <td className="whitespace-nowrap p-4 ">
                            Get Amount(51-100)%
                          </td>
                          <td className="whitespace-nowrap p-4 ">Status</td>
                        </tr>
                      </thead>

                      <tbody>
                        {saleTargetData?.data?.map((sale_target, i) => (
                          <tr
                            key={sale_target?._id}
                            className={`text-center ${
                              i % 2 === 0
                                ? "bg-secondary-50"
                                : "bg-secondary-100"
                            } hover:bg-blue-100`}
                          >
                            <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                              {serialNumber + i + 1}
                            </td>
                            <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                              {sale_target?.sale_target_start_date}
                            </td>
                            <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                              {sale_target?.sale_target_end_date}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.brand_sale_target}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.brand_sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.sale_target}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.sale_target_fillup}{" "}
                              {settingData?.unit_name}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.first_half_amount_per_unit ? (
                                <>
                                  {" "}
                                  {sale_target?.first_half_amount_per_unit}{" "}
                                  <small>(per {settingData?.unit_name})</small>
                                </>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                              {sale_target?.second_half_amount_per_unit ? (
                                <>
                                  {" "}
                                  {
                                    sale_target?.second_half_amount_per_unit
                                  }{" "}
                                  <small>(per {settingData?.unit_name})</small>
                                </>
                              ) : (
                                "--"
                              )}
                            </td>
                            <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                              {sale_target?.brand_sale_target_success == true &&
                              sale_target?.sale_target_success == true ? (
                                <span className="text-green-600">Success</span>
                              ) : (
                                <span className="text-blue-600">Pending</span>
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
                <Pagination
                  setPage={setPage}
                  setLimit={setLimit}
                  totalData={saleTargetData?.totalData}
                  page={page}
                  limit={limit}
                />
              </div>
            )}
          </div>
        </>
      </>
    </div>
  );
};

export default StaffPerfomance;
