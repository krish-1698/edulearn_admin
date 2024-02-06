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


function EnrolmentModal({ open, setOpen, enrolmentToEdit }) {
    let navigate = useNavigate();

    const [courseData, setAllCourseData] = useState([]);
    const [userData, setAllUserData] = useState([]);

    const [course, setCourse] = useState({ id: "", name: "" });
    const [user, setUser] = useState({ id: "", name: "" });

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
    const [courseNames, setCourseNames] = useState([]);
    const [userNames, setUserNames] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }

    useEffect(() => {
        // const uniqueTeacherNames = [...new Set(allTeacherData.map(item => item.name))];
        // setTeacherNames(uniqueTeacherNames);
        setCourseNames([...new Set(courseData.map(item => ({ id: item.id, name: item.title })))]);
        setUserNames([...new Set(userData.map(item => ({ id: item.id, name: item.name })))]);
    }, [courseData,userData]);

    useEffect(() => {
        fetchCourseData();
        fetchUserData();
    }, []);

    const fetchCourseData = async () => {
        try {
            axios.get("http://localhost:3001/api/allCourses").then(
                (response) => {
                    console.log(response.data);
                    // setAllTeacherData(...allTeacherData, '');
                    setAllCourseData(response.data);
                }
            );

            // fetchContentData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            axios.get("http://localhost:3001/api/users").then(
                (response) => {
                    console.log(response.data);
                    // setAllUserData(...allTeacherData, '');
                    setAllUserData(response.data);
                }
            );

            // fetchContentData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const editTeacher = () => {
       const formData = new FormData();
        
        formData.append("city", city);
        formData.append("nic", nic);
        formData.append("mobile_no", mobile_no);
        formData.append("subject", subject);
        formData.append("qualification", qualification);
        // formData.append("mobile_no", mobile_no);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
       
        if(enrolmentToEdit == null){
            const data1 = {
                city: city,
                nic: nic,
                mobile_no: mobile_no,
                subject: subject,
                qualification: qualification,
                name: name,
                email:email,
                password: password,
              };

        axios
            .post("http://localhost:3001/api/createTeacher", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Teacher added successfully");
                navigate('/teachers');
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else{
            const data1 = {
                city: city,
                nic: nic,
                mobile_no: mobile_no,
                subject: subject,
                qualification: qualification,
                name: name,
                email:email,
                password: password,
                user_id:enrolmentToEdit.user_id,
                id:enrolmentToEdit.user_id, 
                role:enrolmentToEdit.role
              };
              console.log(data1);
              axios
              .put("http://localhost:3001/api/editUser", {
                  data: data1
              })
              .then((res) => {
                  // setCourses(res.data);
                  // setName(res.data);
                  console.log(res.data);
                  handleClose();
                  window.alert("Teacher edited successfully");
                  navigate('/teachers');
                  window.location.reload(false);
              })
              .catch((err) => {
                  console.log(err);
              });
        }
    }





    const subjects = ['', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'];
    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {
        // If enrolmentToEdit is provided, set the state with the teacher's details
        if (enrolmentToEdit) {
          setName(enrolmentToEdit.name || "");
          setCity(enrolmentToEdit.city || "");
          setNic(enrolmentToEdit.nic || "");
          setMobileNo(enrolmentToEdit.mobile_no || "");
          setSubject(enrolmentToEdit.subject || "");
          setQualification(enrolmentToEdit.qualification || "");
          setPassword(enrolmentToEdit.password || "");
          setEmail(enrolmentToEdit.email || "");
          setState(enrolmentToEdit.state || "ACTIVE");
        } else {
            // If enrolmentToEdit is not provided (i.e., adding a new teacher), reset the state
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
      }, [enrolmentToEdit]);


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
                            {enrolmentToEdit ? "Edit Enrolment" : "Add New Enrolment  "}
                            <IconButton
                         color="black"
                         onClick={handleClose}
                        sx={{ float:"right" }}
                        >
                        <ClearIcon />
                        </IconButton>
                        </Typography>
                       

                        <Typography pl={1} pt={1}>
                            Course
                            </Typography>
                            <Autocomplete
                            onChange={(e, newValue) => setCourse(newValue)}
                            disablePortal
                            id="combo-box-demo"
                            options={courseNames.map((course) => ({ id: course.id, name: course.name }))}
                            getOptionLabel={(course) => course.name}
                            value={course}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Select Course" />
                            )}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            />

                            <Typography pl={1} pt={1}>
                            Student
                            </Typography>
                            <Autocomplete
                            onChange={(e, newValue) => setUser(newValue)}
                            disablePortal
                            id="combo-box-demo1"
                            options={userNames.map((user) => ({ id: user.id, name: user.name }))}
                            getOptionLabel={(user) => user.name}
                            value={user}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Select User" />
                            )}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            key={(user) => user.id}
                            />
                        <Typography pl={1} pt={1}>
                        Subject
                        </Typography>
                        <Autocomplete
                        onChange={(e, newValue) => setSubject(newValue)}
                        disablePortal
                        options={subjects}
                        value={subject || ''}
                        sx={{ paddingLeft: '10px', mt: '0.5rem', width: '95%' }}
                        renderInput={(params) => <TextField {...params} placeholder="Select Subject" />}
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

export default EnrolmentModal;
