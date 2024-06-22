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
import {ImageUploadWidget} from '../components/CloudinaryFileUpload';
import UploadIcon from '@mui/icons-material/Upload';

function CourseModal({ open, setOpen, courseToEdit }) {
    let navigate = useNavigate();

    const [courseData, setCourseData] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState("");
    const [amount, setAmount] = useState("");
    const [subject, setSubject] = useState("");
    // const [teacher, setTeacher] = useState({ id: "", name: "" });
    const [teacher, setTeacher] = useState(null);
    const [hours, setHours] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentFile, setContentFile] = useState("");
    const [state, setState] = useState("ACTIVE");

    const [allTeacherData,setAllTeacherData] = useState([]);
    const [teacherNames, setTeacherNames] = useState([]);

 
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgPath, setImgPath] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }

    const [image, setImage] = useState('');

    const handleOnUpload = (error, result, widget) => {
        if ( error ) {
          widget.close({
            quiet: true
          });
          return;
        }
        setImage(result?.info?.secure_url);
        console.log(result);
      }


    const editCourse = () => {
        // console.log(teacher);
        const errors = validate();
        setFormErrors(errors);
       const formData = new FormData();
        console.log(courseToEdit);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("subject", subject);
        formData.append("amount", amount);
        formData.append("teacher", teacher);
        formData.append("hours", hours);
        
    if (Object.keys(errors).length === 0) {
        if(courseToEdit == null){
          
            const data1 = {
                title: title,
                description: description,
                language: language,
                subject: subject,
                amount: amount,
                teacher_id: teacher.id,
                credits:3,
                hours: hours,
                img_path: image
              };
              console.log(data1);
              axios
              .post("http://localhost:3001/api/addCourse", {
                  data: data1
              })
              .then((res) => {
                  // setCourses(res.data);
                  // setName(res.data);
                  console.log(res.data);
                  handleClose();
                  window.alert("Course added successfully");
                  navigate('/courses');
                  window.location.reload(false);
              })
              .catch((err) => {
                  console.log(err);
              });
        }else{
            const data1 = {
                title: title,
                description: description,
                language: language,
                subject: subject,
                amount: amount,
                hours: hours,
                credits:4,
                teacher_id:teacher.id,
                course_id:courseToEdit.id,
                img_path: image

              };
              console.log(data1);
              axios
              .put("http://localhost:3001/api/editCourse", {
                  data: data1
              })
              .then((res) => {
                  // setCourses(res.data);
                  // setName(res.data);
                  console.log(res.data);
                  handleClose();
                  window.alert("Course edited successfully");
                  navigate('/courses');
                  window.location.reload(false);
              })
              .catch((err) => {
                  console.log(err);
              });
        }
    }
    }

    const fetchData = async () => {
        try {
            axios.get("http://localhost:3001/api/teachers").then(
                (response) => {
                    console.log(response.data);
                    setAllTeacherData(...allTeacherData, '');
                    setAllTeacherData(response.data);

                    const userId = localStorage.getItem('user_id');
                    const userType = localStorage.getItem('userType');
                    // Find the teacher based on userId (Assuming teacher has a userId field)
                    const selectedTeacher = response.data.find((teacher) => teacher.user_id == userId);
                    console.log(selectedTeacher);
                    if (selectedTeacher) {
                        setTeacher({ id: selectedTeacher.id, name: selectedTeacher.name });
                      } else {
                        setTeacher(null);
                      }

                }
            );

            // fetchContentData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // const uniqueTeacherNames = [...new Set(allTeacherData.map(item => item.name))];
        // setTeacherNames(uniqueTeacherNames);
        setTeacherNames([...new Set(allTeacherData.map(item => ({ id: item.id, name: item.name })))]);
    }, [allTeacherData]);


    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

    // const subjects = [
    //    'Physics' ,'Chemistry' ,'Biology','Mathematics'    ]
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
      const errors = {};
    if (!title) {
      errors.title = 'Name is required';
    }
  
    if (!description) {
      errors.subject = 'Subject is required';
    }
  
    if (!language) {
      errors.language = 'Language is required';
    }
  
    if (!description) {
        errors.description = 'Description is required';
      }
      if (!subject) {
        errors.subject = 'City is required';
      }

      if (!amount) {
        errors.amount = 'Type is required';
      }

      if (!hours) {
        errors.hours = 'State is required';
      }

    //   if (!image1) {
    //     errors.image1 = 'Mobile Number is required';
    //   }
      if (!teacher) {
        errors.teacher = 'Teacher is required';
      }
    
    return errors;
  };
  

       const subjects = [
        '',
         'Physics' ,
         'Chemistry',
         'Biology' 
    ]


    const languages = [
        '',
        'English' ,
        'Tamil' ,
         'Sinhala'
    ]
    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
        setTitle(null);
            setDescription(null);
            setLanguage(null);
            setSubject(null);
            setAmount(null);
            setTeacher(null);
            setHours(null);
            setFormErrors("");
    }
    useEffect(() => {
        // If teacherToEdit is provided, set the state with the teacher's details
        if (courseToEdit) {
          setTitle(courseToEdit.title || "");
          setDescription(courseToEdit.description || "");
          setLanguage(courseToEdit.language || "");
          setSubject(courseToEdit.subject || "");
          setAmount(courseToEdit.amount || "");
          setTeacher({id:courseToEdit.teacher_id, name:courseToEdit.name } || { id: "", name: "" });
          setHours(courseToEdit.hours || "0");
          setImage(courseToEdit.img_path || "0");
          setState(courseToEdit.state || "ACTIVE");
        } else{
            setTitle(null);
            setDescription(null);
            setLanguage(null);
            setSubject(null);
            setAmount(null);
            setTeacher(null);
            setHours(null);
        }
      }, [courseToEdit]);
      const isTeacherDisabled = localStorage.getItem('userType') == 'Teacher';

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
                            {courseToEdit ? "Edit Course" : "Add New Course  "}
                            <IconButton
                         color="black"
                         onClick={handleClose}
                        sx={{ float:"right" }}
                        >
                        <ClearIcon />
                        </IconButton>
                        </Typography>
                       

                        <Typography pl={1} pt={1}>
                            Course Title
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Title"
                            size="small"
                            value={title || '' }
                            error={formErrors.title}
                            helperText={formErrors.title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Subject
                        </Typography>
                        <Autocomplete
                            onChange={(e,newValue) => setSubject(newValue)}
                            disablePortal
                            options={subjects}
                            value={subject || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Subject" />}
                        />
                           {formErrors.subject && <Typography variant="body2" color="error" sx={{ fontSize: "0.75rem", mt: 0.5, ml: 3,mr:3 }}>{formErrors.subject}</Typography>}

                        <Typography pl={1} pt={1}>
                            Description
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Description"
                            size="small"
                            value={description || ''}
                            error={formErrors.description}
                            helperText={formErrors.description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Language
                        </Typography>
                        <Autocomplete
                            onChange={(e,newValue) => setLanguage(newValue)}
                            disablePortal
                            options={languages}
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                            value={language || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Language" />}
                        />
                           {formErrors.language && <Typography variant="body2" color="error" sx={{ fontSize: "0.75rem", mt: 0.5, ml: 3,mr:3 }}>{formErrors.language}</Typography>}
                        {/* <Typography pl={1} pt={1}>
                            Language
                        </Typography>
                        <TextField
                            multiline
                            maxRows={4}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Language"
                            size="small"
                            value={language || ''}
                            onChange={(e) => setLanguage(e.target.value)}
                        ></TextField> */}
                        {localStorage.getItem('userType') != 'Teacher' && (
                                <> 
                                 <Typography pl={1} pt={1}>
                            Teacher
                            </Typography>
                            <Autocomplete
                            onChange={(e, newValue) => setTeacher(newValue)}
                            disablePortal
                            id="combo-box-demo"
                            options={teacherNames.map((teacher) => ({ id: teacher.id, name: teacher.name }))}
                            getOptionLabel={(teacher) => teacher.name}
                            value={teacher}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Select Teacher" />
                            )}
                            disabled={isTeacherDisabled}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            />
                               {formErrors.teacher && <Typography variant="body2" color="error" sx={{ fontSize: "0.75rem", mt: 0.5, ml: 3,mr:3 }}>{formErrors.teacher}</Typography>}
                                 </>
                            )} 
                           

                        <Typography pl={1} pt={1}>
                            Course Fee
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Amount"
                            size="small"
                            value={amount || ''}
                            error={formErrors.amount}
                            helperText={formErrors.amount}
                            onChange={(e) => setAmount(e.target.value)}
                        ></TextField>


                        <Typography pl={1} pt={1}>
                            Hours
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Hours"
                            size="small"
                            value={hours || ''}
                            error={formErrors.hours}
                            helperText={formErrors.hours}
                            onChange={(e) => setHours(e.target.value)}
                        ></TextField>
                        <Typography pl={1} pt={1}>
                            Image
                            </Typography>
                          {image && <img src={image} alt="menu item" className="image-preview"/>}
            <ImageUploadWidget onUpload={handleOnUpload} identifier="first">
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              console.log("hekko");
              open();
            }
            return (
              <button onClick={handleOnClick} id="upload-button">
                <UploadIcon />
                Upload
              </button>
            )
          }}
            </ImageUploadWidget>

                        
                     
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
                            <Button variant="contained" onClick={editCourse}>Save</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}

export default CourseModal;
