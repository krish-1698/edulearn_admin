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
import {ImageUploadWidget} from '../components/CloudinaryFileUpload';
import UploadIcon from '@mui/icons-material/Upload';


function GroupModal({ open, setOpen, studentToEdit }) {
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

    const editStudent = () => {

        if(studentToEdit == null){

            const data1 = {
                name: name,
                img_path: image,
              };

        axios
            .post("http://localhost:3001/api/createGroup", {
                data: data1
            })
            .then((res) => {
                // setCourses(res.data);
                // setName(res.data);
                console.log(res.data);
                handleClose();
                window.alert("Group added successfully")
                navigate('/groups')
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
}else{
    const data1 = {
        name: name,
        img_path: image,
        group_id: studentToEdit.id
      };
    axios
    .put("http://localhost:3001/api/editGroup", {
        data: data1
    })
    .then((res) => {
        // setCourses(res.data);
        // setName(res.data);
        console.log(res.data);
        handleClose();
        window.alert("Group edited successfully")
        navigate('/groups')
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
        { label: 'Biology' }
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
            setImage(studentToEdit.img_path || "");          
            
          }else{
            setName("");
            setImage("");          
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
                             {studentToEdit ? "Edit Group" : "Add New Group"}
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

export default GroupModal;
