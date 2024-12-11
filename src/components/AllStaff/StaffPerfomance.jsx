import { useParams } from "react-router-dom"


const StaffPerfomance = () => {
    const {user_id} =useParams()
  return <div>StaffPerfomance id is: {user_id}</div>;
}

export default StaffPerfomance