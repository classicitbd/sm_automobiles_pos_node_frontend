import { useParams } from "react-router-dom";

const PurchageHistory = () => {
  const { product_id } = useParams();
  return <div>PurchageHistory:{product_id}</div>;
};

export default PurchageHistory;
