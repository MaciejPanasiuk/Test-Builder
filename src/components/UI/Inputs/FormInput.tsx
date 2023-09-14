import { Box, TextField } from "@mui/material";
import { InputProps } from "../../../Interfaces/types";

export default function FormInput({
  registerRequirements,
  labelText,
  ValidationError,
  fieldSize,
  customErrorMessages,
  disabled,
}: InputProps) {
  return (
    <>
      {" "}
      <Box sx={{ m: 1 }}>
        <TextField
        type="text"
          sx={fieldSize}
          margin="normal"
          id={`outlined-error-helper-text ${labelText}`}
          label={labelText}
          variant="filled"
          {...registerRequirements}
          helperText={
            ValidationError ? customErrorMessages[ValidationError.type] : ""
          }
          error={ValidationError ? true : false}
          disabled={disabled}
        />
      </Box>
    </>
  );
}
