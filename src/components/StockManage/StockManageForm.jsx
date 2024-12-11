import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Button } from "../ui/button";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import { AuthContext } from "@/context/AuthProvider";
import useGetActiveProduct from "@/hooks/useGetActiveProduct";
import useGetSupplier from "@/hooks/useGetSupplier";

const StockManageForm = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [product_id, setProduct_id] = useState(null);
  const [supplier_id, setSupplier_id] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //get supplier data
  const { data: supplierTypes, isLoading: supplierLoading } = useGetSupplier();

  //get product data
  const { data: productTypes, isLoading: productLoading } =
    useGetActiveProduct();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        stock_publisher_id: user?._id,
        product_note: data?.product_note,
        product_selling_price: data?.product_selling_price,
        product_buying_price: data?.product_buying_price,
        product_quantity: data?.product_quantity,
        product_id: product_id,
        supplier_id: supplier_id,
        total_price: parseInt(
          data?.product_buying_price * data?.product_quantity
        ),
      };
      const response = await fetch(
        `${BASE_URL}/stock_manage?role_type=stock_manage_create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message
            ? result?.message
            : "Customer Payment created successfully",
          {
            autoClose: 1000,
          }
        );
        reset();
        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (productLoading || supplierLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <div>
        <div className="">
          <div className="">
            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Note
                </label>

                <textarea
                  {...register("product_note")}
                  type="text"
                  placeholder="Note"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>

              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Selling Price <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("product_selling_price", {
                    required: "Selling Price is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Selling Price"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.product_selling_price && (
                  <p className="text-red-600">
                    {errors.product_selling_price.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Buying Price <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("product_buying_price", {
                    required: "Buying Price is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Buying Price"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.product_buying_price && (
                  <p className="text-red-600">
                    {errors.product_buying_price.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Product Quantity <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("product_quantity", {
                    required: "Product Quantity is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Product Quantity"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.product_quantity && (
                  <p className="text-red-600">
                    {errors.product_quantity.message}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                  Product Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="product_id"
                  name="product_id"
                  aria-label="Product Name"
                  required
                  options={productTypes?.data}
                  getOptionLabel={(x) => x?.product_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setProduct_id(selectedOption?._id);
                  }}
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Supplier Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="supplier_id"
                  name="supplier_id"
                  aria-label="Supplier Name"
                  isClearable
                  required
                  options={supplierTypes?.data}
                  getOptionLabel={(x) => x?.supplier_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setSupplier_id(selectedOption?._id);
                  }}
                />
              </div>

              <div className="flex justify-end mt-3">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button type="submit">Create</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockManageForm;
