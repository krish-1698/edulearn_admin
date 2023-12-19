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

function createData(title, updated_date, description, action) {
  return { title, updated_date, description, action };
}

const courses = [
  createData("Sub Topic 1", "07/03/2023", "file"),
  createData("Sub Topic 2", "10/03/2023", "file"),
  createData("Sub Topic 3", "15/03/2023", "file"),
];


function UserInfoTable() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = userData.slice(startIndex, endIndex);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/users").then(
      (response) => {
        console.log(response.data);

        setUserData(...userData, response.data);

      }
    );
  }, []);

  function onClick2(row) {
    localStorage.setItem('data', JSON.stringify(row));

    navigate("/freelancers/update", { replace: true });
  }

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

  const [courseInfo, setCourseInfo] = useState([]);

  useEffect(() => {
    // Axios.get("http://localhost:8080/api/v1/course/getAllCourses").then((response) => {
    //   console.log(response.data);

    //   setCourseInfo(...courseInfo, response.data);
    //   console.log(courseInfo);
    // });
  }, []);

  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  return (


    <>
      <div style={{ marginLeft: "88%" }}>
        <Box
          sx={{
            display: "flex",
            width: "80%",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ my: 2 }}>
            <Button style={{ width: "180px" }} onClick={modalOpen} variant="contained" startIcon={<AddIcon />}>
              Add User
            </Button>
          </Box>

          <Box>
            {/* <CreateAnnouncement setOpen={setOpen} open={open}  /> */}
            {/* <CreateCourse setOpen={true} open={open}  />   */}
            {/* <AnnouncementTable /> */}
          </Box>
        </Box>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Username</b></TableCell>
              <TableCell ><b> Password</b></TableCell>
              <TableCell ><b> Role</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {displayedData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
          <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"  width={"100px"} height={"100px"} /  >
          {row.imgPath}
        </TableCell> */}
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.username}</TableCell>
                <TableCell >{'•••••••••••'}</TableCell>
                <TableCell >{row.role}</TableCell>
                <TableCell > <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" onClick={() => onClick2(row)}>
                    <EditIcon />
                  </IconButton>
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
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginLeft:'800px' }}
      />
    </>
  );
}

export default UserInfoTable;
