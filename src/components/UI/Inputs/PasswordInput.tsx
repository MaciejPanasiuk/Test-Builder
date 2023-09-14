import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputProps } from "../../../Interfaces/types";

export default function PasswordInput({registerRequirements,
    labelText,
    ValidationError,
    fieldSize,
    customErrorMessages,
    disabled,
  }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  return (
    <>
      {" "}
      <Box sx={{ m: 1 }}>
        <TextField
        type={showPassword?'text':'password'}
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
          InputProps={{
            endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }}
        ></TextField>
      </Box>
    </>
  )
}
