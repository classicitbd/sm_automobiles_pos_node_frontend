import AddCustomersPayment from "@/components/CustomersPayment/AddCustomersPayment";

const CustomerAddPayment = () => {
  return (
    <div className="">
   
        <div>
          <h1 className="text-2xl text-center">Add Customers Payment</h1>
        </div>
     

      {/*Customers Payment Create  modal */}
      <AddCustomersPayment />
    </div>
  );
};

export default CustomerAddPayment;
