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
    const [teacherData, setAllTeacherData] = useState([]);

    const [course, setCourse] = useState({ id: "", name: "" });
    const [user, setUser] = useState({ id: "", name: "" });
    const [teacher, setTeacher] = useState({ id: "", name: "" });

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
    const [teacherNames, setTeacherNames] = useState([]);

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
        // setTeacherNames([...new Set(teacherData.map(item => ({ id: item.id, name: item.name })))]);
    }, [courseData,userData]);

    useEffect(() => {
        fetchCourseData();
        fetchUserData();
        // fetchTeacherData();
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

    // const fetchTeacherData = async () => {
    //     try {
    //         axios.get("http://localhost:3001/api/teachers").then(
    //             (response) => {
    //                 console.log(response.data);
    //                 // setAllTeacherData(...allTeacherData, '');
    //                 setAllTeacherData(response.data);
    //             }
    //         );

    //         // fetchContentData();
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };



    const editTeacher = () => {
       
        if(enrolmentToEdit == null){
            const data1 = {
                course_id: course.id,
                user_id: user.id,
              };

        axios
            .post("http://localhost:3001/api/saveEnrolment", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Enrolment added successfully");
                navigate('/enrolments');
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else{
            const data1 = {
                course_id:course.id,
                user_id: user.id,
                enrolment_id : enrolmentToEdit.id
              };
              console.log(data1);
              axios
              .put("http://localhost:3001/api/ediEnrolment", {
                  data: data1
              })
              .then((res) => {
                  // setCourses(res.data);
                  // setName(res.data);
                  console.log(res.data);
                  handleClose();
                  window.alert("Enrolment edited successfully");
                  navigate('/enrolments');
                  window.location.reload(false);
              })
              .catch((err) => {
                  console.log(err);
              });
        }
    }





    const subjects = ['', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];
    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }
    useEffect(() => {
        console.log("skm",enrolmentToEdit);
        // If enrolmentToEdit is provided, set the state with the teacher's details
        if (enrolmentToEdit) {
          setCourse({id:enrolmentToEdit.id, name:enrolmentToEdit.title } || { id: "", name: "" });
          setUser({id:enrolmentToEdit.sid, name:enrolmentToEdit.sname } || { id: "", name: "" });
        } else {
            // If enrolmentToEdit is not provided (i.e., adding a new teacher), reset the state
            setCourse( { id: "", name: "" });
            setUser( { id: "", name: "" });
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
