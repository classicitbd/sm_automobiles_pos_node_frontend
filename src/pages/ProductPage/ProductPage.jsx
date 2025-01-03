import { LoaderOverlay } from "@/components/common/loader/LoderOverley";
import ProductTable from "@/components/Products/ProductTable";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useDebounced from "@/hooks/useDebounced";
import useGetBrand from "@/hooks/useGetBrand";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";

import { Link } from "react-router-dom";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, loading: userLoading } = useContext(AuthContext);
  const [brand_id, setBrandId] = useState(null);

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

  //Fetch product Data
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&brand_id=${brand_id}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&brand_id=${brand_id}`,
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

  const { data: brandTypes, isLoading: brandLoading } = useGetBrand();

  if (userLoading || brandLoading) return <LoaderOverlay />;
  return (
    <>
      {user?.user_role_id?.product_dashboard_show == true && (
        <div className="rounded py-6 px-4">
          <div className="flex justify-between items-center mt-6">
            <div>
              <h1 className="text-xl sm:text-2xl ">All Product List </h1>
            </div>

            {user?.user_role_id?.product_post == true && (
              <div>
                <Link to="/add-product">
                  <Button>Add Product</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="my-8 flex justify-between items-center">
            <div>
              <Select
                id="brand_name"
                name="brand_name"
                aria-label="Brand Name"
                isClearable
                required
                options={brandTypes?.data}
                getOptionLabel={(x) => x?.brand_name}
                getOptionValue={(x) => x._id}
                onChange={(selectedOption) => setBrandId(selectedOption?._id)}
                placeholder="Search by brand name"
              />
            </div>
            <input
              type="text"
              defaultValue={searchTerm}
              onChange={(e) => handleSearchValue(e.target.value)}
              placeholder="Search Product..."
              className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {/* show Product Table List Component*/}
          <ProductTable
            products={products}
            setPage={setPage}
            setLimit={setLimit}
            page={page}
            limit={limit}
            totalData={products?.totalData}
            refetch={refetch}
            user={user}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default ProductPage;
