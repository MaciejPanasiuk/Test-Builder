import { Box, TextField } from "@mui/material";
import { InputProps } from "../../../Interfaces/types";

export default function FormInput({registerRequirements,labelText,ValidationError,fieldSize,customErrorMessages}:InputProps) {
  return (
<>        <Box sx={{ m: 1}}>
          <TextField
            sx={fieldSize}
            margin="normal"
            id="outlined-error-helper-text"
            label={labelText}
            variant="filled"
            {...registerRequirements}
            helperText={ValidationError? customErrorMessages[ValidationError.type]:''}
            error={ValidationError?true:false}
          />
        </Box></>
  )
}
