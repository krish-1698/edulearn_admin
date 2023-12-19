import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import axios from "axios";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function DashboardCountCard({coursesCount}) {

    const [student, setStudents] = useState([]);

 

  const [lecturer, setLecturers] = useState([]);

 

    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <Card sx={{ margin: 2, maxWidth: 246, width:246 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-online-learning-tutorials-with-number-of-courses-png-image_4685460.png"
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                            No. of Courses
                        </Typography>
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {/* {coursesCount}*/}10
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ margin: 2, maxWidth: 246, width:246  }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-online-learning-tutorials-with-number-of-courses-png-image_4685460.png"
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                            No. of Students
                        </Typography>   
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {student}20
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ margin: 2, maxWidth: 246, width:246  }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="130"
                        image="https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-online-learning-tutorials-with-number-of-courses-png-image_4685460.png"
                        alt="course-count-icon"
                        sx={{ padding: "0.5em 0.5em 0 0.5em", objectFit: "contain" }}
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" align='center'>
                            No. of Teachers
                        </Typography>
                        <Typography  variant="h4" component="div" align='center' fontWeight= "bold" >
                            {lecturer}10
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default DashboardCountCard;