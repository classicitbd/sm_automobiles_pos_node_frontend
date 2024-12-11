import { useParams } from "react-router-dom";

const SalleTargetView = () => {
  const { user_id } = useParams();
  return <div>SalleTargetView id is :{user_id}</div>;
};

export default SalleTargetView;
