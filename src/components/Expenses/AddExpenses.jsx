import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { RiImageAddFill } from "react-icons/ri";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const AddExpenses = ({ setExpenceCreateModal, refetch, user }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //Image preview....
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file?.name);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("expense_voucher", file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setValue("expense_voucher", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //Data post
  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      if (data?.expense_voucher) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "expense_voucher") {
            formData.append(key, data?.expense_voucher);
          } else {
            formData.append(key, value);
          }
        });

        formData.append("expense_publisher_id", user?._id);
        const response = await fetch(
          `${BASE_URL}/expense`,
          {
            method: "POST",
            credentials: "include",

            body: formData,
          }
        );
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message ? result?.message : "expense created successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
          setExpenceCreateModal(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
      } else {
        const sendData = {
          expense_title: data?.expense_title,
          expense_date: data?.expense_date,
          expense_amount: data?.expense_amount,
          expense_publisher_id: user?._id,
        };

        const response = await fetch(
          `${BASE_URL}/expense`,
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
            result?.message ? result?.message : "expense created successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
          setExpenceCreateModal(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
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
          <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mt-4">
              <h3
                className="text-[22px] font-bold text-gray-800 capitalize"
                id="modal-title "
              >
                Add Expenses
              </h3>
              <button
                type="button"
                className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50"
                onClick={() => setExpenceCreateModal(false)}
              >
                {" "}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className="mt-2 mb-6" />

            <form onSubmit={handleSubmit(handleDataPost)} className="space-y-4">
              <div>
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Expense Title <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("expense_title", {
                    required: "Expense Title is required",
                  })}
                  type="text"
                  placeholder="Expense Title"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.expense_title && (
                  <p className="text-red-600">
                    {errors.expense_title?.message}
                  </p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block text-xs font-medium text-gray-700"
                >
                  Expense Date <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("expense_date", {
                    required: "Expense Date is required",
                  })}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.expense_date && (
                  <p className="text-red-600">
                    {errors.expense_date?.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label className="block text-xs font-medium text-gray-700">
                  Expense Amount <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("expense_amount", {
                    required: "Expense Amount is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Amount must be getter than 0";
                      }
                    },
                  })}
                  type="number"
                  placeholder="Enter Expense Amount"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                />
                {errors.expense_amount && (
                  <p className="text-red-600">
                    {errors.expense_amount?.message}
                  </p>
                )}
              </div>

              {/* ------Image or Pdf------- */}

              <div className="mt-6">
                {imagePreview ? (
                  <>
                    {pdfFile?.endsWith(".pdf") || pdfFile?.endsWith(".PDF") ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 "
                          onClick={clearImagePreview}
                        >
                          <RxCross1 size={15}></RxCross1>
                        </button>
                        {/* Image Preview */}
                        <iframe
                          src={imagePreview}
                          width="100%"
                          height="300"
                          title="PDF Preview"
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <button
                          type="button"
                          className="btn p-1 absolute right-3 rounded-full top-3 text-white bg-error-100 hover:bg-error-50 "
                          onClick={clearImagePreview}
                        >
                          <RxCross1 size={15}></RxCross1>
                        </button>
                        {/* Image Preview */}
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover my-2 rounded"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <label
                      className="mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer"
                      htmlFor="expense_voucher"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div>
                          <RiImageAddFill size={25} />
                        </div>
                        <p className="mt-2 text-[#C9CACA]">upload document</p>
                      </div>
                    </label>
                  </>
                )}
                <input
                  {...register("expense_voucher")}
                  type="file"
                  id="expense_voucher"
                  ref={fileInputRef}
                  className="mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primary file:text-white file:border-none file:rounded file:px-2 file:py-1.5"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-[#C9CACA]  text-end">
                  Upload 300x300 pixel images in PNG, JPG, pdf or WebP format (max 1
                  MB).
                </p>
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

export default AddExpenses;
