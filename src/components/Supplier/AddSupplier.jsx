import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { toast } from "react-toastify";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { BASE_URL } from "../../utils/baseURL";

const AddSupplier = ({ setOpenAddModal, refetch, user }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleDataPost = async (data) => {
    setLoading(true);

    if (!data?.supplier_email && !data?.supplier_phone) {
      setLoading(false);
      return toast.error(
        "Please fill up Email or Phone number fields for Register new Staff",
        {
          autoClose: 1000,
        }
      );
    }

    const sendData = {
      supplier_name: data?.supplier_name,
      supplier_email: data?.supplier_email,
      supplier_status: data?.supplier_status,
      supplier_phone: data?.supplier_phone,
      supplier_address: data?.supplier_address,
      panel_owner_id: user?.panel_owner_id?._id
        ? user?.panel_owner_id?._id
        : user?._id,
      supplier_publisher_id: user?._id,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/supplier?role_type=supplier_create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Supplier created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setOpenAddModal(false);
        reset();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
      console.log(error);
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
              id="modal-title"
            >
              Add Supplier
            </h3>
            <button
              type="button"
              className="btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3"
              onClick={() => setOpenAddModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />

          <form onSubmit={handleSubmit(handleDataPost)} className="">
            <div>
              <label
                htmlFor="supplier_name"
                className="block text-xs font-medium text-gray-700"
              >
                Supplier Name
              </label>

              <input
                {...register("supplier_name", {
                  required: "Supplier name is required",
                })}
                type="text"
                id="supplier_name"
                placeholder="Enter Supplier name"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.supplier_name && (
                <p className="text-red-600 text-sm">
                  {errors.supplier_name?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="supplier_email"
                className="block text-xs font-medium text-gray-700 mt-2"
              >
                Supplier Email
              </label>

              <input
                {...register("supplier_email")}
                type="text"
                id="supplier_email"
                placeholder="Enter Supplier email"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>
            <div>
              <label
                htmlFor="supplier_phone"
                className="block text-xs font-medium text-gray-700 mt-2"
              >
                Supplier Phone
              </label>

              <input
                {...register("supplier_phone", {
                  validate: {
                    isPhone: (value) =>
                      !value ||
                      (value.length >= 7 && value.length <= 14) ||
                      "Invalid phone number",
                  },
                })}
                type="number"
                id="supplier_phone"
                placeholder="Enter Supplier phone"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="supplier_address"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Supplier Address
              </label>
              <textarea
                rows="5"
                {...register("supplier_address")}
                id="supplier_address"
                placeholder="Enter supplier Address"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>

            <div className="mt-4 flex-1">
              <label
                htmlFor="supplier_status"
                className="block text-xs font-medium text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register("supplier_status", {
                  required: " Status is required",
                })}
                className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
              >
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.supplier_status && (
                <p className="text-red-600 text-sm">
                  {errors.supplier_status.message}
                </p>
              )}
            </div>

            <div className="flex gap-6 mt-6 justify-end">
              <button
                className="px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor"
                onClick={() => setOpenAddModal(false)}
                type="button"
              >
                Cancel
              </button>
              {loading ? (
                <div className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm rounded">
                  Loading... <MiniSpinner />
                </div>
              ) : (
                <button
                  className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm rounded"
                  type="submit"
                >
                  Add Supplier
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
