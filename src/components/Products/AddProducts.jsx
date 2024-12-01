import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import Select from "react-select";
import useGetCategory from "@/hooks/useGetCategory";
import useGetBrand from "@/hooks/useGetBrand";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import { AuthContext } from "@/context/AuthProvider";

const AddProducts = () => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState("");
  const [brand_id, setBrand_id] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //get category data
  const { data: categoryTypes, isLoading: categoryLoading } = useGetCategory();

  //get brand data
  const { data: brandTypes, isLoading: brandLoading } = useGetBrand();

  //Image preview For Product....

  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("product_image", file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setValue("product_image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //Image preview End  For Product....

  //Image preview End  For Product....

  //Data post
  const handleDataPost = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "product_image") {
        formData.append(key, data?.product_image);
      } else {
        formData.append(key, value);
      }
    });

    if (brand_id) {
      formData.append("brand_id", brand_id);
    }

    formData.append("product_publisher_id", user?._id);
    formData.append("category_id", category_id);
    const response = await fetch(
      `${BASE_URL}/product/?role_type=product_create`,
      {
        method: "POST",
        credentials: "include",

        body: formData,
      }
    );
    const result = await response.json();
    if (result?.statusCode === 200 && result?.success === true) {
      toast.success(
        result?.message ? result?.message : "product created successfully",
        {
          autoClose: 1000,
        }
      );
      setLoading(false);
    } else {
      toast.error(result?.message || "Something went wrong", {
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  if (categoryLoading || brandLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <div className="pl-6 max-h-[100vh]  mt-3">
        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div className="grid grid-cols-2 gap-5">
            <div className="mt-2">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Product Name <span className="text-red-500">*</span>
              </label>

              <input
                {...register("product_name", {
                  required: "Product Name is required",
                })}
                type="text"
                placeholder="Product Name"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.product_name && (
                <p className="text-red-600">{errors.product_name?.message}</p>
              )}
            </div>

            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-700">
                Product Stock Low Alert
              </label>

              <input
                {...register("product_stock_low_alert", {
                  validate: (value) => {
                    if (value < 0) {
                      return "  Product Stock Low Alert be getter than 0";
                    }
                  },
                })}
                type="number"
                placeholder="Product Stock Low Alert"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Product Id
              </label>

              <input
                {...register("product_id")}
                type="text"
                placeholder="Product Id"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Product Unit <span className="text-red-500">*</span>
              </label>

              <input
                {...register("product_unit", {
                  required: "Product Unit is required",
                })}
                type="text"
                placeholder="Product Unit"
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.product_unit && (
                <p className="text-red-600">{errors.product_unit?.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                Category Name <span className="text-red-500">*</span>
              </label>

              <Select
                id="category_id"
                name="category_id"
                aria-label="Category Name"
                isClearable
                required
                options={categoryTypes?.data}
                getOptionLabel={(x) => x?.category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setCategory_id(selectedOption?._id);
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                Brand Name
              </label>

              <Select
                id="brand_id"
                name="brand_id"
                aria-label="Brand Name"
                options={brandTypes?.data}
                getOptionLabel={(x) => x?.brand_name}
                isClearable
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setBrand_id(selectedOption?._id);
                }}
              />
            </div>

            <div className="">
              <label className="block text-xs font-medium text-gray-700">
                Product Status
              </label>
              <select
                {...register("product_status")}
                className="mt-1 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-6">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Product Details
              </label>

              <textarea
                {...register("product_details")}
                type="text"
                rows={5}
                placeholder="Product Details"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            {/* ------Image Of Product------- */}

            <div className="mt-6">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Product Image
              </label>
              {imagePreview ? (
                <>
                  <div className="relative">
                    <button
                      type="button"
                      className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 "
                      onClick={clearImagePreview}
                    >
                      <RxCross1 size={15}></RxCross1>
                    </button>
                    {/* Image Preview */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover my-2 rounded"
                    />
                  </div>
                </>
              ) : (
                <>
                  <label
                    className="mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer"
                    htmlFor="product_image"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <RiImageAddFill size={25} />
                      </div>
                      <p className="mt-2 text-[#C9CACA]">upload image</p>
                    </div>
                  </label>
                </>
              )}
              <input
                {...register("product_image", {
                  required: "Image is Required",
                  valiDate: {
                    isImage: (value) =>
                      (value[0] && value[0].type.startsWith("image/")) ||
                      "Only image files are allowed",
                  },
                })}
                accept="image/*"
                type="file"
                id="product_image"
                ref={fileInputRef}
                className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                onChange={handleImageChange}
              />
              <p className="text-xs text-[#C9CACA]  text-end">
                Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                MB).
              </p>
              {errors.product_image && (
                <p className="text-red-600">{errors.product_image?.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-3">
            {loading == true ? (
              <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
                <MiniSpinner />
              </div>
            ) : (
              <Button type="submit" className="mb-4">
                Create Product
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
