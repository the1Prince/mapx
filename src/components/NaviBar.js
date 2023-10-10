import { Navbar, NavbarBrand, Container } from "react-bootstrap";
import {MapFill} from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css';


const NaviBar = ()=>{
    return(
        <>
        <Navbar sticky="top" style={{backgroundColor:'#73388e', color:'#1ee3c5'}}>
        <Container>
          <Navbar.Brand href="#home" style={{color:'#1ee3c5'}}>
            <strong><MapFill /></strong>{' '}
            Map X
          </Navbar.Brand>
        </Container>
      </Navbar>
        </>
    )
}
export default NaviBar