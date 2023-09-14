import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function PasswordRecoveryPage() {
  const styles={
    main:{  bgcolor: 'grey', 
            border:'2px solid transparent',
           borderRadius:'20px'}
 
 }
  return (
    <Container maxWidth={'xs'} sx={styles.main} fixed>
      <h2>Password Recovery</h2>
    <Outlet/>
    </Container>
  )
}
