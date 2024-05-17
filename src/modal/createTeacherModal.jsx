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


function CreateTeacherModal({ open, setOpen }) {
    let navigate = useNavigate();

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


    // const [teacherInfo, setTeacherInfo] = useState({
    //     title: null,
    //     description: null,
    //     language: null,
    //     imgPath: null,
    //     subjects: null,
    //     state: "ACTIVE",
    //     updated_date: "11-05-2023",
    //     teacherIds: "1",
    //     credit: null,
    //     hours: null,
    //     amount: null,
    // })

    const [selectedFile, setSelectedFile] = useState(null);
    const [imgPath, setImgPath] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }



    const addTeacher = () => {
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
        formData.append("verified",Verified);
        formData.append("state",state);
       
        axios
            .post("http://localhost:3001/api/createTeacher", {
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


    // const saveCourse = () => {
    //   console.log(imgPath);
    //   console.log(selectedFile);
    //   const formData = new FormData();
    //   formData.append('image', selectedFile);
    //   axios
    //   .post('http://localhost:8080/api/v1/fileUpload/upload-image', formData)
    //     .then((response) => {
    //       console.log(response.data);
    //       setImgPath(response.data);
    //       postCourse(response.data);
    //       // You can add any success handling here (e.g., show a success message)
    //     })
    //     .catch((error) => {
    //       console.error('Error uploading the image:', error);
    //       // You can add any error handling here (e.g., show an error message)
    //     });



    //     const postCourse = (imagePath) => {
    //     console.log(imgPath);
    //     axios
    //     .post("http://localhost:8080/api/v1/course/saveCourse", {
    //       title: courseInfo.title,
    //       description: courseInfo.description,
    //       language: courseInfo.language,  
    //       // imgPath: "C:/images/",
    //       subject: courseInfo.subjects,
    //       updated_date: courseInfo.updated_date,
    //       teacherId: parseInt(courseInfo.teacherIds),
    //       // amount: courseInfo.amount,
    //       hours: courseInfo.hours,
    //       credits: courseInfo.amount,
    //       state: courseInfo.state,
    //       img_path: imagePath,


    //     })
    //     .then((res) => {
    //       // setCourses(res.data);
    //       // setName(res.data);
    //       console.log(res.data);
    //       handleClose();
    //       window.alert("Course added successfully")
    //       navigate('/enrollments')
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   }
    //   }



    const subjects = [
        { label: 'Physics' },
        { label: 'Chemistry' },
        { label: 'Biology' }
    ]

    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }


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
                            Add New Teacher
                        </Typography>

                        <Typography pl={1} pt={1}>
                            Name
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Name"
                            size="small"
                            onChange={(e) => setName(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Subject
                        </Typography>
                        <Autocomplete
                            onChange={(e) => setSubject(e.target.value)}
                            disablePortal
                            id="combo-box-demo"
                            options={subjects}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params}  />}
                        />
                        <Typography pl={1} pt={1}>
                            City
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="City"
                            size="small"
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
                            onChange={(e) => setNic(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Mobile Number
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Mobile Number"
                            size="small"
                            onChange={(e) => setMobileNo(e.target.value)}
                        ></TextField>
                        <Typography pl={1} pt={1}>
                            Email
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Email"
                            size="small"
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Qualification
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Qualification"
                            size="small"
                            onChange={(e) => setQualification(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Password
                        </Typography>
                        <TextField
                            type="password"
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Password"
                            size="small"
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
                            <Button variant="contained" onClick={addTeacher}>Save</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}

export default CreateTeacherModal;
