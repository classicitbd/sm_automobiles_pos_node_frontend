import SalerySheetTable from "@/components/Salary/SalerySheetTable";
import { Link } from "react-router-dom";

const SaleryPage = () => {
  // handle item search function....
  // const handleSearchValue = (value) => {
  //   setSearchValue(value);
  //   setLimit(10);
  //   setPage(1);
  // };
  return (
    <div className="py-6 px-4 ">
      <div className="sm:flex sm:justify-between mt-6">
        <div>
          <h1 className="text-xl sm:text-2xl">Salary Payment Information</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-3 sm:mt-0 ">
          <Link to={`/generate-salary-sheet?user_type=single_user`}>
            {" "}
            <button className="mr-3 border-2 border-success-200 px-8 py-2 hover:bg-success-200 font-bold   text-sm rounded shadow-xl transition-all duration-300">
              Generate A User Salary Sheet
            </button>
          </Link>
          <Link to={`/generate-salary-sheet?user_type=multiple_user`}>
            {" "}
            <button className="mr-3 border-2 border-success-200 px-8 py-2 hover:bg-success-200 font-bold  text-sm rounded shadow-xl transition-all duration-300">
              Generate Multiple Salary Sheet
            </button>
          </Link>
          <Link to={`/generate-salary-sheet?user_type=all_user`}>
            {" "}
            <button className="mr-3 border-2 border-success-200 px-8 py-2 hover:bg-success-200 font-bold  text-sm rounded shadow-xl transition-all duration-300">
              Generate All User Salary Sheet
            </button>
          </Link>
        </div>
      </div>
      {/* search salery Payment... */}
      <div className="mt-8">
        <input
          type="text"
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Salary..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      {/*Salery Payment table Show */}
      <SalerySheetTable />
    </div>
  );
};

export default SaleryPage;
