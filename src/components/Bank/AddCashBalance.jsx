import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const AddCashBalance = ({ setCashCreateModal, cashRefetch, user }) => {
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
        cash_publisher_id: user?._id,
        cash_balance: data?.cash_balance,
      };

      const response = await fetch(`${BASE_URL}/cash`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "cash updated successfully",
          {
            autoClose: 1000,
          }
        );
        cashRefetch();
        setLoading(false);
        setCashCreateModal(false);
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
                Cash Balance
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setCashCreateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Cash Balance <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("cash_balance", {
                    required: " Cash Balance is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Balance must be greater than 0 or equal 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter cash Balance"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.cash_balance && (
                  <p className="text-red-600">{errors.cash_balance?.message}</p>
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

export default AddCashBalance;
