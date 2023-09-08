import { Box, TextField } from "@mui/material";
import { InputProps } from "../../../../Interfaces/types";

export default function FormInput({registerRequirements,labelText,ValidationError,serverError,fieldSize,customErrorMessages}:InputProps) {
  return (
<>        <Box sx={{ m: 1}}>
          <TextField
            sx={fieldSize}
            margin="normal"
            id="outlined-error-helper-text"
            label={labelText}
            variant="filled"
            {...registerRequirements}
            helperText={serverError?.message?serverError.message:ValidationError? customErrorMessages[ValidationError.type]:''}
            error={ValidationError || serverError?.message?true:false}
          />
        </Box></>
  )
}
