import TableLoadingSkeleton from "@/components/common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "@/components/common/pagination/Pagination";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const Orders = () => {
  const [serialNumber, setSerialNumber] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

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

  const order_publisher_id = user?.order_publisher_id
    ? user?.order_publisher_id
    : user?._id;
  //Fetch Customer Data
  const {
    data: allOrders = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/order/self_order_with_pagination/${order_publisher_id}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/order/self_order_with_pagination/${order_publisher_id}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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


  return (
    <>
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Orders</h1>
        </div>

        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Orders..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>
      <>
        {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <div className="rounded-lg border border-gray-200 mt-6">
              {allOrders?.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-t-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                      <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                        <td className="whitespace-nowrap p-4 ">SL No</td>
                        <td className="whitespace-nowrap p-4 ">
                          Customer Name
                        </td>
                        <td className="whitespace-nowrap p-4 ">Phone</td>
                        <td className="whitespace-nowrap p-4 ">Order Id</td>
                        <td className="whitespace-nowrap p-4 ">Sub Total</td>
                        <td className="whitespace-nowrap p-4 ">Discount(%)</td>
                        <td className="whitespace-nowrap p-4 ">Grand Total</td>
                        <td className="whitespace-nowrap p-4 ">
                          Received Amount
                        </td>
                        <td className="whitespace-nowrap p-4 text-red-600">Due Amount</td>
                        <td className="whitespace-nowrap p-4 ">Order Status</td>

                        {/* <td className="whitespace-nowrap p-4 ">Action</td> */}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                      {allOrders?.data?.map((order, i) => (
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
                            {order?.order_id}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                            {order?.sub_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-purple">
                            {order?.discount_percent_amount} %
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-green-600">
                            {order?.grand_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                          

                            {
                              order?.received_amount === order?.sub_total_amount ? (
                                <span className="text-green-600">{order?.received_amount}</span>
                              ) : order?.received_amount > order?.sub_total_amount ? (
                                <span className="text-blue-600">{order?.received_amount}</span>
                              ) : (
                                <span className="text-yellow-600">{order?.received_amount}</span>
                              )
                            }
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-red-600">
                            {order?.due_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 uppercase">
                            {order?.order_status === 'management' ? <span className="text-red-600">{order?.order_status}</span> : <span className="text-green-600">{order?.order_status}</span>}
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
        {allOrders?.totalData > 5 && (
          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            totalData={allOrders?.totalData}
            page={page}
            limit={limit}
          />
        )}
      </>
    </>
  );
};

export default Orders;
