import { Outlet } from "react-router-dom";
import './LoginPage.scss'
import Container from "@mui/material/Container";
import { pages } from "../../UI/styles/styles";


export default function LoginPage() {
  return (
    <Container maxWidth={'xs'} sx={pages.main} fixed>
      <Outlet />
    </Container>
  );
}
