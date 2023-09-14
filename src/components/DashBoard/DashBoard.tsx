import { useNavigate } from 'react-router-dom';
import "./DashBoard.scss"

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="DashboardContainer">          
    <button onClick={()=>navigate(`/About`)}>About</button>
    <button onClick={()=>navigate("/Test")}>Create a Test</button> 
    <button onClick={()=>navigate("/LogIn/Form")}>Log in</button>
    <button onClick={()=>navigate("/Register/SignIn")}>Sign In</button>
    </div>
  );
}

