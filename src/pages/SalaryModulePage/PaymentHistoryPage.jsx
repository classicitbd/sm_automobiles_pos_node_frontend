import PaymentHistory from "@/components/Salary/PaymentHistory";

const PaymentHistoryPage = () => {
  return (
    <div className="py-6 px-4 ">
      <div className=" mt-6">
        <h1 className="text-xl sm:text-2xl">All Payment History</h1>
      </div>

      <PaymentHistory />
    </div>
  );
};

export default PaymentHistoryPage;
