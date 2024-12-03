import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const UpdateProductUnit = ({
  setproduct_unitUpdateModal,
  refetch,
  user,
  product_unitUpdateData,
}) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  //handle Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        _id: product_unitUpdateData?._id,
        product_unit_updated_by: user?._id,
        product_unit_name: data?.product_unit_name
          ? data?.product_unit_name
          : product_unitUpdateData?.product_unit_name,
        product_unit_status: data?.product_unit_status
          ? data?.product_unit_status
          : product_unitUpdateData?.product_unit_status,
      };

      const response = await fetch(`${BASE_URL}/product_unit`, {
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
          result?.message
            ? result?.message
            : "Product Unit Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setproduct_unitUpdateModal(false);
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
                Update Product Unit
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setproduct_unitUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  product unit Name <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("product_unit_name")}
                  type="text"
                  defaultValue={product_unitUpdateData?.product_unit_name}
                  placeholder="product_unit Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  product unit Status
                </label>
                <select
                  {...register("product_unit_status")}
                  defaultValue={product_unitUpdateData?.product_unit_status}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
              </div>

              <div className="flex justify-end mt-3">
                {loading == true ? (
                  <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
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
export default UpdateProductUnit;
