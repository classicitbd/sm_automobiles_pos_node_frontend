import { useParams } from "react-router-dom";

const PriceHistory = () => {
  const { product_id } = useParams();
  return <div>PriceHistory : {product_id}</div>;
};

export default PriceHistory;
