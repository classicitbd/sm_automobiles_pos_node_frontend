import StockManageForm from "@/components/StockManage/StockManageForm";

const StockManage = () => {
    return (
        <div className='bg-white rounded-lg py-6 px-4 shadow  max-w-3xl mx-auto'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Product Stock Manage</h1>
        </div>
      </div>

      <StockManageForm />
    </div>
    );
};

export default StockManage;