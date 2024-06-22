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


function DoubtsInfoTable() {
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
    const [expandedRowsForAnswrs, setExpandedRowsForAnswers] = useState({}); // State to manage expanded rows

    // Function to toggle the visibility of additional content for a row
    const toggleRowExpansion = (rowId) => {
      setExpandedRows((prevState) => ({
        ...prevState,
        [rowId]: !prevState[rowId], // Toggle the state for the clicked row
      }));
      fetchContentForEachRow(rowId);
    };

    const toggleRowExpansionForAnswers = (parentRowId, nestedRowId) => {
        const combinedId = `${parentRowId}-${nestedRowId}`;
        setExpandedRowsForAnswers((prevState) => ({
            ...prevState,
            [combinedId]: !prevState[combinedId] // Toggle the state for the clicked row
        }));
        fetchAnswerReportsForEachRow(nestedRowId);
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
        const confirmed = window.confirm("Are you sure you want to delete this answer?");
  
        // Check if the user confirmed the action
        if (confirmed) {
            Axios.delete(`http://localhost:3001/api/deleteAnswer/${contentId}`).then((response) => {
                alert("Content Deleted successfully");
                window.location.reload(false);
              })
              .catch((err) => {
                if (err.response && err.response.status === 403) {
                    window.alert(err.response.data);
                } else {
                    window.alert("An error occurred while deleting the doubt.");
                }
                console.log(err);
            });
        }         
    }

    function deleteCourse(doubtId) {
        const confirmed = window.confirm("Are you sure you want to delete this doubt?");
    
        // Check if the user confirmed the action
        if (confirmed) {
            Axios.delete(`http://localhost:3001/api/deleteDoubt/${doubtId}`)
                .then((response) => {
                    window.alert("Doubt Deleted successfully");
                    window.location.reload(false);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 403) {
                        window.alert(err.response.data);
                    } else {
                        window.alert("An error occurred while deleting the doubt.");
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
               Axios.get("http://localhost:3001/api/getAllGroupsDoubts").then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setCourseData(response.data);
                    }
                );
           

            // fetchContentData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchContentData = async () => {
        try {

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
           

            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [courseContentRowData, setCourseContentRowData] = useState([]);
    const [answerReportRowData, setAnswerReportRowData] = useState([]);


      const fetchContentForEachRow = (doubtId) => {
        Axios.get("http://localhost:3001/api/getAllAnswersForDoubt",
        {params:{
            doubt_id:doubtId,
            user_id: localStorage.getItem('user_id')
          }}
        ).then(
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


        const fetchAnswerReportsForEachRow = (doubtId) => {
            Axios.get(`http://localhost:3001/api/reportOrLikeDoubtForUser/${doubtId}`).then(
                (response) => {
                    console.log(response.data);
                    // setTeacherData(...teacherData, response.data);
                    setAnswerReportRowData(response.data);
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
                <h2>Doubts</h2></div> 
            <div style={{float: "left", width: "2%"}}>
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box sx={{ my: 2 }}>
                        {/* <Button style={{ width: "180px" }} onClick={handleOpenAddCourseModal} variant="contained" startIcon={<AddIcon />}>
                            Add Course
                        </Button> */}
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
                            <TableCell><b>Topic</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell ><b> Image</b></TableCell>
                            <TableCell><b>Group Name</b></TableCell>
                            <TableCell><b>Posted By</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.map((row) => (
                            <React.Fragment key={row.id}>
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.topic}</TableCell>
                                <TableCell >{row.description}</TableCell>
                                <TableCell sx={{ width: '30%' }}>
                                {(row.img_path == '' || row.img_path == null)  && (
                                <span>No Image</span>
                                 )}
                                 {(row.img_path)  && (
                                    <img src={row.img_path} controls className="image-preview" /> 
                                 )}</TableCell>
                                <TableCell >{row.groupName}</TableCell>
                                <TableCell >{row.postedBy}</TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>
                                <Tooltip title="Expand to view content">
                                <IconButton aria-label="expand row" onClick={() => toggleRowExpansion(row.id)}>
                                {expandedRows[row.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                            </IconButton>
                            </Tooltip>
                                 
                                        {/* <IconButton aria-label="edit" onClick={() => handleOpenEditCourseModal(row)}>
                                            <EditIcon />
                                        </IconButton> */}
                             
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
                                {/* <Button style={{ width: "180px" }} onClick={() => handleOpenAddCourseContentModal(row.id)} variant="contained" startIcon={<AddIcon />}>
                            Add Content
                        </Button> */}
                    </Box>
                                <Box sx={{ margin: 1 }}>
                                <Typography variant="body1" gutterBottom>
                        {courseContentRowData.length != 0 ? (
                        <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ width: '20%' }}><b>Description</b></TableCell>
                              <TableCell sx={{ width: '40%' }}><b>Image</b></TableCell>
                              <TableCell sx={{ width: '10%' }}><b>Answered By</b></TableCell>
                              <TableCell sx={{ width: '10%' }}><b>Liked By</b></TableCell>
                              <TableCell sx={{ width: '10%' }}><b>Actions</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* Render content for the selected row */}
                            {courseContentRowData.map((contentRow) => (
                                <React.Fragment key={contentRow.id}>
                              <TableRow key={contentRow.id}>

                                <TableCell>{contentRow.description}</TableCell>
                                {/* <TableCell><video src={contentRow.file_path} controls className="image-preview" /></TableCell> */}
                                
                                <TableCell> 
                                {(contentRow.img_path == '' || contentRow.img_path == null)  && (
                                <span>No Image</span>
                                 )}
                                 {(contentRow.img_path)  && (
                                    <img src={contentRow.img_path} controls className="image-preview" /> 
                                 )}
                                 </TableCell>
                                <TableCell>{contentRow.name}</TableCell>
                                <TableCell>{contentRow.likeCount}</TableCell>
                                



                                <TableCell > <Stack direction="row" spacing={1}>
                                <Tooltip title="Expand to view content">
                                <IconButton aria-label="expand row" onClick={() => toggleRowExpansionForAnswers(row.id,contentRow.id)}>
                                {expandedRowsForAnswrs[`${row.id}-${contentRow.id}`] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                            </IconButton>
                            </Tooltip>

                                        {/* <IconButton aria-label="edit" onClick={() => handleOpenEditCourseContentModal(contentRow)}>
                                            <EditIcon />
                                        </IconButton>
                                     */}
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
                              <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            {/* Collapse component to show/hide additional content */}
                            <Collapse in={expandedRowsForAnswrs[`${row.id}-${contentRow.id}`]} timeout="auto" unmountOnExit>
                                {/* Your additional content for the row */}
                                <Box style={{ float: "right",padding:'10px' }}>
                    </Box>
                                <Box sx={{ margin: 1 }}>
                                <Typography variant="body1" gutterBottom>
                        {answerReportRowData.length != 0 ? (
                        <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ width: '20%' }}><b>Reason</b></TableCell>
                              <TableCell sx={{ width: '40%' }}><b>Reported By</b></TableCell>
                              <TableCell sx={{ width: '10%' }}><b>Actions</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* Render content for the selected row */}
                            {answerReportRowData.map((contentRow) => (
                              <TableRow key={contentRow.id}>

                                <TableCell>{contentRow.reason}</TableCell>
                                {/* <TableCell><video src={contentRow.file_path} controls className="image-preview" /></TableCell> */}
                                
                                <TableCell>{contentRow.name}</TableCell>                               



                                <TableCell > <Stack direction="row" spacing={1}>

                                    <Box style={{ position: "relative" }}>
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
                            <p><strong><i>No reports available for this answer.</i></strong></p>
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
                        ):(
                            <p><strong><i>No answers available for this doubt.</i></strong></p>
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

export default DoubtsInfoTable;
