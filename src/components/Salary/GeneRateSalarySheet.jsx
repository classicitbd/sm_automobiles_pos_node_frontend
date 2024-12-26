import MiniSpinner from "@/shared/MiniSpinner/MiniSpinner";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import Select from "react-select";
import { useForm } from "react-hook-form";

const GeneRateSalarySheet = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employ_id, setEmploye] = useState("");

  const employOption = [
    { _id: 1, label: "Hasibul" },
    { _id: 2, label: "Hasan" },
  ];

  const handleDataPost = (data) => {
    console.log(data);
    console.log(employ_id);
  };

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
                options={employOption}
                getOptionLabel={(x) => x?.label}
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
                {...register("salary_create_date", {
                  required: "Date is Required",
                })}
                id="date"
                type="date"
               // min={new Date().toISOString().split("T")[0]}
                placeholder="Supplier Payment Date"
                className="w-full px-2 rounded-md border-gray-200 shadow-sm sm:text-sm py-2 border-2"
              /> */}
              <input
                {...register("salary_create_date", {
                  required: "Date is Required",
                })}
                id="month"
                type="month"
                max={`${new Date().getFullYear()}-${String(
                  new Date().getMonth()
                ).padStart(2, "0")}`}
                placeholder="Supplier Payment Month"
                className="w-full px-2 rounded-md border-gray-200 shadow-sm sm:text-sm py-2 border-2"
              />
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
