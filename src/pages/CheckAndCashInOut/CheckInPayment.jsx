import CheckInPaymentTable from "@/components/CheckAndCashInOut/CheckInPaymentTable";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const CheckInPayment = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: userLoading } = useContext(AuthContext);

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
    data: checkInPaymentData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/check/check_or_cash_in_payment?payment_method=check&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/check/check_or_cash_in_payment?payment_method=check&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
if (userLoading) return <LoaderOverlay />;
  return (
    <>
      {" "}
      {user?.user_role_id?.check_or_cash_in_payment_show == true && (
        <div className="py-6 px-4">
          {/* customer payment list */}
          <div>
            <div>
              <h1 className="text-2xl">All Customer Check In Payment</h1>
            </div>
          </div>
          {/* search checkInPaymentData... */}
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
          <CheckInPaymentTable
            checkInPaymentData={checkInPaymentData}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={checkInPaymentData?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default CheckInPayment;
