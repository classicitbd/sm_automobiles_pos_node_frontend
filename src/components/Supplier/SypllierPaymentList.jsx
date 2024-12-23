import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { DateTimeFormat } from "@/utils/dateTimeFormet";
import SupplierPaymentListChart from "./SupplierPaymentListChart";

const SypllierPaymentList = () => {
  const { supplier_id } = useParams();

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
  const { data: supplierPayments = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/supplier_payment?supplier_id=${supplier_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_payment_history_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/supplier_payment?supplier_id=${supplier_id}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_payment_history_show`,
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
      <div className="mt-4">
        <h3 className="sm:text-[26px] sm:font-medium text-gray-800 uppercase">
          Supplier Payment List
        </h3>
      </div>
      <div className="flex items-center justify-between p-5  bg-gray-50 shadow-md mt-4 flex-wrap">
        <div className="font-bold">
          <p className="sm:text-[20px] text-bgray-700">
            {" "}
            Supplier Name :{" "}
            {supplierPayments?.data?.supplierDetails?.supplier_name}
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Supplier Phone :{" "}
            {supplierPayments?.data?.supplierDetails?.supplier_phone}
          </p>
        </div>
        <div className="font-bold text-bgray-700">
          <p className="sm:text-[20px] text-bgray-700">
            Supplier Address :{" "}
            {supplierPayments?.data?.supplierDetails?.supplier_address}
          </p>
          <p className="sm:text-[20px] text-bgray-700">
            Supplier Wallet Ammount :{" "}
            {supplierPayments?.data?.supplierDetails?.supplier_wallet_amount ? (
              <span className="sm:text-[20px] text-green-600">
                {
                  supplierPayments?.data?.supplierDetails
                    ?.supplier_wallet_amount
                }
              </span>
            ) : (
              <span className="sm:text-[20px] text-red-600">0</span>
            )}
          </p>
        </div>
      </div>

      <div className="bg-gray-50  p-5 shadow-md mt-8">
        <SupplierPaymentListChart />
      </div>

      <div className="bg-white rounded py-6 px-4 shadow mt-8">
        <div className="mt-3 flex justify-end">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Ref Id..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        {isLoading === true ? (
          <TableLoadingSkeleton />
        ) : (
          <div className="rounded-lg shadow-md mt-6">
            {supplierPayments?.data?.paymentHistory?.length > 0 ? (
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="font-semibold text-center">
                      <td className="whitespace-nowrap p-4 ">SL No</td>
                      <td className="whitespace-nowrap p-4 ">
                        Payment Reference ID
                      </td>
                      <td className="whitespace-nowrap p-4 ">Payment Title</td>
                      <td className="whitespace-nowrap p-4 ">Payment Date</td>

                      <td className="whitespace-nowrap p-4 ">Payment Status</td>
                      <td className="whitespace-nowrap p-4 ">Bank Name</td>
                      <td className="whitespace-nowrap p-4 ">Created By</td>
                      <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 text-center">
                    {supplierPayments?.data?.paymentHistory?.map(
                      (payment, i) => (
                        <tr
                          key={payment?._id}
                          className={`text-center ${
                            i % 2 === 0 ? "bg-secondary-50" : "bg-secondary-100"
                          } hover:bg-blue-100`}
                        >
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {serialNumber + i + 1}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            <Link>
                              <span className="underline text-blue-600">
                                {payment?.reference_id}
                              </span>
                            </Link>
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {payment?.supplier_payment_title}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {DateTimeFormat(payment?.createdAt)}
                          </td>

                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {payment?.supplier_payment_status === "paid" ? (
                              <span className="text-green-600">
                                {payment?.supplier_payment_status}
                              </span>
                            ) : (
                              <span className="text-yellow-600">
                                {payment?.supplier_payment_status}
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-blue-600">
                            {payment?.payment_bank_id?.bank_name
                              ? payment?.payment_bank_id?.bank_name
                              : "--"}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-gray-700">
                            {payment?.supplier_payment_publisher_id?.user_name}
                          </td>
                          <td className="whitespace-nowrap py-2.5 font-medium text-green-600">
                            {payment?.supplier_payment_amount}
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
          </div>
        )}

        <Pagination
          setPage={setPage}
          setLimit={setLimit}
          totalData={supplierPayments?.totalData}
          page={page}
          limit={limit}
        />
      </div>
    </>
  );
};

export default SypllierPaymentList;
