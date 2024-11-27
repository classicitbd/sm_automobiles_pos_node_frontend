import { useContext, useEffect, useState } from "react";
import AddSupplier from "../../components/Supplier/AddSupplier";

import SupplierTable from "../../components/Supplier/SupplierTable";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import useDebounced from "@/hooks/useDebounced";
import { AuthContext } from "@/context/AuthProvider";

const SupplierPage = () => {
  //Add Supplier modal open state
  const [openAddModal, setOpenAddModal] = useState(false);
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
    data: allSupplier = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/supplier/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/supplier/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=supplier_show`,
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
          <h1 className="text-2xl">All Supplier List </h1>
        </div>
        <div>
          <div>
            <Button onClick={() => setOpenAddModal(true)}>Add Supplier</Button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Supplier..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {/* show All Supplier Table List Component*/}
      <SupplierTable
        allSupplier={allSupplier}
        refetch={refetch}
        isLoading={isLoading}
        user={user}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
      />

      {/* add all ReSeller modal component */}
      {openAddModal && (
        <AddSupplier
          setOpenAddModal={setOpenAddModal}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  );
};

export default SupplierPage;
