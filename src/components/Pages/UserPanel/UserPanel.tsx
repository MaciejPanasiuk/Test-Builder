import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { pages } from "../../UI/styles/styles";
import UserInfoContainer from "./UserInfoContainer/UserInfoContainer";


export default function UserPanel() {

  return (
    <Container maxWidth={'xs'} sx={pages.main} fixed>
        <UserInfoContainer/>
    <Outlet />
  </Container>
  )
}
