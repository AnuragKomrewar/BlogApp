import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState , useContext} from "react";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
import blogImage from '../../assets/p-blog.png';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: "50%",
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column; 
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignUpButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({isUserAuthenticated}) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState("login");
  const [signupValue, setSignupValue] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const {setAccount} = useContext(DataContext);

  const navigate=useNavigate();

  const toggleSignup = () => {
    if (account === "signup") {
      toggleAccount("login");
    } else {
      toggleAccount("signup");
    }
  };
  //setting signup details
  const signupDetails = (event) => {
    setSignupValue({ ...signupValue, [event.target.name]: event.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signupValue);
      if (response.isSuccess) {
        setError("");
        setSignupValue(signupInitialValues);
        toggleAccount("login");
      } else {
        setError("Something went wrong!");
      }
    } catch (error) {
      console.log("error while calling signup api", error);
    }
  };

  const onValueChange = (event) => {
    setLogin({...login, [event.target.name]:event.target.value});
  };

  const loginUser=async ()=>{
    //calling API here
   let response= await API.userLogin(login);//status code and json object
   //************SUCCESSFULL LOGIN*****************/
   if (response.isSuccess) {
    setError("");
    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
    sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
    //we will also receive name and username but we need them throughout the project soo:- contextAPI :-)
    //setLogin(loginInitialValues);
    setAccount({username:response.data.username, name:response.data.name});
    isUserAuthenticated(true);
    navigate('/'); //routing
    
  } else {
    setError("Something went wrong!");
  }
  }

  return (
    <Component>
      <Box>
        <Image src={blogImage} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              name="username"
              value={login.username}
              onChange={(event) => onValueChange(event)}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              name="password"
              value={login.password}
              onChange={(event) => onValueChange(event)}
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton variant="outlined" onClick={toggleSignup}>
              Sign Up
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              onChange={(event) => signupDetails(event)}
            />
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              name="username"
              onChange={(event) => signupDetails(event)}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              name="password"
              onChange={(event) => signupDetails(event)}
            />
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={() => signupUser()}>Sign Up</SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
export default Login;
