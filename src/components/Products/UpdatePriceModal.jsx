import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/baseURL";

const UpdatePriceModal = ({
    updatePriceModalValue,
    setUpdatePriceModal,
    user,
    refetch
}) => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //   update product price
    const handleDataPost = async (data) => {
        setLoading(true);
        try {
            const sendData = {
                product_previous_price: updatePriceModalValue?.product_price,
                product_updated_price: data?.product_updated_price,
                product_quantity: updatePriceModalValue?.product_quantity,
                product_id: updatePriceModalValue?._id,
                _id: updatePriceModalValue?._id,
                price_update_publisher_id: user?._id,
                price_update: true
            };
            const response = await fetch(
                `${BASE_URL}/product?role_type=product_update`,
                {
                    method: "PATCH",
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
                        : "Price Update successfully",
                    {
                        autoClose: 1000,
                    }
                );
                refetch();
                setLoading(false);
                setUpdatePriceModal(false);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
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
                        onClick={() => setUpdatePriceModal(false)}
                    >
                        <RxCross1 size={20}></RxCross1>
                    </button>
                </div>

                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)} className="">
                    <div>
                        <label
                            htmlFor=""
                            className="block text-xs font-medium text-gray-700"
                        >
                            Product Previous Price <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="number"
                            placeholder="Product Previous Price"
                            disabled
                            value={updatePriceModalValue?.product_price}
                            readOnly
                            className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                        />
                        {errors.supplier_payment_title && (
                            <p className="text-red-600">
                                {errors.supplier_payment_title.message}
                            </p>
                        )}
                    </div>
                    <div className="mt-2">
                        <label
                            htmlFor=""
                            className="block text-xs font-medium text-gray-700"
                        >
                            Product Updated Price<span className="text-red-500">*</span>
                        </label>

                        <input
                            {...register("product_updated_price", {
                                required: "Date is Required",
                            })}
                            type="number"
                            min={0}
                            placeholder="Product Updated Price"
                            className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
                        />
                        {errors.product_updated_price && (
                            <p className="text-red-600">
                                {errors.product_updated_price.message}
                            </p>
                        )}
                    </div>


                    <div className="flex justify-end mt-3">
                        {loading == true ? (
                            <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                                <MiniSpinner />
                            </div>
                        ) : (
                            <Button type="submit">Update</Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePriceModal;