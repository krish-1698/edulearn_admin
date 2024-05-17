import { Box, Button, Collapse,Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import { AddCircle as AddIcon, Create } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { KeyboardArrowDown as ArrowDownIcon, KeyboardArrowUp as ArrowUpIcon } from '@mui/icons-material';
import VerifyIcon from "@mui/icons-material/CheckCircle"
import Axios from "axios";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import CreateTeacherModal from "../../modal/createTeacherModal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CourseModal from "../../modal/CourseModal";
import CourseContentModal from "../../modal/courseContentModal";
import Tooltip from '@mui/material/Tooltip';


function createData(title, updated_date, description, action) {
    return { title, updated_date, description, action };
}

const courses = [
    createData("Sub Topic 1", "07/03/2023", "file"),
    createData("Sub Topic 2", "10/03/2023", "file"),
    createData("Sub Topic 3", "15/03/2023", "file"),
];


function CourseInfoTable() {
    let navigate = useNavigate();

    const [courseData, setCourseData] = useState([]);
    const [courseContentData, setCourseContentData] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [pageContent, setPageContent] = React.useState(0);
    const [rowsPerPageContent, setRowsPerPageContent] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePageForContent = (event, newPage) => {
        setPageContent(newPage);
    };

    const handleChangeRowsPerPageForContent = (event) => {
        setRowsPerPageContent(+event.target.value);
        setPageContent(0);
    };

    const [expandedRows, setExpandedRows] = useState({}); // State to manage expanded rows

    // Function to toggle the visibility of additional content for a row
    const toggleRowExpansion = (rowId) => {
      setExpandedRows((prevState) => ({
        ...prevState,
        [rowId]: !prevState[rowId], // Toggle the state for the clicked row
      }));
      fetchContentForEachRow(rowId);
    };

    function onClickVerify(row) {
        Axios.put(`http://localhost:3001/api/verifyTeacher/${row.id}`)
            .then((response) => {
                toast.success("Teacher verification updated successfully", {
                    autoClose: 3000,
                });
                console.log("Teacher verification updated successfully");
                // You can add further handling here if needed
                // window.location.reload(false);
                fetchData();
            })
            .catch((error) => {
                console.error("Error updating teacher verification:", error);
                // You can add error handling here
            });
    }

    const [editData, setEditData] = useState([]);
    
    // function onClickEdit(row) {
    //     setEditData(row);
    //     modalOpen1();
    //     console.log("onClickEdit is called with row:", row);
    //     console.log("Testing",open1);

    // }

    function onClick3() {
        navigate("/freelancerpayment", { replace: true });
    }

    function onClick4(data) {
        localStorage.setItem('data', JSON.stringify(data))
        navigate("/freelancerpayment/new", { replace: true });
    }

    function deleteCourseContent(contentId) {
        const confirmed = window.confirm("Are you sure you want to delete this content?");
  
        // Check if the user confirmed the action
        if (confirmed) {
            Axios.delete(`http://localhost:3001/api/deleteSubTopic/${contentId}`).then((response) => {
                console.log("Nishaa Gopi");
                alert("Content Deleted successfully");
                window.location.reload(false);
              });
        }         
    }

    function deleteCourse(courseId) {
        const confirmed = window.confirm("Are you sure you want to delete this course?");
    
        // Check if the user confirmed the action
        if (confirmed) {
            Axios.delete(`http://localhost:3001/api/deleteCourse/${courseId}`)
                .then((response) => {
                    console.log("Nishaa Gopi");
                    window.alert("Course Deleted successfully");
                    window.location.reload(false);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 403) {
                        window.alert(err.response.data);
                    } else {
                        window.alert("An error occurred while deleting the course.");
                    }
                    console.log(err);
                });
        }
    }

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const startIndexContent = pageContent * rowsPerPageContent;
    const endIndexContent = startIndexContent + rowsPerPageContent;
    // const displayedData = teacherData.slice(startIndex, endIndex);
    const displayedData = Array.isArray(courseData) ? courseData.slice(startIndex, endIndex) : [];
    const displayedDataForContent = Array.isArray(courseContentData) ? courseContentData.slice(startIndexContent, endIndexContent) : [];

    const fetchData = async () => {
        try {
            if(localStorage.getItem('userType') == 'Teacher'){
                Axios.get(`http://localhost:3001/api/allcoursesForTeacher/${localStorage.getItem('user_id')}`).then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setCourseData(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }
              else{
                Axios.get("http://localhost:3001/api/allCourses").then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setCourseData(response.data);
                    }
                );
              }


           

            // fetchContentData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchContentData = async () => {
        try {
            if(localStorage.getItem('userType') == 'Teacher'){
                Axios.get(`http://localhost:3001/api/subTopicForTeacher/${localStorage.getItem('user_id')}`).then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setCourseData(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }else{
                Axios.get("http://localhost:3001/api/subTopic").then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setCourseContentData(response.data);
                    }
                )
                .catch((err) => {
                    console.log(err);
                  });
              }
           

            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [courseContentRowData, setCourseContentRowData] = useState([]);


      const fetchContentForEachRow = (courseId) => {
        Axios.get(`http://localhost:3001/api/subTopicbyCourseId/${courseId}`).then(
            (response) => {
                console.log(response.data);
                // setTeacherData(...teacherData, response.data);
                setCourseContentRowData(response.data);
            }
        )
        .catch((err) => {
            console.log(err);
          });
    }

    const handleOpenAddCourseModal = () => {
        setOpen(true);
        setEditData(null);
      };

      const handleOpenEditCourseModal = (course) => {
        setOpen(true);
        setEditData(course);
      };
    const [courseId, setCourseId] = useState([]);


      const handleOpenAddCourseContentModal = (courseId) => {
        setOpen1(true);
        setCourseId(courseId);
        setEditData(null);
      };

      const handleOpenEditCourseContentModal = (course) => {
        setOpen1(true);
        setCourseId(null);
        setEditData(course);
      };
       


    useEffect(() => {
        fetchData();
        fetchContentData();
    }, []);

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const modalOpen = () => setOpen(true);
    const modalOpen1 = () => setOpen1(true);

    return (


        <>
            <ToastContainer hideProgressBar={true} /> 
 
        <div style={{float:" left", width: "98%"}}>
                <h2>Courses</h2></div> 
            <div style={{float: "left", width: "2%"}}>
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box sx={{ my: 2 }}>
                        <Button style={{ width: "180px" }} onClick={handleOpenAddCourseModal} variant="contained" startIcon={<AddIcon />}>
                            Add Course
                        </Button>
                    </Box>

                    <Box>
                        {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                        <CourseModal setOpen={setOpen} open={open} courseToEdit={editData} />
                    </Box>

                </Box>
                </div>
    
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell ><b> Language</b></TableCell>
                            <TableCell ><b> Course fee</b></TableCell>

                            <TableCell ><b>Subject</b></TableCell>
                            <TableCell ><b>Teacher</b></TableCell>
                            <TableCell><b>Hours</b></TableCell>
                            <TableCell ><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.map((row) => (
                            <React.Fragment key={row.id}>
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.title}</TableCell>
                                <TableCell >{row.description}</TableCell>
                                <TableCell >{row.language}</TableCell>
                                <TableCell >Rs.{row.amount}</TableCell>
                                <TableCell >{row.subject}</TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.hours}</TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>
                                <Tooltip title="Expand to view content">
                                <IconButton aria-label="expand row" onClick={() => toggleRowExpansion(row.id)}>
                                {expandedRows[row.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                            </IconButton>
                            </Tooltip>
                                 
                                        <IconButton aria-label="edit" onClick={() => handleOpenEditCourseModal(row)}>
                                            <EditIcon />
                                        </IconButton>
                             
                                    <Box style={{ position: "relative" }}>
                                    {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                                        {/* <EditTeacherModal setOpen={setOpen1} open={open1} data={row} /> */}
                                    </Box>
                                   
                                    <IconButton aria-label="delete" color="error" onClick={() => deleteCourse(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Stack>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                            {/* Collapse component to show/hide additional content */}
                            <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                                {/* Your additional content for the row */}
                                <Box style={{ float: "right",padding:'10px' }}>
                                <Button style={{ width: "180px" }} onClick={() => handleOpenAddCourseContentModal(row.id)} variant="contained" startIcon={<AddIcon />}>
                            Add Content
                        </Button>
                    </Box>
                                <Box sx={{ margin: 1 }}>
                                <Typography variant="body1" gutterBottom>
                        {courseContentRowData.length != 0 ? (
                        <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ width: '20%' }}><b>Content Title</b></TableCell>
                              <TableCell sx={{ width: '20%' }}><b>Content Description</b></TableCell>
                              <TableCell sx={{ width: '50%' }}><b>Video</b></TableCell>
                              <TableCell sx={{ width: '10%' }}><b>Actions</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* Render content for the selected row */}
                            {courseContentRowData.map((contentRow) => (
                              <TableRow key={contentRow.id}>
                                <TableCell>{contentRow.title}</TableCell>
                                <TableCell>{contentRow.description}</TableCell>
                                <TableCell><video src={contentRow.file_path} controls className="image-preview" /></TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>


                                        <IconButton aria-label="edit" onClick={() => handleOpenEditCourseContentModal(contentRow)}>
                                            <EditIcon />
                                        </IconButton>
                                    
                                    <Box style={{ position: "relative" }}>
                                    {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                                        {/* <EditTeacherModal setOpen={setOpen1} open={open1} data={row} /> */}
                                    </Box>


                                    <IconButton aria-label="delete" color="error" onClick={() => deleteCourseContent(contentRow.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Stack>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                        ):(
                            <p><strong><i>No content available for this course.</i></strong></p>
                        )}
                      </Typography>
                                </Box>
                            </Collapse>
                            </TableCell>
                        </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={courseData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginLeft: '800px' }}
            />


                    <Box>
                        <CourseContentModal setOpen={setOpen1} open={open1} courseToEdit={editData} courseId = {courseId}/>
                    </Box>
        </>


                                            
    );
}

export default CourseInfoTable;
