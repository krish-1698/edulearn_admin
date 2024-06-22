import {
    Box,
    Button,
    Card,
    CardContent,
    Modal,
    TextField,
    Typography,
    Autocomplete,
    Container,
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UploadIcon from '@mui/icons-material/Upload';
// import {VideoUploadWidget} from '../components/CloudinaryFileUpload';
import {ImageUploadWidget} from '../components/CloudinaryFileUpload';
import "./modal.css";



function CourseContentModal({ open, setOpen, courseToEdit,courseId }) {
    let navigate = useNavigate();

    const [teacherData, setTeacherData] = useState([]);
    const [courseNames, setCourseNames] = useState([]);

    const [course, setCourse] = useState({ id: "", name: "" });
    const [name, setName] = useState({ id: "", name: "" });
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [language, setLanguage] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
    const [title, setTitle] = useState("");


 
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const [courseData, setAllCourseData] = useState([]);
    const [document, setDocument] = useState(null);
    const [uploadChoice, setUploadChoice] = useState('both');

    const handleVideoUpload = (error, result, widget) => {
        if ( error ) {
          widget.close({
            quiet: true
          });
          return;
        }
        if(result?.info?.resource_type == 'video'){
            setVideo(result?.info?.secure_url);
            console.log("asdfg");
        }
        else{
            setDocument(result?.info?.secure_url);
            console.log("yres");
        }
        
        console.log(result);
        console.log(video,"xnnnxn");
      }

      const handleDocumentUpload = (error, result, widget) => {

        if ( error ) {
          widget.close({
            quiet: true
          });
          return;
        }
        setDocument(result?.info?.secure_url);
        console.log(result);
        console.log(document,"xnnnxn");
      }

    //   const handleUpload = (error, result, widget, identifier) => {
    //     console.log("printing");
    //     if (error) {
    //         widget.close({
    //             quiet: true
    //           });
    //       console.error("Upload error:", error);
    //       return;
    //     }
    
    //     if (result?.event === 'success') {
    //       const uploadedFileUrl = result?.info?.secure_url;
    //         console.log(uploadedFileUrl);
    //       if (identifier === 'video') {
    //         if (result?.info?.resource_type === 'video') {
    //           setVideo(uploadedFileUrl);
    //         } else {
    //           alert('Please upload a valid video file.');
    //         }
    //       } else if (identifier === 'document') {
    //         if (['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(result?.info?.format)) {
    //           setDocument(uploadedFileUrl);
    //         } else {
    //           alert('Please upload a valid document file (PDF or Word).');
    //         }
    //       }
    //     }
    //   };

      useEffect(() => {
        // const uniqueTeacherNames = [...new Set(allTeacherData.map(item => item.name))];
        // setTeacherNames(uniqueTeacherNames);
        setCourseNames([...new Set(courseData.map(item => ({ id: item.id, name: item.title })))]);
    }, [courseData]);

      useEffect(() => {
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
      }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }


    const editStudent = () => {
        let filePath;
        if(uploadChoice == 'both'){
            filePath = `${video},${document}`;
        }
        else if(uploadChoice == 'video'){
            filePath = video;
        }
        else{
            filePath = document;
        }
        console.log(course);
       const formData = new FormData();
        console.log(courseToEdit);
        if(courseToEdit == null){

            const data1 = {
                course_id: courseId,
                title: title,
                description: description,
                // file_path: video,
                file_path: filePath,
                file_type: uploadChoice
              };
    console.log(formData);  
    console.log(data1);

        axios
            .post("http://localhost:3001/api/addSubtopic", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Content added successfully")
                navigate('/courses')
                window.location.reload(false);
                setTitle('');
                setVideo('');
                setDescription('');
            })
            .catch((err) => {
                console.log(err);
            });
}else{
    const data1 = {
                // course_id: course.id,
                title: title,
                description: description,
                // file_path: video,
                subtopic_id: courseToEdit.id,
                file_path: filePath,
                file_type: uploadChoice
      };
      console.log(data1);
    axios
    .put("http://localhost:3001/api/editSubTopic", {
        data: data1
    })
    .then((res) => {
        // setCourses(res.data);
        // setName(res.data);
        console.log(res.data);
        handleClose();
        window.alert("Content edited successfully")
        navigate('/courses')
        window.location.reload(false);
        setTitle('');
                setVideo('');
                setDescription('');
    })
    .catch((err) => {
        console.log(err);
    });
}
        
       
       
    }

 

    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
        setCourse( "")
            setTitle("");
            setDescription( "");
            setVideo("");
            setUploadChoice('both');
            setDocument("")
    }


    useEffect(() =>{
        console.log(courseToEdit);
        if (courseToEdit) {
            setCourse({id: courseToEdit.course_id, name: courseToEdit.title} || "")
            setTitle(courseToEdit.title || "");
            setDescription(courseToEdit.description || "");
            setUploadChoice(courseToEdit.file_type || "");
            if(courseToEdit.file_type == 'video'){
                setVideo(courseToEdit.file_path || "");
            }
            else if(courseToEdit.file_type == 'document'){
                setDocument(courseToEdit.file_path || "");
            }
            else if(courseToEdit.file_type == 'both'){
                let paths =  courseToEdit.file_path.split(",");
                setVideo(paths[0]);
                setDocument(paths[1]);
            }
            else{

            }
            // setDescription(courseToEdit.description || "");
            
          }else{
            setCourse({ id: "", name: "" });
            setTitle("");
            setCity("");          
            setMobileNo("");
            setSubject("");          
            setLanguage("");
            setType("");          
            setDescription("");
            setEmail("");
            setState("");
            setImage("");
            setVideo("");
            setDocument("");
          }
         
    }, [courseToEdit]);


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
                             {courseToEdit ? "Edit Course Content" : "Add New Coure content"}
                             <IconButton
                         color="black"
                         onClick={handleClose}
                        sx={{ float:"right" }}
                        >
                        <ClearIcon />
                        </IconButton>
                        </Typography>

                        {/* <Typography pl={1} pt={1}>
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
                            /> */}
                         <Typography pl={1} pt={1}>
                            Title
                        </Typography>
                        <TextField
                            required
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Title"
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></TextField>
                        

                        <Typography pl={1} pt={1}>
                            Description
                        </Typography>
                        <TextField
                            multiline
                            maxRows={4}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="Description"
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></TextField>
                         <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend">What would you like to upload?</FormLabel>
                        <RadioGroup
                        row
                        aria-label="upload-choice"
                        name="upload-choice"
                        value={uploadChoice}
                        onChange={(e) => setUploadChoice(e.target.value)}
                        >
                        <FormControlLabel value="video" control={<Radio />} label="Only Video" />
                        <FormControlLabel value="document" control={<Radio />} label="Only Document" />
                        <FormControlLabel value="both" control={<Radio />} label="Both" />
                        </RadioGroup>
                       </FormControl>
                       {uploadChoice !== 'document' && (
                        <>
                         <Typography pl={1} pt={1}>
                            Video
                            </Typography>
                            {video && <video src={video} controls className="image-preview" />}
                            {/* {video && (
              <div> */}
              {/* {video.includes("youtube.com") ? (
                // YouTube video link
                <iframe
                  width="560"
                  height="315"
                  src={video.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Other video link (assuming it's a direct video file)
                <video width="400" controls>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
                )} */}
                            {/* Updated ImageUploadWidget for video uploads */}
                            <ImageUploadWidget onUpload={handleVideoUpload} identifier="first">
                            {({ open }) => {
                                function handleOnClick(e) {
                                e.preventDefault();
                                open();
                                }
                                return (
                                <button onClick={handleOnClick} id="upload-button">
                                    <UploadIcon />
                                    Upload Video
                                </button>
                                );
                            }}
                            </ImageUploadWidget>
                            </>
                       )}
             
                        {uploadChoice !== 'video' && (
                            <>
                            <Typography pl={1} pt={1}>
                                Document (Word/PDF)
                            </Typography>
                            {document && (
                                <a href={document} target="_blank" rel="noopener noreferrer">
                                View Document
                                </a>
                            )}
                            <ImageUploadWidget onUpload={handleVideoUpload}>
                                {({ open }) => {
                                function handleOnClick(e) {
                                    e.preventDefault();
                                    open();
                                }
                                return (
                                    <button onClick={handleOnClick} id="upload-button">
                                    <UploadIcon />
                                    Upload Document
                                    </button>
                                );
                                }}
                            </ImageUploadWidget>
                            </>
                        )}
                     
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

export default CourseContentModal;
