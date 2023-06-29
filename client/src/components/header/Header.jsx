import { AppBar, Toolbar, Typography,styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
    
`

const Header=()=>{
    return(
        <Component>
            <Container>
                <Link to='/' class="Head">Home</Link>
                <Link  to='/about' class="Head">About</Link>
                <Link  to='/contact' class="Head">Contact</Link>
                <Link  to='/login' class="Head">Logout</Link>
                
            </Container>
        </Component>
    )
}
export default Header;