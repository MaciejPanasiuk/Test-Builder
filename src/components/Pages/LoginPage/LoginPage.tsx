import { Outlet } from "react-router-dom";
import './LoginPage.scss'
import Container from "@mui/material/Container";

const styles={
   main:{  bgcolor: 'grey', 
           border:'2px solid transparent',
          borderRadius:'20px'}

}

export default function LoginPage() {
  return (
    <Container maxWidth={'xs'} sx={styles.main} fixed>
      <Outlet />
    </Container>
  );
}
