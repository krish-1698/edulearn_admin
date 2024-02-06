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
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UploadIcon from '@mui/icons-material/Upload';
import {ImageUploadWidget} from '../components/CloudinaryFileUpload';
import "./modal.css";


function AdvertisementModal({ open, setOpen, advertisementToEdit }) {
    let navigate = useNavigate();

    const [teacherData, setTeacherData] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("");
    const [language, setLanguage] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");


 
    const [selectedFile, setSelectedFile] = useState(null);
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        // const path = URL.createObjectURL(file);
        setSelectedFile(file);
    }


    const editStudent = () => {

        
       const formData = new FormData();
        console.log(advertisementToEdit);
        if(advertisementToEdit == null){

            const data1 = {
                city: city,
                name: name,
                email: email,
                type: type,
                subject: subject,
                language: language,
                mobile: mobileNo,
                description: description,
                img_path:image,
                state:state
              };
    console.log(formData);  
    console.log(data1);

        axios
            .post("http://localhost:3001/api/addAdvertisement", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Advertisment added successfully")
                navigate('/advertisements')
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
}else{
    const data1 = {
        city: city,
        name: name,
         email: email,
        type: type,
        subject: subject,
         language: language,
         mobile: mobileNo,
         description: description,
         state:state,
         img_path:image,
        id: advertisementToEdit.id
      };
      console.log(data1);
    axios
    .put("http://localhost:3001/api/editAd", {
        data: data1
    })
    .then((res) => {
        // setCourses(res.data);
        // setName(res.data);
        console.log(res.data);
        handleClose();
        window.alert("Advertisment edited successfully")
        navigate('/advertisements')
        window.location.reload(false);
    })
    .catch((err) => {
        console.log(err);
    });
}
        
       
       
    }

 
    const subjects = [
        '',
         'Physics',
    'Chemistry' ,
     'Biology' ,
    'Mathematics', 'Computer Science' 
    ]


    const languages = [
        '',
         'English' ,
         'Tamil' ,
         'Sinhala'
    ]

    const types = [
        '',
         'Normal' ,
         'Premium'
    ]

    const states = [
        '',
         'Paid' ,
         'Unpaid' 
    ]
    // const [open, setOpen] = useState();
    // const modalOpen = () => setOpen(true);
    // const modalOpen = () => setOpen();

    function handleClose() {
        setOpen(false);
    }


    useEffect(() =>{
        if (advertisementToEdit) {
            setName(advertisementToEdit.name || "");
            setSubject(advertisementToEdit.subject || "");          
            setLanguage(advertisementToEdit.language || "");
            setDescription(advertisementToEdit.description || "");
            setType(advertisementToEdit.type || "");
            setCity(advertisementToEdit.city || "");
            setEmail(advertisementToEdit.email || "");
            setMobileNo(advertisementToEdit.mobile || "");
            setState(advertisementToEdit.state || "");
            setImage(advertisementToEdit.img_path || "");
            // setDescription(advertisementToEdit.description || "");
            
          }else{
            setName("");
            setCity("");          
            setMobileNo("");
            setSubject("");          
            setLanguage("");
            setType("");          
            setDescription("");
            setEmail("");
            setState("");
            setImage("");
          }
         
    }, [advertisementToEdit]);


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
                             {advertisementToEdit ? "Edit Advertisement" : "Add New Advertisement"}
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
                            onChange={(e,newValue) => setSubject(newValue)}
                            disablePortal
                            options={subjects}
                            value={subject || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Subject" />}
                        />
                         <Typography pl={1} pt={1}>
                            Language
                        </Typography>
                        <Autocomplete
                            onChange={(e,newValue) => setLanguage(newValue)}
                            disablePortal
                            options={languages}
                            value={language || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Language" />}
                        />
                         <Typography pl={1} pt={1}>
                            Type
                        </Typography>
                        <Autocomplete
                            onChange={(e,newValue) => setType(newValue)}
                            disablePortal
                            options={types}
                            value={type || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select Type" />}
                        />

                        <Typography pl={1} pt={1}>
                            City
                        </Typography>
                        <TextField
                            maxRows={4}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="City"
                            size="small"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
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

                        <Typography pl={1} pt={1}>
                            Email
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="email"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></TextField>

                        <Typography pl={1} pt={1}>
                            Mobile Number
                        </Typography>
                        <TextField
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            placeholder="mobileNo"
                            size="small"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        ></TextField>
                         <Typography pl={1} pt={1}>
                            State
                        </Typography>
                        <Autocomplete
                            onChange={(e,newValue) => setState(newValue)}
                            disablePortal
                            options={states}
                            value={state || ''}
                            sx={{ paddingLeft: "10px", mt: "0.5rem", width: "95%" }}
                            renderInput={(params) => <TextField {...params} placeholder="Select state" />}
                        />
                         <Typography pl={1} pt={1}>
                            Image
                            </Typography>
                          {image && <img src={image} alt="menu item" className="image-preview"/>}
            <ImageUploadWidget onUpload={handleOnUpload}>
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
                            <Button variant="contained" onClick={editStudent}>Save</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
}

export default AdvertisementModal;
