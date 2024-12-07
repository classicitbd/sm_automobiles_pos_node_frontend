import ViewSaleTarget from "@/components/SaleTarget/ViewSaleTarget";
import { useParams } from "react-router-dom";
const ViewSaleTargetPage = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="bg-white rounded-lg py-6 px-4 shadow">
        <div>
          <h1 className="text-2xl">Employ Sale Target</h1>
          ViewSaleTarget user is: {id}
        </div>
        <ViewSaleTarget />
      </div>
    </div>
  );
};

export default ViewSaleTargetPage;
