import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import cashImg from "../../assets/9882177.jpg";
import studentImg from "../../assets/208.jpg";
import teacherImg from "../../assets/3836156.jpg";
import courseImg from "../../assets/course.jpg";

// import axios from "axios";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function DashboardCountCard({coursesCount, studentCount, teacherCount, income}) {

    const [student, setStudents] = useState([]);
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
    const currentMonth = monthNames[currentMonthIndex];
    const currentYear = currentDate.getFullYear();
 

  const [lecturer, setLecturers] = useState([]);

 

    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <Card sx={{ margin: 2, maxWidth: 246, width:246 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image={courseImg}
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                            No. of Courses
                        </Typography>
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {coursesCount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ margin: 2, maxWidth: 246, width:246  }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image={studentImg}
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                        {localStorage.getItem('userType') == 'Teacher' ? 'No. of Enrolments' : 'No. of Students'}
                        </Typography>   
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {studentCount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {localStorage.getItem('userType') != 'Teacher' && (
            <Card sx={{ margin: 2, maxWidth: 246, width:246  }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image={teacherImg}
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                            No. of Teachers
                        </Typography>
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {teacherCount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            
            )}

                    <Card sx={{ margin: 2, maxWidth: 246, width:246  }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="130"
                                            image={cashImg}
                                            alt="course-count-icon"
                                            sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="div" align='center'>
                                               Income for {currentMonth} {currentYear}
                                            </Typography>
                                            <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                                                Rs.{income}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
        </div>
    )
}

export default DashboardCountCard;