import React, { useEffect, useState } from "react";
// import { allCoursesListItems } from "../../lib/ListItems/ListItems";
import DashboardCountCard from "./DashboardCountCard";
import { Typography } from "@mui/material";
import axios from "axios";
import CourseCard from "../CourseCard/CourseCard";

function DashboardData() {
  const [courses, setCourses] = useState([]);
   const [courseCount, setCourseCount] = useState([]);
   const [studentCount, setStudentCount] = useState([]);
   const [teacherCount, setTeacherCount] = useState([]);

  const fetchData = async () => {
    try {
      if(localStorage.getItem('userType') == 'Teacher'){
        axios.get(`http://localhost:3001/api/courseForTeacher/${localStorage.getItem('user_id')}`).then(
            (response) => {
                console.log(response.data[0]);
                // setTeacherData(...teacherData, response.data);
                setCourseCount(response.data[0]);
            }
        );
      }
      else{
        axios.get("http://localhost:3001/api/courseCount").then(
            (response) => {
                console.log(response.data[0]);
                // setTeacherData(...teacherData, response.data);
                setCourseCount(response.data[0]);
            }
        );
      }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    try {
      if(localStorage.getItem('userType') == 'Teacher'){
        axios.get(`http://localhost:3001/api/enrolmentCountForTeacher/${localStorage.getItem('user_id')}`).then(
          (response) => {
              console.log(response.data[0]);
              // setTeacherData(...teacherData, response.data);
              setStudentCount(response.data[0]);
          }
      );
        }
        else
        {
          axios.get("http://localhost:3001/api/studentCount").then(
            (response) => {
                console.log(response.data[0]);
                // setTeacherData(...teacherData, response.data);
                setStudentCount(response.data[0]);
            }
        );
        }
  } catch (error) {
      console.error('Error fetching data:', error);
  }

  try {
    axios.get("http://localhost:3001/api/teacherCount").then(
        (response) => {
            console.log(response.data[0]);
            // setTeacherData(...teacherData, response.data);
            setTeacherCount(response.data[0]);
        }
    );
} catch (error) {
    console.error('Error fetching data:', error);
}
};

  useEffect(() => {

    if(localStorage.getItem('userType') == 'Teacher'){
      axios.get(`http://localhost:3001/api/allcoursesForTeacher/${localStorage.getItem('user_id')}`).then(
          (response) => {
              console.log(response.data);
              // setTeacherData(...teacherData, response.data);
              setCourses(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    else{
      axios
      .get("http://localhost:3001/api/allCourses")
      .then((res) => {
        // setCourses(res.data);
        setCourses(res.data);
        console.log(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });

      
    }
    
    fetchData(); 
  },[]);

  return (
    <div>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", ml: 2 }}>
        Summary
      </Typography>

      <div>
        <DashboardCountCard coursesCount={courseCount.courseCount} studentCount= {studentCount.studentCount} teacherCount= {teacherCount.teacherCount}/>
        {/* {console.log("course length is "+courses.length)} */}
      </div>

      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", mt: 2, ml: 2 }}>
        All Courses
      </Typography>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

        {courses.map((item) => (
          <CourseCard data={item} />
        ))}

        {/* {allCoursesListItems} */}
      </div>
    </div>
  );
}

export default DashboardData;
