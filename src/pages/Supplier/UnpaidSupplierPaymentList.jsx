import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import UnpaidPaymentTable from "@/components/Supplier/UnpaidPaymentTable";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const UnpaidSupplierPaymentList = () => {
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

  //Fetch unpaidPaymentLists Data
  const {
    data: unpaidPaymentLists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/supplier_payment/unpaid_payment_list?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/supplier_payment/unpaid_payment_list?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  if (userLoading) {
    return <LoaderOverlay />;
  }
  return (
    <>
      {user?.user_role_id?.supplier_unpaid_payment_show == true && (
        <div className=" py-6 px-4 ">
          <div className=" mt-6">
            <div>
              <h1 className="text-2xl">Un Paid Payment Information</h1>
            </div>
          </div>
          {/* search Un Paid Payment... */}
          <div className="mt-3 flex justify-end">
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search Un Paid Payment..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/*unpaidPaymentLists Payment Table */}
          <UnpaidPaymentTable
            unpaidPaymentLists={unpaidPaymentLists}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={unpaidPaymentLists?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default UnpaidSupplierPaymentList;
