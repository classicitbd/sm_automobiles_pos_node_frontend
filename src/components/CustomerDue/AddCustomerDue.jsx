import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import Select from "react-select";
import { Button } from "../ui/button";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import useGetCustomer from "@/hooks/useGetCustomer";
import { AuthContext } from "@/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const AddCustomerDue = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [customer_id, setCustomer_id] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //get customer data
  const { data: customerTypes, isLoading: customerLoading } = useGetCustomer();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        customer_due_publisher_id: user?._id,
        due_note: data?.due_note,
        due_amount: data?.due_amount,
        customer_id: customer_id,
      };
      const response = await fetch(
        `${BASE_URL}/customer_due?role_type=customer_due_create`,
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

  if (customerLoading) {
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
                  Due Note
                </label>

                <input
                  {...register("due_note")}
                  type="text"
                  placeholder="Due Note"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>

              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Due amount <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("due_amount", {
                    required: "Due amount is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Due amount"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.due_amount && (
                  <p className="text-red-600">{errors.due_amount.message}</p>
                )}
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="customer_id"
                  name="customer_id"
                  aria-label="Customer Name"
                  required
                  options={customerTypes?.data}
                  getOptionLabel={(x) => x?.customer_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setCustomer_id(selectedOption?._id);
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

export default AddCustomerDue;
