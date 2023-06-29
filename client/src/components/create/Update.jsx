import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import {API} from '../../service/api.js';



const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  & label{
    cursor:pointer;
  }
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date()
};

const Update = () => {

  const [post, setPost] = useState(initialPost);
  const location=useLocation();//intialization
  const [file, setFile] = useState('');
  const {account}=useContext(DataContext);
  const navigate=useNavigate();
  const url =post.picture?post.picture:
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    let {id}= useParams();
    useEffect(()=>{
        const fetchData= async ()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }else{

            }
        }

        fetchData();
    },[])

    useEffect(() => {
      const getImage = async () => { 
          if(file) {
              const data = new FormData();//when using formData to upload files API "Content-Type": " multipart/form-data"
              data.append("name", file.name);
              data.append("file", file);
              const response = await API.uploadFile(data);
              post.picture = response.data;
              console.log("Image Response: ",post.picture);
          }
      }
      getImage();
      post.categories = location.search?.split('=')[1] || 'All';
      post.username = account.username;
  }, [file]) // a callback function, when to call

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const updateBlogPost=async ()=>{
    let response=await API.updatePost(post);
    if(response.isSuccess){
      navigate(`/details/${id}`);
    }
  }

  return (
    <Container>
      <Image src={url} alt="post" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) =>setFile(e.target.files[0])}
          
        />
        <InputTextField
          placeholder="Title"
          value={post.title}
          onChange={(event) => handleChange(event)}
          name="title"
        />
        <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        value={post.description}
        placeholder="Write Blog Here.."
        onChange={(event) => handleChange(event)}
        name="description"
      />
    </Container>
  );
};
export default Update;
