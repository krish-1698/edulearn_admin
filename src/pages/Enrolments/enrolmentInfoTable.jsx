import { Box, Button } from "@mui/material";
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
import VerifyIcon from "@mui/icons-material/CheckCircle"
import Axios from "axios";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CourseModal from "../../modal/CourseModal";
import EnrolmentModal from "../../modal/enrolmentModal";

function createData(title, updated_date, description, action) {
    return { title, updated_date, description, action };
}

const courses = [
    createData("Sub Topic 1", "07/03/2023", "file"),
    createData("Sub Topic 2", "10/03/2023", "file"),
    createData("Sub Topic 3", "15/03/2023", "file"),
];


function EnrolmentInfoTable() {
    let navigate = useNavigate();

    const [enrolmentData, setEnrolmentData] = useState([]);
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

    function deletefreelancer(freelancerid) {
        // Axios.post("http://localhost:3001/api/deletefreelancer", {

        //   freelancerid:freelancerid
        // }).then((response) => {
        //   console.log("Nishaa Gopi");
        //   // alert(response.data.message);
        //   window.location.reload(false);
        // });
    }

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const startIndexContent = pageContent * rowsPerPageContent;
    const endIndexContent = startIndexContent + rowsPerPageContent;
    // const displayedData = teacherData.slice(startIndex, endIndex);
    const displayedData = Array.isArray(enrolmentData) ? enrolmentData.slice(startIndex, endIndex) : [];
    // const displayedDataForContent = Array.isArray(courseContentData) ? courseContentData.slice(startIndexContent, endIndexContent) : [];

    const fetchData = async () => {
        try {

            if(localStorage.getItem('userType') == 'Teacher'){
                Axios.get(`http://localhost:3001/api/enrolmentForTeacher/${localStorage.getItem('user_id')}`).then(
                    (response) => {
                        console.log(response.data);
                        // setTeacherData(...teacherData, response.data);
                        setEnrolmentData(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
              }else{

              }
            Axios.get("http://localhost:3001/api/getAllEnrolments").then(
                (response) => {
                    console.log(response.data);
                    // setTeacherData(...teacherData, response.data);
                    setEnrolmentData(response.data);
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
            );

            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //   useEffect(() => {
    //     Axios.get("http://localhost:3001/api/teachers").then(
    //         (response) => {
    //             console.log(response.data);

    //             setTeacherData(...teacherData, response.data);

    //         }
    //     );
    // }, []);

    const handleOpenAddCourseModal = () => {
        setOpen(true);
        setEditData(null);
      };

      const handleOpenEditCourseModal = (course) => {
        setOpen(true);
        setEditData(course);
      };
       


    useEffect(() => {
        fetchData();
        fetchContentData();
    }, []);

    const [open, setOpen] = useState(false);
    const modalOpen = () => setOpen(true);

    return (


        <>
            <ToastContainer hideProgressBar={true} /> 
 
            <div style={{float:" left", width: "98%"}}>
                <h2>Enrolments</h2></div> 
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
                            Add Enrolment
                        </Button>
                    </Box>

                    <Box>
                        {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                        <EnrolmentModal setOpen={setOpen} open={open} courseToEdit={editData} />
                    </Box>

                </Box>
                </div>
    
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Course Name</b></TableCell>
                            <TableCell><b>Teacher Name</b></TableCell>
                            <TableCell><b>Enroled Date</b></TableCell>
                            <TableCell><b>Student Name</b></TableCell>
                            <TableCell ><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell component="th" scope="row">
          <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"  width={"100px"} height={"100px"} /  >
          {row.imgPath}
        </TableCell> */}
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.tname}</TableCell>
                                <TableCell>{row.enroled_date}</TableCell>
                                <TableCell >{row.sname}</TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>


                                 
                                        <IconButton aria-label="edit" onClick={() => handleOpenEditCourseModal(row)}>
                                            <EditIcon />
                                        </IconButton>
                             
                                    <Box style={{ position: "relative" }}>
                                    {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                                        {/* <EditTeacherModal setOpen={setOpen1} open={open1} data={row} /> */}
                                    </Box>


                                    <IconButton aria-label="delete" color="error" onClick={() => deletefreelancer(row.freelancerid)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={enrolmentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginLeft: '800px' }}
            />


    
            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Course Name</b></TableCell>
                            <TableCell><b>Content Title</b></TableCell>
                            <TableCell ><b> File Type</b></TableCell>
                            <TableCell ><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedDataForContent.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            > */}
                                {/* <TableCell component="th" scope="row">
          <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"  width={"100px"} height={"100px"} /  >
          {row.imgPath}
        </TableCell> */}
                                {/* <TableCell >{row.courseName}</TableCell>
                                <TableCell >{row.title}</TableCell>
                                <TableCell >{row.file_type}</TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>


                                        <IconButton aria-label="edit" onClick={() => handleOpenEditCourseModal(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    
                                    <Box style={{ position: "relative" }}> */}
                                    {/* <CreateTeacherModal setOpen={setOpen} open={open} /> */}
                                        {/* <EditTeacherModal setOpen={setOpen1} open={open1} data={row} /> */}
                                    {/* </Box>


                                    <IconButton aria-label="delete" color="error" onClick={() => deletefreelancer(row.freelancerid)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
   
        </>


                                            
    );
}

export default EnrolmentInfoTable;
