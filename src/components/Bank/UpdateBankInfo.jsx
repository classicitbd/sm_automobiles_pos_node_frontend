import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const UpdateBankInfo = ({
  setBankAccountUpdateModal,
  bankAccountUpdateData,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [balanceUpdateValue, setBalanceUpdateValue] = useState();

  const { register, handleSubmit } = useForm();

  //Handle Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        _id: bankAccountUpdateData?._id,
        bank_updated_by: user?._id,
        account_name: data?.account_name
          ? data?.account_name
          : bankAccountUpdateData?.account_name,
      };

      if (balanceUpdateValue) {
        sendData.bank_balance = parseFloat(balanceUpdateValue);
        sendData.previous_balance = parseFloat(
          bankAccountUpdateData?.bank_balance
        );
      }

      if (
        sendData?.bank_balance &&
        sendData?.previous_balance &&
        sendData?.bank_balance <= sendData?.previous_balance
      ) {
        toast.error("Bank Balance should be greater than previous balance", {
          autoClose: 1000,
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/bank`, {
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
        setBankAccountUpdateModal(false);
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
                Update Bank Info
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setBankAccountUpdateModal(false)}
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
                  Account Name
                </label>

                <input
                  {...register("account_name")}
                  required
                  defaultValue={bankAccountUpdateData?.account_name}
                  type="text"
                  placeholder="Account Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div className="mt-2 mb-8">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Account Balance
                </label>

                <input
                  {...register("bank_balance")}
                  defaultValue={bankAccountUpdateData?.bank_balance}
                  onChange={(e) => setBalanceUpdateValue(e.target.value)}
                  required
                  type="number"
                  placeholder="Account Balance"
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

export default UpdateBankInfo;
