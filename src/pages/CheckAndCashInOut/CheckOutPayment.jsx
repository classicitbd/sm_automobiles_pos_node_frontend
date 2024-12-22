
import CheckOutPaymentTable from "@/components/CheckAndCashInOut/CheckOutPaymentTable";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const CheckOutPayment = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  //Fetch customer check in data
  const {
    data: CheckOutPaymentData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/supplier_payment/check_or_cash_out_payment?supplier_payment_method=check&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=check_out_payment_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/supplier_payment/check_or_cash_out_payment?supplier_payment_method=check&page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=check_out_payment_show`,
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
    <div className=" py-6 px-4 ">
      {/* supplier payment list */}
      <div className=" mt-6">
        <div>
          <h1 className="text-2xl">All Supplier Check Out Payment</h1>
        </div>
      </div>
      {/* search CheckOutPaymentData... */}
      <div className="mt-3 flex justify-end">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search income..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {/*check in Data Show and update and delete operation file */}
      <CheckOutPaymentTable
        CheckOutPaymentData={CheckOutPaymentData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={CheckOutPaymentData?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CheckOutPayment;
