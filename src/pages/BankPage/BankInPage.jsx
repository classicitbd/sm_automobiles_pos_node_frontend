import BankIn from "@/components/Bank/BankIn";
import { useParams } from "react-router-dom";

const BankInPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="bg-white rounded-lg py-6 px-4 shadow">
        <div>
          <h1 className="text-2xl">Bank In</h1>
          <p>Bank IN Id is :{id}</p>
        </div>
        <BankIn />
      </div>
    </div>
  );
};

export default BankInPage;
