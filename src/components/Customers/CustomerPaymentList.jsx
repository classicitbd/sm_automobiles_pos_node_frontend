
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
import useGetACustomerDetails from "@/hooks/useGetACustomerDetails";

const CustomerPaymentList = () => {
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
    data: customerPayments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/check?customer_id=${customer_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=check_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/check?customer_id=${customer_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=check_history_show`,
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

  //get customer data
  const { data: customerData = {}, isLoading: customerLoading } = useGetACustomerDetails(customer_id);

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
      {isLoading === true || customerLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <>
          <div className=" mt-4">
            <h3 className="text-[26px] font-bold text-gray-800 capitalize">
              Customer Payment List
            </h3>
            <div className="flex items-center justify-between my-5 mx-28">
              <div className="text-[26px] font-bold text-gray-800">
                <p>Customer Name: {customerData?.data?.customer_name}</p>
                <p>Customer Phone: {customerData?.data?.customer_phone}</p>
              </div>
              <div className="text-[26px] font-bold text-gray-800">
                <p>Customer Address: {customerData?.data?.customer_address}</p>
                {/* <p>Wallet Amount: {customerData?.data?.customer_wallet}</p> */}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 mt-6">
            {customerPayments?.data?.length > 0 ? (
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                    <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">Invoice No</td>
                      <td className="whitespace-nowrap p-4 ">Payment Date</td>
                      <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                      <td className="whitespace-nowrap p-4 ">Bank Name</td>
                      <td className="whitespace-nowrap p-4 ">
                        Payment Reference ID
                      </td>
                      <td className="whitespace-nowrap p-4 ">Payment Status</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {customerPayments?.data?.map(
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
                            {payment?.invoice_number}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {DateTimeFormat(payment?.createdAt)}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.pay_amount}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.bank_id?.bank_name}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.check_number}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.check_status}
                          </td>
                          <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                            {payment?.check_publisher_id?.user_name}
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
              totalData={customerPayments?.totalData}
              page={page}
              limit={limit}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerPaymentList;

