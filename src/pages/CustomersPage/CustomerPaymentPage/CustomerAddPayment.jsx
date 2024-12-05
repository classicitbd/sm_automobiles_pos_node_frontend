import AddCustomersPayment from "@/components/CustomersPayment/AddCustomersPayment";

const CustomerAddPayment = () => {
  return (
    <div className="bg-white rounded-lg py-6 px-4 shadow mx-auto">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Add Customers Payment</h1>
        </div>
      </div>

      {/*Customers Payment Create  modal */}
      <AddCustomersPayment />
    </div>
  );
};

export default CustomerAddPayment;
