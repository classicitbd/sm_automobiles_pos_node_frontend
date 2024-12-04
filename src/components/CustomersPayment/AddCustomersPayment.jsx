//import { BASE_URL } from '@/utils/baseURL'
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import Select from "react-select";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import useGetCustomer from "@/hooks/useGetCustomer";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";
//import { toast } from 'react-toastify'

const AddCustomersPayment = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [customer_id, setCustomer_id] = useState("");
  const [payment_bank_id, setPayment_bank_id] = useState("");
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

  //get customer data
  const { data: customerTypes, isLoading: customerLoading } = useGetCustomer();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        customer_payment_publisher_id: user?._id,
        transaction_id: data?.transaction_id,
        payment_note: data?.payment_note,
        payment_amount: data?.payment_amount,
        customer_id: customer_id,
        payment_bank_id: payment_bank_id,
      };
      const response = await fetch(
        `${BASE_URL}/customer_payment?role_type=customer_payment_create`,
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

  if (isLoading || customerLoading) {
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
                  Transaction id No
                </label>

                <input
                  {...register("transaction_id")}
                  type="text"
                  placeholder="Transaction id No"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Payment Note
                </label>

                <input
                  {...register("payment_note")}
                  type="text"
                  placeholder="Payment Note"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>

              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Payment amount <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("payment_amount", {
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
                {errors.payment_amount && (
                  <p className="text-red-600">
                    {errors.payment_amount.message}
                  </p>
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
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                  Payment Bank Name
                </label>

                <Select
                  id="payment_bank_id"
                  name="payment_bank_id"
                  aria-label="Payment Bank Name"
                  options={bankTypes?.data}
                  getOptionLabel={(x) => x?.bank_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setPayment_bank_id(selectedOption?._id);
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

export default AddCustomersPayment;
