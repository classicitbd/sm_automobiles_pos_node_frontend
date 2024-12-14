import PurchaseListTable from "@/components/PurchaseList/PurchaseListTable";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const PurchaseListPage = () => {
   
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

    //Fetch Brand Data
    const {
      data: purchaseLists = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: [
        `/api/v1/stock_manage/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      ],
      queryFn: async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/stock_manage/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
    <div className="bg-white rounded py-6 px-4 shadow">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">All Purchase List</h1>
        </div>
        <div className="">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Purchase List..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>

      {/* show PurchaseTablelist Table */}
      <PurchaseListTable
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
  );
};

export default PurchaseListPage;
