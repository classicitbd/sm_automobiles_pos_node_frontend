//import { BASE_URL } from "@/utils/baseURL";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
//import { toast } from "react-toastify";

const OrderUpDateModal = ({
  setOrderUpdateModal,
  orderUpdateModalData,
  refetch,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  console.log(orderUpdateModalData);

  // Handle Update Category
  const handleDataPost = async (data) => {
    console.log(data);

    //setLoading(true);
    // try {
    //   const sendData = {
    //     _id: orderUpdateModalData?._id,
    //     category_updated_by: user?._id,
    //   };

    //   const response = await fetch(`${BASE_URL}`, {
    //     method: "PATCH",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(sendData),
    //   });
    //   const result = await response.json();
    //   if (result?.statusCode === 200 && result?.success === true) {
    //     toast.success(
    //       result?.message ? result?.message : "Order Update successfully",
    //       {
    //         autoClose: 1000,
    //       }
    //     );
    //     refetch();
    //     setLoading(false);
    //     setOrderUpdateModal(false);
    //   } else {
    //     toast.error(result?.message || "Something went wrong", {
    //       autoClose: 1000,
    //     });
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   toast.error(error?.message, {
    //     autoClose: 1000,
    //   });
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="text-[26px] font-bold text-gray-800 capitalize"
                id="modal-title"
              >
                Update Order
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 "
                onClick={() => setOrderUpdateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              <div>
                <label
                  htmlFor="UserEmail"
                  className="block text-xs font-medium text-gray-700"
                >
                  Customer Name
                </label>

                <input
                  {...register("customer_name")}
                  type="text"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  placeholder="Customer Name"
                />
              </div>

              <div className="flex gap-8 mt-6 justify-end">
                {loading ? (
                  <div className="px-10 py-2  bg-primary text-white rounded flex justify-center items-center">
                    <MiniSpinner />
                  </div>
                ) : (
                  <Button type="Submit">Update</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUpDateModal;
