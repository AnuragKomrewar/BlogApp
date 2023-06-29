import React, { useRef, useContext,useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  Box
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
// npm i @emailjs/browser


const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

// const initialValues={
//   name:"",
//   email:"",
//   message:""
// }
const Contact = () => {

  const {account}=useContext(DataContext);
  const form = useRef();
  // const[values, setValues]=useState(initialValues);
  // const onChangeHandler = (e) =>{
  //   setValues({...initialValues,[e.target.name]:e.target.value});
  // }
  const navigate=useNavigate();
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4s74ym4",
        "template_42vughb",
        form.current,
        "Hl-KiE0UL0AHohClA"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("message sent");
          navigate('/');
          // setValues(initialValues);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    <Banner />
    <Container> 
      
      
      
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name"  value={account.username} />
          <label>Email</label>
          <input type="email" name="email"  />
          <label>Message</label>
          <textarea name="message"    />
          <input type="submit" value="Send" />
        </form>
      </StyledContactForm>
    </Container>
    <Container>
      <Footer>Feel free to contact. Happy Blogging!</Footer>
    </Container>
    </>
    
  );
};

export default Contact;

// Styles
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  
`;

const Footer = styled(Box)`
margin-top: 30px;
background: #F5F5F5;
padding: 10px;
display:flex;
width:40%; 
justify-content:center;
`

const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

// import { Box, styled, Typography, Link } from '@mui/material';
// import { GitHub, Instagram, Email } from '@mui/icons-material';

// const Banner = styled(Box)`
//     background-image: url(http://mrtaba.ir/image/bg2.jpg);
//     width: 100%;
//     height: 50vh;
//     background-position: left 0px top -100px;
//     background-size: cover;
// `;

// const Wrapper = styled(Box)`
//     padding: 20px;
//     & > h3, & > h5 {
//         margin-top: 50px;
//     }
// `;

// const Text = styled(Typography)`
//     color: #878787;
// `;

// const Contact = () => {
//     return (
//         <Box>
//             <Banner />
//             <Wrapper>
//                 <Typography variant="h3">Getting in touch is easy!</Typography>
//                 <Text variant="h5">
//                     Reach out to me on
//                     <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
//                         <Instagram/>
//                     </Link>
//                     or send me an Email
//                     <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
//                         <Email />
//                     </Link>.
//                 </Text>
//             </Wrapper>
//         </Box>
//     );
// }

// export default Contact;
