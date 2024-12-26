import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { RxCross1 } from "react-icons/rx";

const MakePaymentModal = ({
  makepaymentModalData,
  setMakepaymentModalOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  console.log(makepaymentModalData);

  //Payment Data Post
  const handleDataPost = (data) => {
    console.log(data);
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
              Salaray Sheet Payment
            </h3>
            <button
              type="button"
              className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
              onClick={() => setMakepaymentModalOpen(false)}
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
                  {...register("employe_name")}
                  type="text"
                  placeholder="Employe Name"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Basic Salary
                </label>

                <input
                  {...register("basic_salary")}
                  type="text"
                  placeholder="Basic Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Total Allowance
                </label>

                <input
                  {...register("total_allowance")}
                  type="text"
                  placeholder="Total Allowance"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Total Deduction
                </label>

                <input
                  {...register("total_deduction")}
                  type="text"
                  placeholder="Total Deduction"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Gross Salary
                </label>

                <input
                  {...register("gross_salary")}
                  type="text"
                  placeholder="Gross Salary"
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
              </div>
              <div>
                <label className="block  font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  {...register("payment_method")}
                  //value={}
                  //onChange={(e) => setCouponType(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                >
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
            </div>
            <div className="mt-2 sm:mt-4">
              <label className="block  font-medium text-gray-700">
                Comments
              </label>

              <textarea
                {...register("comments")}
                type="text"
                placeholder="Add Yours Comments"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
            </div>

            <div className="flex justify-end mt-3">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <Button type="submit" className="px-10 text-lg">
                  Pay
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentModal;
