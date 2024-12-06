
import { useEffect, useState } from "react";
import Pagination from "../common/pagination/Pagination";
import NoDataFound from "@/shared/NoDataFound/NoDataFound";
import { FaEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";

const UnpaidPaymentTable = ({
    setPage,
    setLimit,
    page,
    limit,
    totalData,
    refetch,
    user,
    isLoading,
    unpaidPaymentLists,
}) => {
    const [serialNumber, setSerialNumber] = useState();
    useEffect(() => {
        const newSerialNumber = (page - 1) * limit;
        setSerialNumber(newSerialNumber);
    }, [page, limit]);

    return (
        <>
            {isLoading === true ? (
                <TableLoadingSkeleton />
            ) : (
                <div>
                    <div className="rounded-lg border border-gray-200 mt-6">
                        {unpaidPaymentLists?.data?.length > 0 ? (
                            <div className="overflow-x-auto rounded-t-lg">
                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                    <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
                                        <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                                            <td className="whitespace-nowrap p-4 ">SL No</td>
                                            <td className="whitespace-nowrap p-4 ">Payment Date</td>
                                            <td className="whitespace-nowrap p-4 ">Payment Amount</td>
                                            <td className="whitespace-nowrap p-4 ">Payment Method</td>
                                            <td className="whitespace-nowrap p-4 ">Supplier name</td>
                                            <td className="whitespace-nowrap p-4 ">Supplier Phone</td>
                                            <td className="whitespace-nowrap p-4 ">Bank Name</td>
                                            <td className="whitespace-nowrap p-4 ">Reference ID</td>
                                            <td className="whitespace-nowrap p-4 ">Payment Status</td>
                                            <td className="whitespace-nowrap p-4 ">
                                                Payment Note
                                            </td>
                                            <td className="whitespace-nowrap p-4 ">Created By</td>
                                            <td className="whitespace-nowrap p-4 ">Updated By</td>
                                            <td className="whitespace-nowrap p-4 ">Action</td>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 text-center">
                                        {unpaidPaymentLists?.data?.map((paymentInfo, i) => (
                                            <tr
                                                key={paymentInfo?._id}
                                                className={`divide-x divide-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                                                    }`}
                                            >
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {serialNumber + i + 1}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_payment_date}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_payment_amount}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_payment_method == "cash" ? "Cash" : "Bank"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_id?.supplier_name}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_id?.supplier_phone}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                                                    {paymentInfo?.payment_bank_id?.bank_name || "-"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                                                    {paymentInfo?.reference_id || "-"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                                                    {paymentInfo?.supplier_payment_status == "paid" ? "Paid" : "Un Paid"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700 capitalize">
                                                    {paymentInfo?.supplier_payment_title || "-"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_payment_publisher_id?.user_name}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 font-medium text-gray-700">
                                                    {paymentInfo?.supplier_payment_updated_by?.user_name || "-"}
                                                </td>
                                                <td className="whitespace-nowrap py-1.5 px-2 text-gray-700 flex items-center">
                                                    <button className="ml-3">
                                                        <FaEye
                                                            className="cursor-pointer text-gray-500 hover:text-gray-300"
                                                            size={25}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <NoDataFound />
                        )}
                    </div>
                    <Pagination
                        setPage={setPage}
                        setLimit={setLimit}
                        totalData={totalData}
                        page={page}
                        limit={limit}
                    />
                </div>
            )}
        </>
    );
};

export default UnpaidPaymentTable;
