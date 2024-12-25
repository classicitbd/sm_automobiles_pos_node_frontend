import APListTable from "@/components/AP/APListTable";
import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const APListPage = () => {
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

  //Fetch Brand Data
  const {
    data: purchaseLists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/stock_manage/ap_list?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/stock_manage/ap_list?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
      {user?.user_role_id?.stock_ap_show == true && (
        <div className="py-6 px-4">
          <div>
            <h1 className="sm:text-2xl text-xl">All A/P List</h1>
          </div>
          <div className="flex justify-end mt-4">
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search A/P List..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* show PurchaseTablelist Table */}
          <APListTable
            purchaseLists={purchaseLists}
            refetch={refetch}
            isLoading={isLoading}
            user={user}
            totalData={purchaseLists?.totalData}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
          />
        </div>
      )}
    </>
  );
};

export default APListPage;
