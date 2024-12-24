import ProfitTable from "@/components/Profit/ProfiTable";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const ProfitPage = () => {
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

  //Fetch order Data
  const {
    data: profits = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/order/profit?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/order/profit?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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
    <div className="py-6 px-4 ">
      <div className="flex justify-between ">
        <div>
          <h1 className="sm:text-2xl text-xl">All Profit List</h1>
        </div>
        <div className="flex justify-end mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Profit..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
      </div>

      {/* show Order Table List Component*/}
      <ProfitTable
        profits={profits}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={profits?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProfitPage;
