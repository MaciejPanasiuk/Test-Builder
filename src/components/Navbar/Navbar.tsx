import { useNavigate } from 'react-router-dom';
import "./Navbar.scss"
import { useLogout } from '../../hooks/useLogout';

export default function Navbar() {
  const navigate = useNavigate();
  const{logout}=useLogout()
  return (
    <div className="NavbarContainer">          
    <button onClick={()=>navigate(`/About`)}>About</button>
    <button onClick={()=>navigate("/Test")}>Create a Test</button> 
    <button onClick={()=>navigate("/LogIn/Form")}>Log in</button>
    <button onClick={()=>navigate("/Register/SignIn")}>Sign In</button>
    <button onClick={()=>navigate("/UserPanel")}>User Panel</button>
    <button onClick={()=>logout()}>Logout</button>
    </div>
  );
}

