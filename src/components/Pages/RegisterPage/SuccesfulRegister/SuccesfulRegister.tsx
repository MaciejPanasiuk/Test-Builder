import Button from "@mui/material/Button";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useNavigate } from "react-router-dom";

export default function SuccesfulRegister() {
const navigate=useNavigate()
  return (
    <div>
      <p>Account created Succesfuly!</p>
      <CheckCircleOutlinedIcon color="success" sx={{ fontSize: 80 }}/>
      <p>Click below to log in</p>
      <Button variant="contained" sx={{ m: 2 }} onClick={()=>()=>navigate("/LogIn/Form")}>go to login page</Button>
    </div>
  );
}
