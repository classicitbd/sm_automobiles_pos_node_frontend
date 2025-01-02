import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";
import useGetBank from "@/hooks/useGetbank";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import Select from "react-select";

const MakePaymentModal = ({
  setMakepaymentModalOpen,
  makepaymentModalData,
  refetch,
  user,
}) => {
  const paymentOption = [
    { id: 1, value: "cash", label: "Cash" },
    { id: 2, value: "check", label: "Check" },
  ];

  const [loading, setLoading] = useState(false);
  const [payment_bank_id, setPayment_bank_id] = useState(null);
  const [payment_type, setPaymentBy] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get bank data
  const { data: bankTypes, isLoading: bankLoading } = useGetBank();

  //   create a payment
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        payment_publisher_id: user?._id,
        salary_id: makepaymentModalData?._id,
        user_id: makepaymentModalData?.user_id?._id,
        user_phone: makepaymentModalData?.user_id?.user_phone,
        payment_type,
        payment_note: data?.payment_note,
        payment_date: data?.payment_date,
        pay_amount: parseFloat(data?.pay_amount),
      };
      if (payment_type == "check") {
        (sendData.payment_bank_id = payment_bank_id),
          (sendData.reference_id = data?.reference_id);
      }
      const response = await fetch(`${BASE_URL}/salary_payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Payment created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setMakepaymentModalOpen(false);
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

  if (bankLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            Create Supplier Payment
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

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div className="mt-5 overflow-x-auto rounded">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
              <thead className=" bg-[#fff9ee] ">
                <tr className="divide-x divide-gray-300  font-semibold text-center ">
                  <th className="whitespace-nowrap px-4 py-2.5 ">
                    Total Salary
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 ">
                    Paid Salary
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 ">Due Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center ">
                <tr className={`divide-x divide-gray-200 bg-white`}>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {makepaymentModalData?.grand_total_amount}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {makepaymentModalData?.received_amount}
                  </td>
                  <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                    {makepaymentModalData?.due_amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Salary Note <span className="text-red-500">*</span>
            </label>

            <input
              {...register("payment_note")}
              type="text"
              placeholder="Salary  Note"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>

          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
              Payment By
            </label>

            <Select
              id="payment_type"
              name="payment_type"
              aria-label="Payment By"
              required
              isClearable
              options={paymentOption}
              getOptionLabel={(x) => x?.label}
              getOptionValue={(x) => x?.value}
              onChange={(selectedOption) => {
                setPaymentBy(selectedOption?.value);
              }}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Payment Date<span className="text-red-500">*</span>
            </label>

            <input
              {...register("payment_date", {
                required: "Date is Required",
              })}
              type="date"
              max={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
              placeholder="Payment Date"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.payment_date && (
              <p className="text-red-600">{errors.payment_date.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label className="block text-xs font-medium text-gray-700">
              Payment amount
              <span className="text-red-500">*</span>
            </label>

            <input
              {...register("pay_amount", {
                required: " Payment amount is required",
                validate: (value) => {
                  if (value < 0) {
                    return "Amount must be getter than 0";
                  }
                },
              })}
              max={makepaymentModalData?.due_amount}
              min={0}
              type="number"
              placeholder="Enter Payment amount"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.pay_amount && (
              <p className="text-red-600">{errors.pay_amount.message}</p>
            )}
          </div>
          {payment_type === "check" && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
                Payment Bank Name
              </label>

              <Select
                id="payment_bank_id"
                name="payment_bank_id"
                aria-label="Bank Type"
                isClearable
                required
                options={bankTypes?.data}
                getOptionLabel={(x) => x?.bank_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) =>
                  setPayment_bank_id(selectedOption?._id)
                }
              ></Select>
            </div>
          )}
          {payment_type === "check" && (
            <div className="mt-2">
              <label
                htmlFor=""
                className="block text-xs font-medium text-gray-700"
              >
                Reference ID<span className="text-red-500">*</span>
              </label>

              <input
                {...register("reference_id", {
                  required: "Reference ID required",
                })}
                type="text"
                placeholder="Reference ID"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.reference_id && (
                <p className="text-red-600">{errors.reference_id.message}</p>
              )}
            </div>
          )}

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
  );
};

export default MakePaymentModal;
