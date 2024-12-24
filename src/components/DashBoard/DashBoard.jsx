import { BsBagPlusFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import MultipleBars from "./MultipleBars";
import StockAlert from "./StockAlert";
import RecentInVoice from "./RecentInVoice";
import RecentSales from "./RecentSales";
import AllProfit from "./AllProfit";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { LoaderOverlay } from "../common/loader/LoderOverley";

const DashBoard = () => {
  const { user, loading: userLoading } = useContext(AuthContext);
  if (userLoading) return <LoaderOverlay />;
  return (
    <>
      {user?.user_role_id?.dashboard_show == true && (
        <div className="mb-10">
          {/*First Cart Section Start */}
          <section className="grid sm:grid-cols-4 gap-8">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                className="border flex items-center p-5 bg-white rounded-sm shadow-md"
                key={index}
              >
                <div className="bg-success-100 w-[70px] h-[70px] flex items-center justify-center rounded-full">
                  <BsBagPlusFill size={30} className="text-red-400" />
                </div>
                <div className="ml-10">
                  <p className="text-success-300 font-semibold text-2xl space-x-1">
                    $123863
                  </p>
                  <p className="text-bgray-400 text-xl mt-1.5">
                    Total Sale Amount
                  </p>
                </div>
              </div>
            ))}
          </section>
          {/*First Cart Section End */}

          {/*Second Cart Section Start */}
          <section className="grid sm:grid-cols-4 gap-8 mt-10">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                className={`flex items-center justify-between p-6 rounded-sm shadow-sm ${
                  index === 0
                    ? "bg-error-100"
                    : index === 1
                    ? "bg-purple"
                    : index === 2
                    ? "bg-success-300"
                    : "bg-bamber-100"
                }`}
                key={index}
              >
                <div>
                  <p className="text-white text-2xl font-semibold">1005</p>
                  <p className="text-white text-xl mt-1.5">Customers</p>
                </div>
                <div>
                  <FaUserCheck size={50} className="text-white" />
                </div>
              </div>
            ))}
          </section>
          {/*Second Cart Section End */}
          {/* First  Chart Section Start */}
          <section className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
              <div className="sm:col-span-2 bg-white p-5 shadow-md">
                <PieChart />
              </div>
              <div className="sm:col-span-3 bg-white p-5 shadow-md">
                <BarChart />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mt-8">
              <div className="bg-white  p-5 shadow-md sm:col-span-3">
                <LineChart />
              </div>
              <div className="bg-white  p-5 shadow-md sm:col-span-2">
                <MultipleBars />
              </div>
            </div>
          </section>
          {/* First  Chart Section End */}

          {/* Table Start  */}
          <section className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white shadow-md p-5">
                <StockAlert />
              </div>
              <div className="bg-white shadow-md p-5">
                <RecentInVoice />
              </div>
            </div>
            <div className="mt-8 bg-white shadow-md p-5">
              <RecentSales />
            </div>

            <div className="mt-8 bg-white shadow-md p-5">
              <AllProfit />
            </div>
          </section>

          {/* Table End  */}
        </div>
      )}
    </>
  );
};

export default DashBoard;
