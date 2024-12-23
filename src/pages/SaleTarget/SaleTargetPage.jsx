import AddSaleTarget from "@/components/SaleTarget/AddSaleTarget";
import SaleTargetTable from "@/components/SaleTarget/SaleTargetTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import useDebounced from "@/hooks/useDebounced";
import UseGetUser from "@/hooks/UseGetUser";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const SaleTargetPage = () => {
  const [saleTargetCreateModal, setSaleTargetCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const { settingData, loading: settingLoading } = useContext(SettingContext);

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

  //Fetch sale_target Data
  const {
    data: saleTargetData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/sale_target?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=sale_target_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=sale_target_show`,
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

  //get user data
  const { data: userTypes, isLoading: userLoading } = UseGetUser();

  if (settingLoading || userLoading) {
    return <MiniSpinner />;
  }

  return (
    <div className="py-6 px-4">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Sale Target</h1>
        </div>

        <div>
          <Button type="button" onClick={() => setSaleTargetCreateModal(true)}>
            Create Sale Target
          </Button>
        </div>
      </div>
      {/* search Sale Target... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Customers..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {/*Sale Target Data Show and update and delete operation file */}
      <SaleTargetTable
        saleTargetData={saleTargetData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={saleTargetData?.totalData}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
        settingData={settingData}
        userTypes={userTypes}
      />
      {/*Sale Target Create  modal */}
      {saleTargetCreateModal && (
        <AddSaleTarget
          setSaleTargetCreateModal={setSaleTargetCreateModal}
          refetch={refetch}
          user={user}
          settingData={settingData}
          userTypes={userTypes}
        />
      )}
    </div>
  );
};

export default SaleTargetPage;
