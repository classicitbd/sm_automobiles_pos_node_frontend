import { AuthContext } from "@/context/AuthProvider";
import useGetBrand from "@/hooks/useGetBrand";
import useGetCategory from "@/hooks/useGetCategory";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import useDebounced from "@/hooks/useDebounced";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import RightSide from "./RightSide";
import Pagination from "../common/pagination/Pagination";
import { toast } from "react-toastify";
import { SettingContext } from "@/context/SettingProvider";

const PosMainComponent = () => {
  const { setSidebarOpen, user, loading } = useContext(AuthContext);
  const { settingData, loading: settingLoading } = useContext(SettingContext)

  //   product data state
  const [addProducts, setAddProducts] = useState([]);

  //   search and filter data state
  // Create a ref for the barcode input field
  const barcodeInputRef = useRef(null);
  const [category_id, setCategory_id] = useState("");
  const [brand_id, setBrand_id] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [product_barcode, setProduct_barcode] = useState("");

  const searchBarCodeText = useDebounced({
    searchQuery: barcodeValue,
    delay: 500,
  });
  useEffect(() => {
    setProduct_barcode(searchBarCodeText);
  }, [searchBarCodeText]);

  // handle Barcode search function....
  const handleBarCodeSearchValue = (value) => {
    setBarcodeValue(value);
  };

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const path = useLocation();
  const pathName = path?.pathname;

  useEffect(() => {
    if (pathName === "/pos") {
      setSidebarOpen(false);
    }
    // Focus the barcode input field when the component renders
    barcodeInputRef.current?.focus();
  }, [pathName, setSidebarOpen]);

  //get category data
  const { data: categoryTypes, isLoading: categoryLoading } = useGetCategory();

  //get brand data
  const { data: brandTypes, isLoading: brandLoading } = useGetBrand();

  //Fetch product Data
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product?page=${page}&limit=${limit}&product_barcode=${product_barcode}&searchTerm=${searchTerm}&category_id=${category_id}&brand_id=${brand_id}&role_type=product_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/product?page=${page}&limit=${limit}&product_barcode=${product_barcode}&searchTerm=${searchTerm}&category_id=${category_id}&brand_id=${brand_id}&role_type=product_show`,
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

  if (categoryLoading || brandLoading || loading || settingLoading) {
    return <LoaderOverlay />;
  }

  return (
    <>
      <div className="sm:flex p-3 sm:p-6 gap-6 mb-2">
        {/* Left Section: Product List */}
        <div className="w-full md:w-3/5">
          <div className="flex flex-col gap-4 mb-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 sm:mt-2">
                  Category Name
                </label>

                <Select
                  id="category_id"
                  name="category_id"
                  aria-label="Category Name"
                  isClearable
                  options={categoryTypes?.data}
                  getOptionLabel={(x) => x?.category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setCategory_id(selectedOption?._id);
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 sm:mt-2">
                  Brand Name
                </label>

                <Select
                  id="brand_id"
                  name="brand_id"
                  aria-label="Brand Name"
                  isClearable
                  options={brandTypes?.data}
                  getOptionLabel={(x) => x?.brand_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setBrand_id(selectedOption?._id);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search Here"
                className="border rounded-md p-2 w-full"
                defaultValue={searchTerm}
                onChange={(e) => handleSearchValue(e.target.value)}
              />
              {/* Scan Barcode Input Field */}
              <input
                type="text"
                placeholder="Scan Barcode here"
                className="border rounded-md p-2 w-full"
                ref={barcodeInputRef} // Attach the ref here
                defaultValue={barcodeValue}
                onChange={(e) => handleBarCodeSearchValue(e.target.value)}
              />
            </div>
          </div>

          {/* Product Cards */}
          {isLoading === true ? (
            <TableLoadingSkeleton />
          ) : (
            <>
              {products?.data?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 overflow-y-auto max-h-[600px] scrollbar-thin p-2">
                  {products?.data?.map((product, index) => (
                    <>
                      {product?.product_quantity > 0 ? (
                        <div
                          onClick={() => {
                            const findProduct = addProducts.find(
                              (item) => item?._id === product?._id
                            );
                            if (findProduct) {
                              toast.error("Already added this product", {
                                autoClose: 1000,
                              });
                              return; // Exit if the product is already added
                            }
                            setAddProducts((prev) => [
                              ...prev,
                              {
                                ...product,
                                purchase_quantity: 1,
                                total_amount: product?.product_price,
                                discount_percent: 0,
                                grand_total: product?.product_price,
                                total_messurement:
                                  1 *
                                  product?.product_unit_id?.product_unit_value,
                              },
                            ]);
                          }}
                          key={index}
                          className="border rounded-md overflow-hidden shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
                        >
                          <img
                            src={product?.product_image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-40 object-cover p-3"
                          />
                          <div className="px-1.5 sm:px-2 ">
                            <p className="font-bold">{product?.product_name}</p>
                            <p className="text-sm sm:mt-1">
                              Quantity:{" "}
                              <span className="font-bold">
                                {product?.product_quantity}{" "}
                                {product?.product_unit_id?.product_unit_name}
                              </span>
                            </p>
                            <p className="font-semibold">
                              {"1"}{" "}
                              {product?.product_unit_id?.product_unit_name}
                              {" = "}
                              {
                                product?.product_unit_id?.product_unit_value
                              }{" "}
                              {settingData?.unit_name}
                            </p>
                            <p className="font-semibold">
                              {product?.product_quantity}{" "}
                              {product?.product_unit_id?.product_unit_name}
                              {" = "}
                              {product?.product_quantity *
                                product?.product_unit_id
                                  ?.product_unit_value}{" "}
                              {settingData?.unit_name.slice(0, 1)}
                            </p>
                            <p className="text-sm sm:mt-1">
                              Category : {product?.category_id?.category_name}
                            </p>
                            {product?.brand_id?.brand_name ? (
                              <p className="text-sm sm:mt-1">
                                Brand : {product?.brand_id?.brand_name}
                              </p>
                            ) : (
                              <p className="text-sm mt-1 opacity-0">
                                Brand : Placeholder
                              </p>
                            )}
                            <p className="text-sm mt-1 font-semibold">
                              ID : {product?.product_id}
                            </p>
                          </div>
                          <div className="bg-blue-500 text-white text-center text-xs py-1.5">
                            {product?.product_price}
                          </div>
                        </div>
                      ) : (
                        <div
                          disabled
                          key={index}
                          className="border rounded-md overflow-hidden shadow-md flex flex-col justify-between hover:shadow-lg transition duration-300 ease-in-out"
                        >
                          <img
                            src={product?.product_image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-40 object-cover p-3"
                          />
                          <div className="px-1.5 sm:px-2">
                            <p className="font-bold">{product?.product_name}</p>
                            <p className="text-sm sm:mt-1">
                              Category: {product?.category_id?.category_name}
                            </p>
                            {product?.brand_id?.brand_name ? (
                              <p className="text-sm sm:mt-1">
                                Brand : {product?.brand_id?.brand_name}
                              </p>
                            ) : (
                              <p className="text-sm sm:mt-1 opacity-0">
                                Brand : Placeholder
                              </p>
                            )}
                            <p className="text-sm my-1 font-semibold">
                              ID : {product?.product_id}
                            </p>
                          </div>
                          {product?.product_price && (
                            <div className="bg-blue-500 text-white text-center text-xs py-1.5">
                              {product?.product_price}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <NoDataFound />
              )}
              {products?.totalData > 1 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  totalData={products?.totalData}
                />
              )}
            </>
          )}
        </div>

        {/* Right Section: Customer and Order Form */}
        <div className="w-full md:w-2/5">
          <RightSide
            user={user}
            addProducts={addProducts}
            setAddProducts={setAddProducts}
            settingData={settingData}
          />
        </div>
      </div>
    </>
  );
};

export default PosMainComponent;
