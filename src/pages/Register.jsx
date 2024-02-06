import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material/";
import { Link,useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      email:email,
      password:password,
      username:username,
      name: name
    }
    axios
    .post("http://localhost:3001/api/signup",{
      data: data
  })
    .then((res) => {
      // setCourses(res.data);
      // setCourses(res.data);
      console.log(res.data); 
      if(res.data != null){
        navigate("/", { replace: true });
        // localStorage.setItem("userType",res.data[0].role);
      }
      else{
        if(res.msg!=null)
        alert("res.msg");
      }
    })
    .catch((err) => {
      console.log(err);
    });
    console.log("Email:", email);
    console.log("Password:", password);
  

    // Handle form submission here, e.g., send email and password to the server
    // You can perform validation and make API requests here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container maxWidth="sm" sx={{marginTop:'90px'}} >
      <Paper elevation={10}  style={{ padding: "20px" }}>
        <Typography variant="h5" align="center"  color="primary" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
              }}
          />
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);
              }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
              }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
              }}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />
           <Typography style={{ color: "GrayText", fontWeight:'bold' }} variant="subtitle2">
           Already Have an account?   
                  <Link style={{ textDecoration: 'none', color:'#1976D2' }} to="/">Login Here</Link>
                </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{width:'50%', display: 'flex',justifyContent: 'center', mx: 'auto'}}
            style={{ marginTop: "10px" }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;


