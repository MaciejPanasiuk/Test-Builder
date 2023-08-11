import { ButtonProps, DeleteProps, SpanEvent, inputData, } from "../../../Interfaces/types";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton, Tooltip } from '@mui/material';


function DeleteButton({currItem, onSetItem, btn_size='small',tooltip=''}:DeleteProps & ButtonProps) {


    const handleDeleteItem=(itemId: string, event: SpanEvent)=>{
        event.preventDefault();
        onSetItem((prevState: inputData[]) => {
          const updatedList: inputData[] = structuredClone(prevState);
          return updatedList.filter((item) => item.Id !== itemId);
        });
      }

    return (
      <Tooltip title={tooltip} arrow>
      <IconButton className='deleteButton' color='error' size={btn_size} onClick={(e) => handleDeleteItem(currItem.Id, e)} >
      <DeleteRoundedIcon fontSize="inherit"/>
      </IconButton>
      </Tooltip>
    )
  }
  
  export default DeleteButton