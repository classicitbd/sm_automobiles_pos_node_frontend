import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import UseGetUser from "@/hooks/UseGetUser";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import { BASE_URL } from "@/utils/baseURL";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";

const GeneRateSalarySheet = () => {
  const { user, loading: loginLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const locations = useLocation();
  const searchParams = new URLSearchParams(locations?.search);
  const userType = searchParams.get("user_type");
  const [loading, setLoading] = useState(false);
  const [user_info, setEmploye] = useState("");
  const navigate = useNavigate();
  const [multipleUser, setMultipleUser] = useState([]);

  //get user data
  const { data: userTypes, isLoading: userLoading } = UseGetUser();

  const handleDataPost = async (data) => {
    if (userType == "single_user") {
      setLoading(true);
      try {
        const sendData = {
          user_id: user_info?._id,
          user_phone: user_info?.user_phone,
          basic_salary: user_info?.user_salary,
          salary_month: data?.salary_month,
          salary_publisher_id: user?._id,
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
    } else if (userType == "multiple_user") {
      setLoading(true);
      try {
        const sendData = {
          users: multipleUser?.map((userData) => ({
            user_id: userData?.user_id,
            user_phone: userData?.user_phone,
            basic_salary: userData?.user_salary,
            salary_month: data?.salary_month,
            salary_publisher_id: user?._id,
          })),
        };

        const response = await fetch(`${BASE_URL}/salary/multiple_user`, {
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
    } else {
      setLoading(true);
      try {
        const sendData = {
          salary_month: data?.salary_month,
          salary_publisher_id: user?._id,
        };

        const response = await fetch(`${BASE_URL}/salary/all_user`, {
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

  // Function to handle selecting/unselecting values
  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions);
    // Update state with selected options
    setMultipleUser(
      selectedOptions?.map((option) => ({
        user_id: option?._id,
        user_phone: option?.user_phone,
        user_salary: option?.user_salary,
        user_name: option?.user_name,
      }))
    );
  };

  if (userLoading || loginLoading) {
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
            {userType !== "all_user" &&
              (userType === "single_user" ? (
                <div className="w-full">
                  <label className="block  font-medium text-gray-700 mb-2">
                    Employee
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
                      setEmploye(selectedOption);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <label className="block  font-medium text-gray-700 mb-2">
                    Employees
                  </label>

                  <Select
                    id="employees"
                    name="employees"
                    aria-label="employees"
                    required
                    isClearable
                    isMulti
                    options={userTypes?.data}
                    getOptionLabel={(x) => x?.user_name}
                    getOptionValue={(x) => x?._id}
                    onChange={handleSelectChange}
                    value={multipleUser?.map((user) => ({
                      _id: user?.user_id,
                      user_name: user?.user_name,
                      user_phone: user?.user_phone,
                      user_salary: user?.user_salary,
                    }))}
                  />
                </div>
              ))}

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
