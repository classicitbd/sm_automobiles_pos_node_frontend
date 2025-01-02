import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import UseGetUser from "@/hooks/UseGetUser";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";

const GeneRateSalarySheet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const locations = useLocation();
  const searchParams = new URLSearchParams(locations?.search);
  const userType = searchParams.get("user_type");
  const [loading, setLoading] = useState(false);
  const [user_id, setEmploye] = useState("");
  const navigate = useNavigate();

  //get user data
  const { data: userTypes, isLoading: userLoading } = UseGetUser();

  const handleDataPost = async (data) => {
    setLoading(true);
    try {
      const sendData = {
        user_id: user_id,
        salary_month: data?.salary_month,
      };

      const response = await fetch(`${BASE_URL}/salary`, {
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
          result?.message ? result?.message : "salary created successfully",
          {
            autoClose: 1000,
          }
        );
        setLoading(false);
        navigate("/salary-sheet");
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

  useEffect(() => {
    if (
      userType !== "single_user" &&
      userType !== "multiple_user" &&
      userType !== "all_user"
    ) {
      navigate("/salary-sheet");
    }
  }, [navigate, userType]);

  if (userLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="py-6 px-4 ">
      <div className="mt-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl">Generate Salary Sheet</h1>
        </div>
        <form onSubmit={handleSubmit(handleDataPost)} className="mt-6">
          <div className="sm:flex sm:items-center sm:gap-4">
            {" "}
            <div className="w-full">
              <label className="block  font-medium text-gray-700 mb-2">
                Employe
              </label>

              <Select
                id="employ"
                name="employ"
                aria-label="Employe"
                required
                isClearable
                options={userTypes?.data}
                getOptionLabel={(x) => x?.user_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setEmploye(selectedOption?._id);
                }}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="month"
                className="block  font-medium text-gray-700 mb-2 mt-2 sm:mt-0"
              >
                Month Salary Sheet
              </label>

              {/* <input
                {...register("salary_month", {
                  required: "Date is Required",
                })}
                id="date"
                type="date"
               // min={new Date().toISOString().split("T")[0]}
                placeholder="Supplier Payment Date"
                className="w-full px-2 rounded-md border-gray-200 shadow-sm sm:text-sm py-2 border-2"
              /> */}
              <input
                {...register("salary_month", {
                  required: "Date is Required",
                })}
                id="month"
                type="month"
                max={`${
                  new Date().getMonth() === 0
                    ? new Date().getFullYear() - 1
                    : new Date().getFullYear()
                }-${String(
                  new Date().getMonth() === 0 ? 12 : new Date().getMonth()
                ).padStart(2, "0")}`}
                placeholder="Supplier Payment Month"
                className="w-full px-2 rounded-md border-gray-200 shadow-sm sm:text-sm py-2 border-2"
              />
              {errors.salary_month && (
                <p className="text-red-600">{errors.salary_month?.message}</p>
              )}
            </div>
            <div className="flex justify-end mt-3 sm:mt-8">
              {loading == true ? (
                <div className="px-10 py-2 flex items-center justify-center  bg-primary text-white rounded">
                  <MiniSpinner />
                </div>
              ) : (
                <Button type="submit">Generate Salary</Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneRateSalarySheet;
