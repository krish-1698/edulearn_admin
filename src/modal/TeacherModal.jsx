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

    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
      const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
  
    if (!subject) {
      errors.subject = 'Subject is required';
    }
    if (!password) {
        errors.password = 'Password is required';
      }
   
    if (!nic) {
        errors.nic = 'NIC is required';
      }
      if (!city) {
        errors.city = 'City is required';
      }

      if (!qualification) {
        errors.qualification = 'Qualification is required';
      }

      if (!mobile_no) {
        errors.mobile_no = 'Mobile Number is required';
      } else if (!/^[0-9]{10}$/.test(mobile_no)) {
        errors.mobile_no = 'Mobile Number must be 10 digits';
      }
  
    if (!email) {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email Address is invalid';
    }
  
    return errors;
  };
  

    const editTeacher = () => {
        const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
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
       
        if(teacherToEdit == null){
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
                if (err.response) {
                    if (err.response.status === 400) {
                        alert(err.response.data);
                    }else {
                         alert("An error occurred while updating user."); 
                    }
                } else {
                       alert("Network error or server is unreachable. Please try again later.");
                }
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
                user_id:teacherToEdit.user_id,
                id:teacherToEdit.user_id, 
                role:teacherToEdit.role
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
                  if (err.response) {
                    if (err.response.status === 400) {
                        alert(err.response.data);
                    }else {
                         alert("An error occurred while updating user."); 
                    }
                } else {
                       alert("Network error or server is unreachable. Please try again later.");
                }
              });
        }
    }
    }



    const allDistricts = [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullaitivu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya"
      ];

    const subjects = ['', 'Physics', 'Chemistry', 'Biology'];
    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
        setName("");
          setCity("");
          setNic("");
          setMobileNo("");
          setSubject("");
          setQualification("");
          setPassword("");
          setEmail("");
          setState("ACTIVE");
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
                            error={formErrors.name}
                            helperText={formErrors.name}
                            onChange={(e) => setName(e.target.value)}
                        ></TextField>

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
                        {formErrors.subject && <Typography variant="body2" color="error" sx={{ fontSize: "0.75rem", mt: 0.5, ml: 3,mr:3 }}>{formErrors.subject}</Typography>}

                        {/* <Typography pl={1} pt={1}>
                            City
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="City"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></TextField> */}

                        <Typography pl={1} pt={1}>
                        City
                        </Typography>
                        <Autocomplete
                        onChange={(e, newValue) => setCity(newValue)}
                        disablePortal
                        options={allDistricts}
                        value={city || ''}
                        sx={{ paddingLeft: '10px', mt: '0.5rem', width: '95%' }}
                        renderInput={(params) => <TextField {...params} placeholder="Select City" />}
                        />
                        {formErrors.city && <Typography variant="body2" color="error" sx={{ fontSize: "0.75rem", mt: 0.5, ml: 3,mr:3 }}>{formErrors.city}</Typography>}

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
                            error={formErrors.nic}
                            helperText={formErrors.nic}
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
                            error={formErrors.mobile_no}
                            helperText={formErrors.mobile_no}
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
                            error={formErrors.qualification}
                            helperText={formErrors.qualification}
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
                            error={formErrors.email}
                            helperText={formErrors.email}
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
                            error={formErrors.password}
                            helperText={formErrors.password}
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
