import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const UpdateCashModal = ({
  setCashUpdateModal,
  cashUpdateModalValue,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  //Handle Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        _id: cashUpdateModalValue?._id,
        cash_updated_by: user?._id,
        cash_balance: data?.cash_balance
          ? data?.cash_balance
          : cashUpdateModalValue?.cash_balance,
        previous_balance: cashUpdateModalValue?.cash_balance,
      };

      if (sendData?.cash_balance <= sendData?.previous_balance) {
        toast.error("Cash Balance should be greater than previous balance", {
          autoClose: 1000,
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/cash?role_type=cash_update`, {
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
          result?.message ? result?.message : "Bank Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setCashUpdateModal(false);
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
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="text-[26px] font-bold text-gray-800 capitalize"
                id="modal-title "
              >
                Update Cash Balance
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setCashUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div className="mt-2 mb-8">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Cash Amount
                </label>

                <input
                  {...register("cash_balance")}
                  defaultValue={cashUpdateModalValue?.cash_balance}
                  required
                  type="text"
                  placeholder="Cash Amount"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>

              <div className="flex justify-end mt-3">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button type="submit">Update</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCashModal;
