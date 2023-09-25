import styled from "styled-components"
import LogoutButton from "../components/Auth/LogoutButton"
import Greeting from "./Greeting"
import MyAccountButton from "../components/Auth/MyAccountButton"

const StyledHeaderItems = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`

export default function HeaderItems() {
  return (
    <StyledHeaderItems>
        <Greeting/>
        <MyAccountButton/>
        <LogoutButton/>
    </StyledHeaderItems>
  )
}
