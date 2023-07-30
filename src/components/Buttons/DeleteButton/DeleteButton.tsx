import { DeleteProps, SpanEvent, inputData, } from "../../../Interfaces/types";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@mui/material';


function DeleteButton({currItem, onSetItem, btn_size='small'}:DeleteProps) {


    const handleDeleteItem=(itemId: string, event: SpanEvent)=>{
        event.preventDefault();
        onSetItem((prevState: inputData[]) => {
          const updatedList: inputData[] = structuredClone(prevState);
          return updatedList.filter((item:inputData) => item.Id !== itemId);
        });
      }

    return (
      <IconButton className='deleteButton' color='error' size={btn_size} onClick={(e) => handleDeleteItem(currItem.Id, e)} >
      <DeleteRoundedIcon fontSize="inherit"/>
      </IconButton>
      
    )
  }
  
  export default DeleteButton