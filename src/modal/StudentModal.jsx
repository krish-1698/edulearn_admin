import {
    Box,
    Button,
    Card,
    CardContent,
    Modal,
    TextField,
    Typography,
    Autocomplete,
    Container
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function StudentModal({ open, setOpen, studentToEdit }) {
    let navigate = useNavigate();

    const [teacherData, setTeacherData] = useState([]);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("ACTIVE");


 
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgPath, setImgPath] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }


    const editStudent = () => {

        
       const formData = new FormData();
        console.log(studentToEdit);
        console.log(username);
        formData.append("username", username);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if(studentToEdit == null){

            const data1 = {
                username: username,
                name: name,
                email: email,
                password: password,
              };
    console.log(formData);  
    console.log(data1);

        axios
            .post("http://localhost:3001/api/signup", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Student added successfully")
                navigate('/students')
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
}else{
    const data1 = {
        username: username,
        name: name,
        email: email,
        password: password,
        user_id: studentToEdit.id
      };
    axios
    .put("http://localhost:3001/api/editUser", {
        data: data1
    })
    .then((res) => {
        // setCourses(res.data);
        // setName(res.data);
        console.log(res.data);
        handleClose();
        window.alert("Student edited successfully")
        navigate('/students')
        window.location.reload(false);
    })
    .catch((err) => {
        console.log(err);
    });
}
        
       
       
    }

    


    const subjects = [
        { label: 'Physics' },
        { label: 'Chemistry' },
        { label: 'Biology' },
    ]

    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }


    useEffect(() =>{
        if (studentToEdit) {
            setName(studentToEdit.name || "");
            setUsername(studentToEdit.username || "");          
            setPassword(studentToEdit.password || "");
            setEmail(studentToEdit.email || "");
            
          }else{
            setName("");
            setUsername("");          
            setPassword("");
            setEmail("");
          }
         
    }, [studentToEdit]);


    return (

        <Modal open={open}  onClose={handleClose}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                    alignItems: "center",
                }}
            >
                <Card sx={{ width: "40vw" }}>
                    <CardContent>
                        <Typography
                            pl={1}
                            pt={1}
                            pb={2}
                            variant="h6"
                            sx={{ fontWeight: 500 }}
                        >
                             {studentToEdit ? "Edit Student" : "Add New Student"}
                        </Typography>

                        <Typography pl={1} pt={1}>
                            Name
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Name"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></TextField>


                        <Typography pl={1} pt={1}>
                            Username
                        </Typography>
                        <TextField
                            multiline
                            maxRows={4}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Username"
                            size="small"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></TextField>


                        <Typography pl={1} pt={1}>
                            Email
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Qualification"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Password
                        </Typography>
                        <TextField
                            type="password"
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Password"
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></TextField>

                        
                     
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                paddingRight: "27px",
                                paddingTop: "1rem",
                                marginTop: "0.2rem",
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{ color: "grey", marginRight: "0.5rem" }}
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button variant="contained" onClick={editStudent}>Save</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}

export default StudentModal;
