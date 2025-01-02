import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const SalaryUpdateModal = ({
  salaryUpdateModaldata,
  setSalaryUpdateModalOpen,
  user,
  refetch
}) => {
  const [loading, setLoading] = useState(false);
  const [addOrDeductType, setAddOrDeductType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Payment Data Post
  const handleDataPost = async (data) => {
    setLoading(true);
    if (!addOrDeductType) {
      toast.error("Please select add or deduct type", {
        autoClose: 1000,
      });
      setLoading(false);
      return;
    }
    try {
      const sendData = {
        _id: salaryUpdateModaldata?._id,
        salary_note: data?.salary_note,
        salary_updated_by: user?._id,
      };
      if (addOrDeductType === "toAdd") {
        sendData.add_or_deduct_amount =
          parseFloat(salaryUpdateModaldata?.add_or_deduct_amount) +
          parseFloat(data?.add_or_deduct_amount);
        sendData.grand_total_amount = parseFloat(
          parseFloat(salaryUpdateModaldata?.grand_total_amount) +
            parseFloat(data?.add_or_deduct_amount)
        );
        sendData.due_amount = parseFloat(
          parseFloat(salaryUpdateModaldata?.due_amount) +
            parseFloat(data?.add_or_deduct_amount)
        );
        sendData.salary_status = "unpaid";
      } else {
        sendData.add_or_deduct_amount =
          parseFloat(salaryUpdateModaldata?.add_or_deduct_amount) +
          parseFloat(-data?.add_or_deduct_amount);
        sendData.grand_total_amount = parseFloat(
          parseFloat(salaryUpdateModaldata?.grand_total_amount) -
            parseFloat(data?.add_or_deduct_amount)
        );
        sendData.due_amount = parseFloat(
          parseFloat(salaryUpdateModaldata?.due_amount) -
            parseFloat(data?.add_or_deduct_amount)
        );
        sendData.salary_status =
          parseFloat(salaryUpdateModaldata?.due_amount) -
            parseFloat(data?.add_or_deduct_amount) ==
          0
            ? "paid"
            : "unpaid";
      }

      const response = await fetch(`${BASE_URL}/salary`, {
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
          result?.message ? result?.message : "Salary updated successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setSalaryUpdateModalOpen(false);
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
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title "
            >
              Update Salary
            </h3>
            <button
              type="button"
              className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
              onClick={() => setSalaryUpdateModalOpen(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />
          <form onSubmit={handleSubmit(handleDataPost)} className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              {" "}
              <div>
                <label className="block  font-medium text-gray-700">
                  Employe Name
                </label>
                <input
                  type="text"
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.user_id?.user_name}
                  placeholder="Employe Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Employe Phone
                </label>
                <input
                  type="text"
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.user_id?.user_phone}
                  placeholder="Employe Phone"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Salary Month
                </label>
                <input
                  type="month"
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.salary_month}
                  placeholder="Salary Month"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Basic Salary
                </label>

                <input
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.basic_salary}
                  type="number"
                  placeholder="Basic Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Commision
                </label>
                <input
                  type="number"
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.commision_amount}
                  placeholder="Commision"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Total Salary
                </label>
                <input
                  type="text"
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.grand_total_amount}
                  placeholder="Total Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Received Salary
                </label>

                <input
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.received_amount}
                  type="number"
                  placeholder="Received Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Due Salary
                </label>

                <input
                  disabled
                  readOnly
                  value={salaryUpdateModaldata?.due_amount}
                  type="number"
                  placeholder="Due Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block  font-medium text-gray-700">
                Previous Add Or Deduct
              </label>
              <input
                type="text"
                disabled
                readOnly
                value={salaryUpdateModaldata?.add_or_deduct_amount}
                placeholder="Previous Add Or Deduct"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>

            <p className="mt-4">Add Or Deduct :</p>
            <div className="flex items-center gap-1 mt-2">
              <div
                onClick={() => setAddOrDeductType("toAdd")}
                className="relative"
              >
                <input
                  className="absolute top-[11px] left-5 peer"
                  id="toAdd"
                  type="radio"
                  tabIndex="-1"
                  name="payment"
                />
                <label
                  htmlFor="toAdd"
                  className="w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-yellowColor peer-checked:bg-logoColor flex justify-between items-center"
                  tabIndex="0"
                >
                  <span className="lg:text-sm text-[10px] pl-10">
                    Add Salary{" "}
                  </span>
                </label>
              </div>

              <div
                onClick={() => setAddOrDeductType("toDeduct")}
                className="relative"
              >
                <input
                  className="absolute top-[11px] left-5 peer"
                  id="toDeduct"
                  type="radio"
                  tabIndex="-1"
                  name="payment"
                />
                <label
                  htmlFor="toDeduct"
                  className="w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-yellowColor peer-checked:bg-logoColor flex justify-between items-center"
                  tabIndex="0"
                >
                  <span className="lg:text-sm text-[10px] pl-10">
                    Deduct Salary
                  </span>
                </label>
              </div>
            </div>

            <label
              htmlFor="add_or_deduct_amount"
              className="block text-xs font-medium text-gray-700 mt-4"
            >
              {addOrDeductType
                ? addOrDeductType == "toAdd"
                  ? "Add Amount"
                  : "Deduct Amount"
                : "Please Choose Add Or Deduct Type"}
            </label>

            <input
              {...register("add_or_deduct_amount", {
                required: "Add Or Deduct Amount is required",
              })}
              type="number"
              min={1}
              id="add_or_deduct_amount"
              defaultValue={0}
              max={
                addOrDeductType === "toDeduct"
                  ? salaryUpdateModaldata?.due_amount
                  : undefined
              }
              placeholder="Enter Add Or Deduct Amount"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.add_or_deduct_amount && (
              <p className="text-red-600 text-sm">
                {errors.add_or_deduct_amount?.message}
              </p>
            )}

            <div className="mt-2 sm:mt-4">
              <label className="block  font-medium text-gray-700">
                Comments
              </label>

              <textarea
                {...register("salary_note", {
                  required: "Comments is required",
                })}
                type="text"
                placeholder="Add Yours Comments"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.salary_note && (
                <p className="text-red-600 text-sm">
                  {errors.salary_note?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-3">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <Button type="submit" className="px-10 text-lg">
                  Update
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalaryUpdateModal;
