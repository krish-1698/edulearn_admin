import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

import { AddCircle as AddIcon } from "@mui/icons-material";
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
import Axios from "axios";
import ViewIcon from "@mui/icons-material/Visibility";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import CreateStudentModal from "../../modal/createstudentModal";
import StudentModal from "../../modal/StudentModal";
import AdvertisementModal from "../../modal/AdvertisementModal";
import Tooltip from '@mui/material/Tooltip';
import VerifyIcon from "@mui/icons-material/CheckCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createData(title, updated_date, description, action) {
    return { title, updated_date, description, action };
}

const courses = [
    createData("Sub Topic 1", "07/03/2023", "file"),
    createData("Sub Topic 2", "10/03/2023", "file"),
    createData("Sub Topic 3", "15/03/2023", "file"),
];


function AdvertisementInfoTable() {
    let navigate = useNavigate();

    const [advertisementData, setAdvertisementData] = useState([]);
    
    const [editData, setEditData] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // function onClickEdit(row) {
    //     setEditData(row);
    //     modalOpen();
    //     console.log("onClickEdit is called with row:", row);
    //     // console.log("Testing",open1);

    // }

    const handleOpenAddStudentModal = () => {
        setOpen(true);
        setEditData(null);
      };

      const handleOpenEditAdvertisementModal = (advertisement) => {
        setOpen(true);
        setEditData(advertisement);
        console.log(advertisement);
      };
       
      

    function onClickVerify(row) {
        Axios.put(`http://localhost:3001/api/verifyAd/${row.id}`)
            .then((response) => {
                toast.success("Advertisment verification updated successfully", {
                    autoClose: 3000,
                });
                console.log("Advertisment verification updated successfully");
                // You can add further handling here if needed
                // window.location.reload(false);
                fetchData();
            })
            .catch((error) => {
                console.error("Error updating advertisment verification:", error);
                // You can add error handling here
            });
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
    // const displayedData = teacherData.slice(startIndex, endIndex);
    const displayedData = Array.isArray(advertisementData) ? advertisementData.slice(startIndex, endIndex) : [];


    const fetchData = async () => {
        try {
            Axios.get("http://localhost:3001/api/getAllAds").then(
                (response) => {
                    console.log(response.data);
                    // setTeacherData(...teacherData, response.data);
                    setAdvertisementData(response.data);
                }
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

   
    const [open, setOpen] = useState(false);
    // const modalOpen = () => setOpen(true);

    // const [open1, setOpen1] = useState(false);
    // const modalOpen1 = () => setOpen1(true);
    return (


        <>
        <ToastContainer hideProgressBar={true} />
            <div style={{ marginLeft: "88%" }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box sx={{ my: 2 }}>
                        <Button style={{ width: "180px" }} onClick={handleOpenAddStudentModal} variant="contained" startIcon={<AddIcon />}>
                            Add Advertisement
                        </Button>
                    </Box>

                    <Box>
                     {/* <CreateStudentModal setOpen={setOpen} open={open} /> */}
                     {/* <EditStudentModal setOpen={setOpen1} open={open1} data={editData} /> */}
                     <AdvertisementModal setOpen={setOpen} open={open}  advertisementToEdit={editData}/>
                    </Box>
                </Box>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Full Name</b></TableCell>
                            <TableCell><b>Subject</b></TableCell>
                            <TableCell ><b> Language</b></TableCell>
                            <TableCell ><b> City</b></TableCell>
                            <TableCell ><b> Description</b></TableCell>
                            <TableCell ><b> Type</b></TableCell>
                            <TableCell ><b> Mobile No.</b></TableCell>
                            <TableCell ><b> Email Address</b></TableCell>
                            <TableCell ><b> State</b></TableCell>
                            <TableCell ><b> Image</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
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
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.subject}</TableCell>
                                <TableCell >{row.language}</TableCell>
                                <TableCell >{row.city}</TableCell>
                                <TableCell >{row.description}</TableCell>
                                <TableCell >{row.type}</TableCell>
                                <TableCell >{row.mobile}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell >{row.state}</TableCell>
                                <TableCell>
                             <img src={row.img_path} alt="Course Image" style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                                <TableCell > <Stack direction="row" spacing={1}>
                                {row.verified === 0 ? (
                                        <Tooltip title="Verify Ad">
                                        <IconButton aria-label="verify" color="info" onClick={() => onClickVerify(row)}>
                                            <VerifyIcon />
                                        </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <IconButton aria-label="edit" onClick={() => handleOpenEditAdvertisementModal(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    )}
                                    
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
                count={advertisementData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginLeft:'800px' }}
            />
        </>
    );
}

export default AdvertisementInfoTable;
