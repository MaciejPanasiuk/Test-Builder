import { useNavigate } from 'react-router-dom';
import "./DashBoard.scss"

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="DashboardContainer">          
    <button onClick={()=>navigate(`/About`)}>About</button>
    <button onClick={()=>navigate("/Test")}>Create a Test</button> 
    <span>Rest of The Dashboard</span>
    </div>
  );
}

