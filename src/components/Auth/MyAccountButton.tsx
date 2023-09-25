import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyAccountButton() {
    const navigate=useNavigate()
    
    return (
        <Tooltip title={'My Account'} arrow>
        <IconButton  color='primary' size={'large'} onClick={()=>navigate('/UserPanel')} >
        <AccountCircleOutlinedIcon fontSize="inherit"/>
        </IconButton>
        </Tooltip>
        )
}
