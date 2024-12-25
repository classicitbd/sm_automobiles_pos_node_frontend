import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import AddSaleTarget from "@/components/SaleTarget/AddSaleTarget";
import SaleTargetTable from "@/components/SaleTarget/SaleTargetTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import useDebounced from "@/hooks/useDebounced";
import useGetBrand from "@/hooks/useGetBrand";
import UseGetUser from "@/hooks/UseGetUser";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const SaleTargetPage = () => {
  const [saleTargetCreateModal, setSaleTargetCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: usersLoading } = useContext(AuthContext);
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
      `/api/v1/sale_target?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/sale_target?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  //get brand data
  const { data: brandTypes, isLoading: brandLoading } = useGetBrand();

  if (usersLoading) return <LoaderOverlay />;
  return (
    <div className="py-6 px-4">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Sale Target</h1>
        </div>
        {user?.user_role_id?.sale_target_post == true && (
          <div>
            <Button
              type="button"
              onClick={() => setSaleTargetCreateModal(true)}
            >
              Create Sale Target
            </Button>
          </div>
        )}
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
        userLoading={userLoading}
        settingLoading={settingLoading}
        brandLoading={brandLoading}
      />
      {/*Sale Target Create  modal */}
      {saleTargetCreateModal && (
        <AddSaleTarget
          setSaleTargetCreateModal={setSaleTargetCreateModal}
          refetch={refetch}
          user={user}
          settingData={settingData}
          userTypes={userTypes}
          brandTypes={brandTypes}
        />
      )}
    </div>
  );
};

export default SaleTargetPage;
