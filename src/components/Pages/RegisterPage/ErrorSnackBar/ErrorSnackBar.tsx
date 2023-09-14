import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackBarProps } from '../../../../Interfaces/types';
import Alert from '@mui/material/Alert';

export default function ErrorSnackbar({isSnackBarOpen,onSetisSnackBarOpen,errorMessage}:SnackBarProps) {
    
  const action = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>onSetisSnackBarOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={()=>onSetisSnackBarOpen(false)}
        message={errorMessage}
        action={action}
      >
    <Alert onClose={()=>onSetisSnackBarOpen(false)} severity="error" variant='filled' sx={{ width: '100%' }}>
            {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}