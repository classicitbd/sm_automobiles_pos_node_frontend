import { useEffect, useState } from "react";
import { IoSettings } from "react-icons/io5";
import DueList from "./DueList";
import PaymentList from "./PaymentList";
import OrderList from "./OrderList";

const AllList = () => {
  const [activeNavButton, setActiveNavButton] = useState("dueList");

  const handleNavButtonClick = (buttonName) => {
    setActiveNavButton(buttonName);
    sessionStorage.setItem("activeTab", buttonName);
  };
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = sessionStorage.getItem("activeTab");
    if (saveDropDown) {
      setActiveNavButton(saveDropDown);
    }
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mt-6 bg-white rounded-lg py-4 px-4 shadow">
          <h1 className="text-2xl">Customers Due , Payment , Order-List</h1>
          <div>
            <IoSettings size={35} />
          </div>
        </div>
        {/* Button Section */}
        <div className="flex flex-wrap  gap-4 mt-8">
          <button
            className={`bg-primary hover:bg-blue-500 duration-200  text-white p-2 text-sm sm:text-base  font-medium  ${
              activeNavButton == "dueList" && "border-t-[4px]  border-blue-900"
            }`}
            onClick={() => handleNavButtonClick("dueList")}
          >
            Due List
          </button>

          <button
            className={`bg-primary hover:bg-blue-500 duration-200  text-white p-2  text-sm sm:text-base font-medium   ${
              activeNavButton == "paymentList" &&
              "border-t-[4px]  border-blue-900"
            }`}
            onClick={() => handleNavButtonClick("paymentList")}
          >
            Payment List
          </button>
          <button
            className={`bg-primary hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
              activeNavButton == "orderList" &&
              "border-t-[4px]  border-blue-900"
            }`}
            onClick={() => handleNavButtonClick("orderList")}
          >
            Order List
          </button>
        </div>

        <div className="mt-6">
          {activeNavButton == "dueList" && <DueList />}
          {activeNavButton == "paymentList" && <PaymentList />}
          {activeNavButton == "orderList" && <OrderList />}
        </div>
      </div>
    </div>
  );
};

export default AllList;
