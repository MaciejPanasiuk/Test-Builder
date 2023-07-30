import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import './AddButton.scss'
import { AddProps, SpanEvent, inputData } from '../../../Interfaces/types';


export default function AddButton({listItemIndex, onSetItem,getSampleData,btn_size='small',btn_label=''}:AddProps) {

      const handleAddItem=(event: SpanEvent)=>{
        event.preventDefault();
        onSetItem((prevState: inputData[]) => {
          const updatedList: inputData[] = structuredClone(prevState);
          const newSampleData=getSampleData();
          if(prevState.length-1===listItemIndex){
            return [...updatedList, newSampleData]
          }
          else if(prevState.length-1!==listItemIndex) {
              return [...updatedList.slice(0,listItemIndex+1),newSampleData,...updatedList.slice(listItemIndex+1)]
          }
          else return [...updatedList];

        });

      }

  return (
    <IconButton className='addButton' color='primary' size={btn_size} onClick={(e) => handleAddItem(e)} >
    <AddCircleRoundedIcon fontSize="inherit"/>
    {btn_label}
    </IconButton>
  )
}


