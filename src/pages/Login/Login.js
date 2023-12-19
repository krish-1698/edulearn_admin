import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send email and password to the server
    // You can perform validation and make API requests here
    axios
    .get(`http://localhost:3001/api/user/${email}/${password}`)
    .then((res) => {
      // setCourses(res.data);
      // setCourses(res.data);
      console.log(res.data.length); 
      if(res.data.length == 1){
        navigate("/dashboard", { replace: true });
        console.log(res.data[0].role);
        localStorage.setItem("userType",res.data[0].role);
      }
      else{
        alert("Invalid login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container maxWidth="sm" sx={{marginTop:'90px'}} >
      <Paper elevation={10}  style={{ padding: "20px" }}>
        <Typography variant="h5" align="center"  color="primary" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
           <Typography style={{ color: "GrayText", fontWeight:'bold' }} variant="subtitle2">
                  Don't Have an account?    
                  <Link style={{ textDecoration: 'none', color:'#1976D2' }} to="/register">Register Here</Link>
                </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{width:'50%', display: 'flex',justifyContent: 'center', mx: 'auto'}}
            style={{ marginTop: "10px" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;


