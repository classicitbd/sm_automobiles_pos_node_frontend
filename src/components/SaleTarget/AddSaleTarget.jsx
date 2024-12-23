import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import Select from "react-select";

const AddSaleTarget = ({
  setSaleTargetCreateModal,
  refetch,
  user,
  settingData,
  userTypes,
  brandTypes,
}) => {
  const [loading, setLoading] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [brand_id, setBrand_id] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch the start and end date values
  const sale_target_start_date = watch("sale_target_start_date");

  //handle Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        sale_target_publisher_id: user?._id,
        user_id,
        sale_target_start_date: data?.sale_target_start_date,
        sale_target_end_date: data?.sale_target_end_date,
        brand_id: brand_id,
        brand_sale_target: parseFloat(data?.brand_sale_target),
        brand_sale_target_fillup: 0,
        brand_sale_target_success: false,
        sale_target: parseFloat(data?.sale_target),
        sale_target_fillup: 0,
        sale_target_success: false,
        first_half_amount_per_unit: parseFloat(
          data?.first_half_amount_per_unit
        ),
        second_half_amount_per_unit: parseFloat(
          data?.second_half_amount_per_unit
        ),
      };

      const response = await fetch(
        `${BASE_URL}/sale_target?role_type=sale_target_create`,
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
            : "Sales target created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setSaleTargetCreateModal(false);
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

  // user search
  const customFilter = (option, inputValue) => {
    const userNameMatch = option?.data?.user_name
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    const userPhoneMatch = option?.data?.user_phone
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
    return userNameMatch || userPhoneMatch;
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
                Create Sales Target
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setSaleTargetCreateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="">
              {/* user details */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  User Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="user_id"
                  name="user_id"
                  aria-label="User Name"
                  isClearable
                  required
                  options={userTypes?.data}
                  getOptionLabel={(x) => `${x.user_name} (${x.user_phone})`}
                  getOptionValue={(x) => x._id}
                  onChange={(selectedOption) => {
                    setUser_id(selectedOption?._id);
                  }}
                  filterOption={customFilter} // Custom filtering by name and phone
                  placeholder="Search by name or phone"
                  noOptionsMessage={() => "No users found"}
                />
              </div>

              {/* time */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Sales Target Start Date{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    {...register("sale_target_start_date", {
                      required: "Sales Target Start Date is required",
                      validate: {
                        validDate: (value) =>
                          !isNaN(new Date(value)) || "Invalid start date",
                      },
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
                    placeholder="Sales Target Start Date"
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
                    {...register("sale_target_end_date", {
                      required: "Sales Target End Date is required",
                      validate: {
                        validDate: (value) =>
                          !isNaN(new Date(value)) || "Invalid end date",
                        sameMonth: (value) => {
                          if (!sale_target_start_date) return true; // Skip validation if start date is not set
                          const start = new Date(sale_target_start_date);
                          const end = new Date(value);
                          return (
                            (start.getMonth() === end.getMonth() &&
                              start.getFullYear() === end.getFullYear()) ||
                            "Start and end dates must be in the same month"
                          );
                        },
                        validRange: (value) => {
                          if (!sale_target_start_date) return true; // Skip validation if start date is not set
                          const start = new Date(sale_target_start_date);
                          const end = new Date(value);
                          return (
                            end >= start ||
                            "End date must be after the start date"
                          );
                        },
                      },
                    })}
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
                    placeholder="Sales Target End Date"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  {errors.sale_target_end_date && (
                    <p className="text-red-600">
                      {errors.sale_target_end_date?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* brand */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>

                <Select
                  id="brand_id"
                  name="brand_id"
                  aria-label="Brand Name"
                  isClearable
                  required
                  options={brandTypes?.data}
                  getOptionLabel={(x) => x.brand_name}
                  getOptionValue={(x) => x._id}
                  onChange={(selectedOption) => {
                    setBrand_id(selectedOption?._id);
                  }}
                  placeholder="Search by name"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  Brand Sale Target <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-4">
                  <input
                    {...register("brand_sale_target", {
                      required: "Brand Sale Target is required",
                    })}
                    type="number"
                    min={1}
                    placeholder="Brand Sale Target"
                    className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                  />
                  <p className="font-semibold text-[18px]">
                    {settingData?.unit_name}
                  </p>
                </div>
                {errors.brand_sale_target && (
                  <p className="text-red-600">
                    {errors.brand_sale_target?.message}
                  </p>
                )}
              </div>

              {/* other sale target */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  Other Sale Target <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-4">
                  <input
                    {...register("sale_target", {
                      required: "Other Sale Target is required",
                    })}
                    type="number"
                    min={1}
                    placeholder="Other Sale Target"
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

              {/* first and secons half amount */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  First Half Get Amount{" "}
                  <span className="text-red-500">(* per liter)</span>
                </label>

                <input
                  {...register("first_half_amount_per_unit", {
                    required: "First Half Get Amount Per Liter is required",
                  })}
                  type="number"
                  min={1}
                  placeholder="First Half Get Amount Per Liter"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.first_half_amount_per_unit && (
                  <p className="text-red-600">
                    {errors.first_half_amount_per_unit?.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700">
                  Second Half Get Amount{" "}
                  <span className="text-red-500">(* per liter)</span>
                </label>

                <input
                  {...register("second_half_amount_per_unit", {
                    required: "Second Half Get Amount Per Liter is required",
                  })}
                  type="number"
                  min={1}
                  placeholder="Second Half Get Amount Per Liter"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.second_half_amount_per_unit && (
                  <p className="text-red-600">
                    {errors.second_half_amount_per_unit?.message}
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

export default AddSaleTarget;
