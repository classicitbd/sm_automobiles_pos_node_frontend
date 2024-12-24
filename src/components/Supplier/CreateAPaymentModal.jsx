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
import useGetSupplierStockInvoice from "@/hooks/useGetSupplierStockInvoice";

const CreateAPaymentModal = ({
  setUpdatePaymentCreateModal,
  updatePaymentCreateModalValue,
  refetch,
  user,
}) => {
  const paymentOption = [
    { id: 1, value: "cash", label: "Cash" },
    { id: 2, value: "check", label: "Check" },
  ];

  const [loading, setLoading] = useState(false);
  const [payment_bank_id, setPayment_bank_id] = useState(null);
  const [supplier_payment_method, setPaymentBy] = useState("");
  const [invoice_id, setInvoiceId] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get bank data
  const { data: bankTypes, isLoading: bankLoading } = useGetBank();

  //get supplierStockInvoice data
  const { data: supplierStockInvoiceTypes, isLoading: supplierInvoiceLoading } =
    useGetSupplierStockInvoice(updatePaymentCreateModalValue?._id);

  //   create a payment
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        supplier_payment_publisher_id: user?._id,
        supplier_id: updatePaymentCreateModalValue?._id,
        supplier_payment_method,
        supplier_payment_title: data?.supplier_payment_title,
        supplier_payment_date: data?.supplier_payment_date,
        supplier_payment_amount: data?.supplier_payment_amount,
        invoice_id: invoice_id,
      };
      if (supplier_payment_method == "check") {
        (sendData.payment_bank_id = payment_bank_id),
          (sendData.reference_id = data?.reference_id);
      }
      const response = await fetch(`${BASE_URL}/supplier_payment`, {
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
          result?.message
            ? result?.message
            : "Supplier Payment created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setUpdatePaymentCreateModal(false);
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

  if (bankLoading || supplierInvoiceLoading) {
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
            onClick={() => setUpdatePaymentCreateModal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)} className="">
          {invoiceValue && (
            <>
              <div className="mt-5 overflow-x-auto rounded">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
                  <thead className=" bg-[#fff9ee] ">
                    <tr className="divide-x divide-gray-300  font-semibold text-center ">
                      <th className="whitespace-nowrap px-4 py-2.5 ">
                        Total Amount
                      </th>
                      <th className="whitespace-nowrap px-4 py-2.5 ">
                        Paid Amount
                      </th>
                      <th className="whitespace-nowrap px-4 py-2.5 ">
                        Due Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-center ">
                    <tr
                      className={`divide-x divide-gray-200 bg-white
                        `}
                    >
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {invoiceValue?.total_amount}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {invoiceValue?.paid_amount}
                      </td>
                      <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                        {invoiceValue?.due_amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
              Invoice ID
            </label>

            <Select
              id="invoice_id"
              name="invoice_id"
              aria-label="Invoice ID"
              required
              isClearable
              options={supplierStockInvoiceTypes?.data}
              getOptionLabel={(x) => x?.invoice_id}
              getOptionValue={(x) => x?.invoice_id}
              onChange={(selectedOption) => {
                setInvoiceId(selectedOption?._id);
                setInvoiceValue(selectedOption);
              }}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Supplier Payment Title <span className="text-red-500">*</span>
            </label>

            <input
              {...register("supplier_payment_title", {
                required: " Payment Title is required",
              })}
              type="text"
              placeholder="Supplier Payment Title"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.supplier_payment_title && (
              <p className="text-red-600">
                {errors.supplier_payment_title.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
              Payment By
            </label>

            <Select
              id="supplier_payment_method"
              name="supplier_payment_method"
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
              Supplier Payment Date<span className="text-red-500">*</span>
            </label>

            <input
              {...register("supplier_payment_date", {
                required: "Date is Required",
              })}
              type="date"
              max={new Date().toISOString().split("T")[0]} // Prevents selecting dates before today
              placeholder="Supplier Payment Date"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.supplier_payment_date && (
              <p className="text-red-600">
                {errors.supplier_payment_date.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <label className="block text-xs font-medium text-gray-700">
              Supplier Payment amount
              <span className="text-red-500">*</span>
            </label>

            <input
              {...register("supplier_payment_amount", {
                required: " Payment amount is required",
                validate: (value) => {
                  if (value < 0) {
                    return "Amount must be getter than 0";
                  }
                },
              })}
              max={invoiceValue?.due_amount}
              min={0}
              type="number"
              placeholder="Enter Payment amount"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.supplier_payment_amount && (
              <p className="text-red-600">
                {errors.supplier_payment_amount.message}
              </p>
            )}
          </div>
          {supplier_payment_method === "check" && (
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
          {supplier_payment_method === "check" && (
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

export default CreateAPaymentModal;
