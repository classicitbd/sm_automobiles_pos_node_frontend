import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import AddProductUnit from "@/components/ProductUnit/AddProductUnit";
import ProductUnitTable from "@/components/ProductUnit/ProductUnitTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import { SettingContext } from "@/context/SettingProvider";
import useDebounced from "@/hooks/useDebounced";

import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

const ProductUnitPage = () => {
  const [productUnitCreateModal, setProductUnitCreateModal] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: userLoading } = useContext(AuthContext);
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

  //Fetch product_unit Data
  const {
    data: product_unitNames = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product_unit/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product_unit/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
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

  if (settingLoading || userLoading) {
    return <LoaderOverlay />;
  }

  return (
    <>
      {user?.user_role_id?.unit_dashboard_show == true && (
        <div className="py-6 px-4">
          <div className="flex justify-between mt-6">
            <div>
              <h1 className="text-2xl">Product Unit</h1>
            </div>

            {user?.user_role_id?.unit_post ==true && (
              <div>
                <Button
                  type="button"
                  onClick={() => setProductUnitCreateModal(true)}
                >
                  Create Product Unit
                </Button>
              </div>
            )}
          </div>
          {/* search Product Unit... */}
          <div className="mt-3">
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search Unit..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/*Product Unit Data Show and update and delete operation file */}
          <ProductUnitTable
            product_unitNames={product_unitNames}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={product_unitNames?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
            settingData={settingData}
          />
          {/*Product Unit Create  modal */}
          {productUnitCreateModal && (
            <AddProductUnit
              setProductUnitCreateModal={setProductUnitCreateModal}
              refetch={refetch}
              user={user}
              settingData={settingData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductUnitPage;
