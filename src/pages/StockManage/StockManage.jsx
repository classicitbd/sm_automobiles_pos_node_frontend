import StockManageForm from "@/components/StockManage/StockManageForm";

const StockManage = () => {
    return (
        <div className='max-w-5xl mx-auto'>
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