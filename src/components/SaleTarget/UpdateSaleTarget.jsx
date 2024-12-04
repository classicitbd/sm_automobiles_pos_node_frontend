import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const UpdateSaleTarget = ({
  setSaleTargetUpdateModal,
  refetch,
  user,
  saleTargetUpdateData,
  settingData,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        _id: saleTargetUpdateData?._id,
        sale_target_updated_by: user?._id,
        sale_target: data?.sale_target,
        sale_target_amount: data?.sale_target_amount,
      };

      const response = await fetch(
        `${BASE_URL}/sale_target?role_type=sale_target_update`,
        {
          method: "PATCH",
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
            : "Sales target updated successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setSaleTargetUpdateModal(false);
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
                Update Sale Target
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setSaleTargetUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  User Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="user_name"
                  value={
                    saleTargetUpdateData?.user_id?.user_name +
                    " " +
                    "(" +
                    saleTargetUpdateData?.user_id?.user_phone +
                    ")"
                  }
                  disabled
                  readOnly={true}
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Sales Target Start Date{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={saleTargetUpdateData?.sale_target_start_date}
                    disabled
                    readOnly={true}
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.sale_target_start_date && (
                    <p className="text-red-600">
                      {errors.sale_target_start_date?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Sales Target End Date{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={saleTargetUpdateData?.sale_target_end_date}
                    disabled
                    readOnly={true}
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.sale_target_end_date && (
                    <p className="text-red-600">
                      {errors.sale_target_end_date?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  Sale Target <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-4">
                  <input
                    {...register("sale_target", {
                      required: "Sale Target is required",
                    })}
                    type="number"
                    min={1}
                    defaultValue={saleTargetUpdateData?.sale_target}
                    placeholder="Sale Target"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  <p className="font-semibold text-[18px]">
                    {settingData?.unit_name}
                  </p>
                </div>
                {errors.sale_target && (
                  <p className="text-red-600">{errors.sale_target?.message}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  Get Amount <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("sale_target_amount", {
                    required: "Get Amount is required",
                  })}
                  type="number"
                  min={1}
                  defaultValue={saleTargetUpdateData?.sale_target_amount}
                  placeholder="Get Amount"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.sale_target_amount && (
                  <p className="text-red-600">
                    {errors.sale_target_amount?.message}
                  </p>
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
export default UpdateSaleTarget;
