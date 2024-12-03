import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import useGetSupplier from "@/hooks/useGetSupplier";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";

const AddSupplierPayment = () => {
  const [loading, setLoading] = useState(false);
  const [supplier_id, setSupplier_id] = useState(null);
  const [payment_bank_id, setPayment_bank_id] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //get bank data
  const { data: bankTypes = [], isLoading } = useQuery({
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/bank`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text(); // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow to propagate the error to react-query
      }
    },
  });

  //get supplier data
  const { data: supplierTypes, isLoading: supplierLoading } = useGetSupplier();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        supplier_payment_publisher_id: user?._id,
        supplier_id: supplier_id,
        reference_id: data?.reference_id,
        payment_bank_id: payment_bank_id,
        supplier_payment_title: data?.supplier_payment_title,
        supplier_payment_description: data?.supplier_payment_description,
        supplier_payment_date: data?.supplier_payment_date,
        supplier_payment_amount: data?.supplier_payment_amount,
      };
      const response = await fetch(
        `${BASE_URL}/supplier_payment?role_type=supplier_payment_create`,
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
            : "Supplier Payment created successfully",
          {
            autoClose: 1000,
          }
        );
        setLoading(false);
        reset();
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

  if (isLoading || supplierLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <div>
        <div className="">
          <div className="">
            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Supplier Payment Title <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("supplier_payment_title", {
                    required: " Payment Title is required",
                  })}
                  type="text"
                  placeholder="Supplier Payment Title"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.supplier_payment_title && (
                  <p className="text-red-600">
                    {errors.supplier_payment_title.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Supplier Payment Date<span className="text-red-500">*</span>
                </label>

                <input
                  {...register("supplier_payment_date", {
                    required: "Date is Required",
                  })}
                  type="date"
                  placeholder="Supplier Payment Date"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.supplier_payment_date && (
                  <p className="text-red-600">
                    {errors.supplier_payment_date.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Supplier Payment amount
                  <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("supplier_payment_amount", {
                    required: " Payment amount is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Payment amount"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.supplier_payment_amount && (
                  <p className="text-red-600">
                    {errors.supplier_payment_amount.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Reference ID<span className="text-red-500">*</span>
                </label>

                <input
                  {...register("reference_id", {
                    required: "Reference ID required",
                  })}
                  type="text"
                  placeholder="Reference ID"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.reference_id && (
                  <p className="text-red-600">{errors.reference_id.message}</p>
                )}
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                  Supplier Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="supplier_id"
                  name="supplier_id"
                  required
                  aria-label="Supplier Name"
                  options={supplierTypes?.data}
                  getOptionLabel={(x) => x?.supplier_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setSupplier_id(selectedOption?._id)
                  }
                ></Select>
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                  Payment Bank Name
                </label>

                <Select
                  id="payment_bank_id"
                  name="payment_bank_id"
                  aria-label="Bank Type"
                  isClearable
                  required
                  options={bankTypes?.data}
                  getOptionLabel={(x) => x?.bank_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) =>
                    setPayment_bank_id(selectedOption?._id)
                  }
                ></Select>
              </div>

              <div className="flex justify-end mt-3">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
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

export default AddSupplierPayment;
