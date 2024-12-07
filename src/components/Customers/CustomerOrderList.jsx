import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <div className=" mt-4">
        <h3 className="text-[26px] font-bold text-gray-800 capitalize">
          Order List Id is : {customer_id}
        </h3>
      </div>
      <div className="rounded-lg border border-gray-200 mt-6">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                <td className="whitespace-nowrap p-4 ">SL No</td>
                <td className="whitespace-nowrap p-4 ">Payment Name</td>
                <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                <td className="whitespace-nowrap p-4 ">Account No</td>
                <td className="whitespace-nowrap p-4 ">Reserve amount</td>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              <tr className="divide-x divide-gray-200">
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  1
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  For X order
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  2345
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  588469
                </td>
                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                  10000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerOrderList;
