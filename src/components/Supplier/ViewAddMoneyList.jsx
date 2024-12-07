import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";

const ViewAddMoneyList = () => {
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
  //  const {
  //    data: supplierMoneyList = [],
  //    isLoading,
  //    refetch,
  //  } = useQuery({
  //    queryKey: [
  //      `/api/v1/supplier_payment?supplier_id=${}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_payment_history_show`,
  //    ],
  //    queryFn: async () => {
  //      try {
  //        const res = await fetch(
  //          `${BASE_URL}/supplier_payment?supplier_id=${}&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_payment_history_show`,
  //          {
  //            credentials: "include",
  //          }
  //        );

  //        if (!res.ok) {
  //          const errorData = await res.text();
  //          throw new Error(
  //            `Error: ${res.status} ${res.statusText} - ${errorData}`
  //          );
  //        }

  //        const data = await res.json();
  //        return data;
  //      } catch (error) {
  //        console.error("Fetch error:", error);
  //        throw error;
  //      }
  //    },
  //  });

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  return (
    <>
      {/* {isLoading === true ? (
        <TableLoadingSkeleton />
      ) : ( */}
      <>
        <div className=" mt-4">
          <h3 className="text-[26px] font-bold text-gray-800 capitalize">
            Supplier Money List Id is :{supplier_id}
          </h3>
          <div className="flex items-center justify-between my-5 mx-28">
            <div className="text-[26px] font-bold text-gray-800">
              <p>Supplier Name: </p>
              <p>Supplier Phone: </p>
            </div>
            <div>
              <p>Supplier Address: </p>
              <p>Supplier Status: </p>
              <p>Supplier Created By: </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 mt-6">
          {/* {supplierPayments?.data?.paymentHistory?.length > 0 ? ( */}
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                <tr className="divide-x  divide-gray-300  font-semibold text-center text-gray-900">
                  <td className="whitespace-nowrap p-4 ">SL No</td>
                  <td className="whitespace-nowrap p-4 ">Payment Title</td>
                  <td className="whitespace-nowrap p-4 ">Payment Date</td>
                  <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                  <td className="whitespace-nowrap p-4 ">Bank Name</td>
                  <td className="whitespace-nowrap p-4 ">Payment TRNX ID</td>
                  <td className="whitespace-nowrap p-4 ">Description</td>
                  <td className="whitespace-nowrap p-4 ">Created By</td>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-center">
                {/* {supplierPayments?.data?.paymentHistory?.map((payment, i) => ( */}
                  <tr
                    // key={}
                    // className={`divide-x divide-gray-200 ${
                    //   i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    // }`}
                  >
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {serialNumber + i + 1} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.supplier_payment_title} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {DateTimeFormat(payment?.createdAt)} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.supplier_payment_amount} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.payment_bank_id?.bank_name} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.transaction_id} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.supplier_payment_description} */}
                    </td>
                    <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                      {/* {payment?.supplier_payment_publisher_id?.user_name} */}
                    </td>
                  </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
          {/* ) : (
              <NoDataFound />
            )} */}
          <Pagination
            setPage={setPage}
            setLimit={setLimit}
            //   totalData={?.totalData}
            page={page}
            limit={limit}
          />
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default ViewAddMoneyList;
