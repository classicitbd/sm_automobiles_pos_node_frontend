import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const AddCustomers = ({ setCustomersCreateModal, refetch, user }) => {
  const [loading, setLoading] = useState(false);
  const [amountType, setAmountType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get token
  // const token = getCookie(authKey);

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      // if (!amountType) {
      //   toast.error("Please select amount type", {
      //     autoClose: 1000,
      //   });
      //   setLoading(false);
      //   return;
      // }
      // if (amountType === "toReceive") {
      //   data.customer_wallet = parseFloat(data?.customer_wallet * -1);
      // }
      const sendData = {
        customer_publisher_id: user?._id,
        customer_name: data?.customer_name,
        customer_phone: data?.customer_phone,
        customer_address: data?.customer_address,
        // customer_wallet: parseFloat(data?.customer_wallet),
        customer_status: data?.customer_status,
      };

      const response = await fetch(
        `${BASE_URL}/customer`,
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
          result?.message ? result?.message : "Customer created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setCustomersCreateModal(false);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title "
            >
              Add Customers Info
            </h3>
            <button
              type="button"
              className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
              onClick={() => setCustomersCreateModal(false)}
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
                Customers Name <span className="text-red-500">*</span>
              </label>

              <input
                {...register("customer_name", {
                  required: "Customer name is required",
                })}
                type="text"
                placeholder="Customers Name"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.customer_name && (
                <p className="text-red-600">{errors.customer_name?.message}</p>
              )}
            </div>
            <div className="mt-2">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Customer Address
              </label>

              <input
                {...register("customer_address")}
                type="text"
                placeholder="Customer Address"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Customer Phone
              </label>

              <input
                {...register("customer_phone", {
                  required: "Customer phone is required",
                })}
                type="number"
                placeholder="Customer Phone"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.customer_phone && (
                <p className="text-red-600">{errors.customer_phone?.message}</p>
              )}
            </div>
            {/* <div className="mt-4">
              <p>Opening Balance Type :</p>
              <div className="flex items-center gap-1 mt-2">
                <div
                  onClick={() => setAmountType("toPay")}
                  className="relative"
                >
                  <input
                    className="absolute top-[11px] left-5 peer"
                    id="toPay"
                    type="radio"
                    tabIndex="-1"
                    name="payment"
                  />
                  <label
                    htmlFor="toPay"
                    className="w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-yellowColor peer-checked:bg-logoColor flex justify-between items-center"
                    tabIndex="0"
                  >
                    <span className="lg:text-sm text-[10px] pl-10">
                      To Pay{" "}
                    </span>
                  </label>
                </div>

                <div
                  onClick={() => setAmountType("toReceive")}
                  className="relative"
                >
                  <input
                    className="absolute top-[11px] left-5 peer"
                    id="toReceive"
                    type="radio"
                    tabIndex="-1"
                    name="payment"
                  />
                  <label
                    htmlFor="toReceive"
                    className="w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-yellowColor peer-checked:bg-logoColor flex justify-between items-center"
                    tabIndex="0"
                  >
                    <span className="lg:text-sm text-[10px] pl-10">
                      To Receive
                    </span>
                  </label>
                </div>
              </div>

              <label
                htmlFor="customer_wallet"
                className="block text-xs font-medium text-gray-700 mt-4"
              >
                Customer Wallet Amount
              </label>

              <input
                {...register("customer_wallet", {
                  required: "Customer Wallet Amount is required",
                })}
                type="number"
                min={0}
                id="customer_wallet"
                defaultValue={0}
                placeholder="Enter Customer Wallet Amount"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.customer_wallet && (
                <p className="text-red-600 text-sm">
                  {errors.customer_wallet?.message}
                </p>
              )}
            </div> */}

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-700">
                Customer Status
              </label>
              <select
                {...register("customer_status", {
                  required: "Customer status is required",
                })}
                className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
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
  );
};

export default AddCustomers;
