import MyPayroll from "@/components/Salary/MyPayroll";

const MyPayrollPage = () => {
  // handle item search function....
  // const handleSearchValue = (value) => {
  //   setSearchValue(value);
  //   setLimit(10);
  //   setPage(1);
  // };
  return (
    <div className="py-6 px-4 ">
      <div className="mt-6">
        <h1 className="text-xl sm:text-2xl">My Roll</h1>
      </div>
      <div className="mt-8 flex justify-end">
        <input
          type="text"
          //defaultValue={searchTerm}
         // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search My Payroll..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      <MyPayroll />
    </div>
  );
};

export default MyPayrollPage;
