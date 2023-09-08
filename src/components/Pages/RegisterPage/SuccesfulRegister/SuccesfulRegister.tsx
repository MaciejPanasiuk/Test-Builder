import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function SuccesfulRegister() {
  const navigate = useNavigate();

  return (
    <div>
      <p>Account created Succesfuly!</p>
      <p>Click below to log in</p>
      <Button variant="contained" sx={{ m: 2 }}>log in</Button>
    </div>
  );
}
