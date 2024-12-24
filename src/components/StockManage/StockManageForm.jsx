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
import { SettingContext } from "@/context/SettingProvider";

const StockManageForm = () => {
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const { user } = useContext(AuthContext);
  const { settingData, loading: settingLoading } = useContext(SettingContext);

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
        product_id: product_id?._id,
        supplier_id: supplier_id,
        total_amount: parseInt(
          data?.product_buying_price * data?.product_quantity
        ),
        due_amount: parseInt(
          data?.product_buying_price * data?.product_quantity
        ),
        paid_amount: 0,
        payment_status: "unpaid",
      };
      const response = await fetch(
        `${BASE_URL}/stock_manage`,
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

  //Total Price...
  const totalPrice = productQuantity * buyingPrice || 0;

  if (productLoading || supplierLoading || settingLoading) {
    return <LoaderOverlay />;
  }

  console.log(product_id);

  return (
    <div>
      <div className="bg-white shadow-md py-6 px-4 rounded-lg mt-6">
        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div className="mt-2">
            <label htmlFor="" className="block font-medium text-gray-700">
              Note
            </label>

            <textarea
              {...register("product_note")}
              type="text"
              placeholder="Note"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="mt-3">
            <label className="block font-medium text-gray-700 mb-1 mt-2">
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
                setProduct_id(selectedOption);
              }}
            />
          </div>
          <div className="mt-2">
            <label className="block font-medium text-gray-700">
              Product Purchase Quantity <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center justify-between gap-2">
              <input
                {...register("product_quantity", {
                  required: "Product Quantity is required",
                  validate: (value) => {
                    if (value < 0) {
                      return "Amount must be getter than 0";
                    }
                  },
                })}
                onChange={(e) =>
                  setProductQuantity(Number(e.target.value) || 0)
                }
                type="number"
                placeholder="Enter Product Quantity"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              <p className="font-bold">{settingData?.unit_name}</p>
            </div>
            {errors.product_quantity && (
              <p className="text-red-600">{errors.product_quantity.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="block font-medium text-gray-700">
              Buying Price(per qty) <span className="text-red-500">*</span>
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
              onChange={(e) => setBuyingPrice(Number(e.target.value) || 0)}
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
            <label className="block font-medium text-gray-700">
              Total Price
            </label>

            <input
              value={totalPrice.toFixed(2)}
              type="number"
              placeholder="Total Price"
              disabled
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="mt-2">
            <label className="block font-medium text-gray-700">
              Selling Price(per qty) <span className="text-red-500">*</span>
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

          <div className="mt-3">
            <label className="block font-medium text-gray-700 mb-1">
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

          <div className="flex justify-end mt-5">
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

      <div>
        {product_id && (
          <div className="rounded shadow-md mt-3 bg-gray-50 ">
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="font-bold text-center ">
                    <td className="whitespace-nowrap p-4 ">SL No</td>
                    <td className="whitespace-nowrap p-4 ">Product Name</td>

                    <td className="whitespace-nowrap p-4 ">Product Id</td>

                    <td className="whitespace-nowrap p-4 ">Buying Price</td>
                    <td className="whitespace-nowrap p-4 ">Quantity</td>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    className="text-center 
                        bg-secondary-100
                      hover:bg-blue-100"
                  >
                    <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                      1
                    </td>
                    <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                      {product_id?.product_name}
                    </td>

                    <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                      {product_id?.product_id}
                    </td>
                    <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                      {" "}
                      {product_id?.product_buying_price}
                    </td>
                    <td className="whitespace-nowrap py-3 font-medium text-gray-700">
                      {" "}
                      {product_id?.product_quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockManageForm;
