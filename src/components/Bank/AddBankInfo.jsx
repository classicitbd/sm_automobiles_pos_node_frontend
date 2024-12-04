import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const AddBankInfo = ({ setBankAccountCreateModal, refetch, user }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get token
  // const token = getCookie(authKey);
  // Handle Add Category

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        bank_publisher_id: user?._id,
        account_name: data?.account_name,
        account_no: data?.account_no,
        bank_name: data?.bank_name,
        bank_balance: data?.bank_balance,
      };

      const response = await fetch(`${BASE_URL}/bank?role_type=bank_create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Bank created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setBankAccountCreateModal(false);
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

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="text-[26px] font-bold text-gray-800 capitalize"
                id="modal-title "
              >
                Add Bank Info
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setBankAccountCreateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Account Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("account_name", {
                    required: "Account name is required",
                  })}
                  type="text"
                  placeholder="Account Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.account_name && (
                  <p className="text-red-600">{errors.account_name?.message}</p>
                )}
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Account NO <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("account_no", {
                    required: "Account no is required",
                  })}
                  type="text"
                  placeholder="Account No"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.account_no && (
                  <p className="text-red-600">{errors.account_no?.message}</p>
                )}
              </div>
              <div className="mt-2">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Bank Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("bank_name", {
                    required: "Bank name is required",
                  })}
                  type="text"
                  placeholder="Bank Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.bank_name && (
                  <p className="text-red-600">{errors.bank_name?.message}</p>
                )}
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Bank Balance <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("bank_balance", {
                    required: " Bank Balance is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Balance must be greater than 0 or equal 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Bank Balance"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.bank_balance && (
                  <p className="text-red-600">{errors.bank_balance?.message}</p>
                )}
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

export default AddBankInfo;
