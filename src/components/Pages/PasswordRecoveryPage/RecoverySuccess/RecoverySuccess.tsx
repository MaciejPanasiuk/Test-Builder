import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function RecoverySuccess() {
    const navigate=useNavigate()
  return (
    <div>
<CheckCircleOutlinedIcon color="success" sx={{ fontSize: 80 }}/>
    <p>Password Changed Succesfuly!</p>
    <div></div>
    <Button variant="contained" sx={{ m: 2 }} onClick={()=>navigate("/LogIn/Form")}>go to login page</Button>
  </div>
  )
}
