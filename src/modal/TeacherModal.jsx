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
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function TeacherModal({ open, setOpen, teacherToEdit }) {
    let navigate = useNavigate();

    const [teacherData, setTeacherData] = useState([]);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [nic, setNic] = useState("");
    const [mobile_no, setMobileNo] = useState("");
    const [subject, setSubject] = useState("");
    const [qualification, setQualification] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [Verified, setVerified] = useState(0);
    const [state, setState] = useState("ACTIVE");


 
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgPath, setImgPath] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }


    const editTeacher = () => {
       const formData = new FormData();
        
        formData.append("city", city);
        formData.append("nic", nic);
        formData.append("mobile_no", mobile_no);
        formData.append("subject", subject);
        formData.append("qualification", qualification);
        formData.append("mobile_no", mobile_no);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
       
        axios
            .post("http://localhost:3001/api/editUser", {
                data: formData
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Course added successfully")
                navigate('/teachers')
            })
            .catch((err) => {
                console.log(err);
            });
    }





    const subjects = [
        { label: 'Physics' },
        { label: 'Chemistry' },
        { label: 'Biology' },
        { label: 'Mathematics' },
    ]

    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {
        // If teacherToEdit is provided, set the state with the teacher's details
        if (teacherToEdit) {
          setName(teacherToEdit.name || "");
          setCity(teacherToEdit.city || "");
          setNic(teacherToEdit.nic || "");
          setMobileNo(teacherToEdit.mobile_no || "");
          setSubject(teacherToEdit.subject || "");
          setQualification(teacherToEdit.qualification || "");
          setPassword(teacherToEdit.password || "");
          setEmail(teacherToEdit.email || "");
          setState(teacherToEdit.state || "ACTIVE");
        } else {
            // If teacherToEdit is not provided (i.e., adding a new teacher), reset the state
            setName("");
            setCity("");
            setNic("");
            setMobileNo("");
            setSubject("");
            setQualification("");
            setPassword("");
            setEmail("");
            setVerified(0);
            setState("ACTIVE");
          }
      }, [teacherToEdit]);


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
                <Card sx={{ width: "40vw",maxHeight: "95vh", overflowY: "auto" }}>
                    <CardContent>
                        <Typography
                            pl={1}
                            pt={1}
                            pb={2}
                            variant="h6"
                            sx={{ fontWeight: 500 }}
                        >
                            {teacherToEdit ? "Edit Teacher" : "Add New Teacher  "}
                            <IconButton
                         color="black"
                         onClick={handleClose}
                        sx={{ float:"right" }}
                        >
                        <ClearIcon />
                        </IconButton>
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
                            Subject
                        </Typography>
                        <Autocomplete
                           onChange={(e, newValue) => setSubject(newValue)}
                            disablePortal
                            id="combo-box-demo"
                            options={subjects}
                            value={subject || ""}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Select Subject" />}
                        />

                        <Typography pl={1} pt={1}>
                            City
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="City"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></TextField>

                        {/* <Typography pl={1} pt={1}>
                Amount
              </Typography>
              <TextField
                multiline
                maxRows={4}
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                placeholder="Amount"
                size="small"
                onChange={handleOnChangeAmount}
              ></TextField> */}

                        <Typography pl={1} pt={1}>
                            NIC
                        </Typography>
                        <TextField
                            multiline
                            maxRows={4}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="NIC"
                            size="small"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Mobile Number
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Mobile Number"
                            size="small"
                            value={mobile_no}
                            onChange={(e) => setMobileNo(e.target.value)}
                        ></TextField>


                        <Typography pl={1} pt={1}>
                            Qualification
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Qualification"
                            size="small"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                        ></TextField>

                    <Typography pl={1} pt={1}>
                            Email
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Email"
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
                            <Button variant="contained" onClick={editTeacher}>Save</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}

export default TeacherModal;
