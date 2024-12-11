import { useParams } from "react-router-dom";

const OrderHistory = () => {
    const {product_id} = useParams()
  return <div>OrderHistory :{product_id}</div>;
};

export default OrderHistory;
