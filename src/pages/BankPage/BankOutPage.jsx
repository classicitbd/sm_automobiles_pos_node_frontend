import BankOut from "@/components/Bank/BankOut";
import { useParams } from "react-router-dom";

const BankOutPage = () => {
   const { id } = useParams();
   return (
     <div>
       <div className="bg-white rounded-lg py-6 px-4 shadow">
         <div>
           <h1 className="text-2xl">Bank Out</h1>
           <p>Bank Out Id is :{id}</p>
         </div>
         <BankOut />
       </div>
     </div>
   );
};

export default BankOutPage;
