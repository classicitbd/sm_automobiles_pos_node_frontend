
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { DateTimeFormat } from "@/utils/dateTimeFormet";

const CustomerOrderList = () => {
  const { customer_id } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  //Fetch Bank Data
  const {
    data: customerOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/order?customer_id=${customer_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=order_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/order?customer_id=${customer_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=order_history_show`,
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

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {/* search Supplier Payment History... */}
      <div className='mt-3'>
        <input
          type='text'
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Ref Id...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              Customer Order List
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>Customer Name: {customerOrders?.data?.customerDetails?.customer_name}</p>
                <p>Customer Phone: {customerOrders?.data?.customerDetails?.customer_phone}</p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>Customer Address: {customerOrders?.data?.customerDetails?.customer_address}</p>
                {/* <p>Wallet Amount: {customerOrders?.data?.customerDetails?.customer_wallet}</p> */}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {customerOrders?.data?.orderDetails?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Order Date</td>
                      <td className="whitespace-nowrap p-4 ">Sub Total Amount</td>
                      <td className="whitespace-nowrap p-4 ">Discount Percent</td>
                      <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                      <td className="whitespace-nowrap p-4 ">Received Amount</td>
                      <td className="whitespace-nowrap p-4 ">
                        Due Amount
                      </td>
                      <td className="whitespace-nowrap p-4 ">Order Status</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {customerOrders?.data?.orderDetails?.map(
                      (payment, i) => (
                        <tr
                          key={payment?._id}
                          className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                            }`}
                        >
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.order_id}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {DateTimeFormat(payment?.createdAt)}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.sub_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.discount_percent_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.grand_total_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.received_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.due_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.order_status}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.order_publisher_id?.user_name}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
            <Pagination
              setPage={setPage}
              setLimit={setLimit}
              totalData={customerOrders?.totalData}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerOrderList;


