import Tooltip from "@mui/material/Tooltip";
import { useLogout } from "../../hooks/useLogout"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import IconButton from "@mui/material/IconButton";

    

export default function LogoutButton() {
    const{logout}=useLogout()
  return (
    <Tooltip title={'Logout'} arrow>
    <IconButton color='primary' size={'large'} onClick={()=>logout()} >
    <LogoutOutlinedIcon fontSize="inherit"/>
    </IconButton>
    </Tooltip>
    )

}
