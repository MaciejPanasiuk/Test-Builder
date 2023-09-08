import { Outlet } from "react-router-dom";
import RegisterForm from "./RegisterForm/RegisterForm";
import './RegistrationPage.scss'

export default function RegisterPage() {
  return (
    <div className="RegNameContainer">
      <h2>USER REGISTRATION</h2>
      <Outlet />
    </div>
  );
}
