import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
// import SwitchButton from "../SwitchButton/SwitchButton";
import img from '../../images/web-application-development.jpg'
import Rating from './Rating';

function CourseCard({ data }) {
  return (
    <div>
          <Card sx={{ margin: 2,  maxWidth: 246, width:246  }}> {/*maxWidth: 346, minHeight:200,*/}         
            <CardActionArea>
            {/* <CardMedia component="img" height="130" image={img} alt="" /> */}
              <CardMedia component="img" height="130" image={data.img_path} alt="" />
              
              <CardContent>
                <Typography gutterBottom variant="h6" component="div"
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  minHeight: 58, 
                }}>
                  {data.title}
                </Typography>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <Rating rating={data.avg_rating} numReviews={data.ratingCount}></Rating>
                <p> <i class="ri-user-line"></i> {data.enrolmentCount}</p>
          </div>
          
              </CardContent>
            </CardActionArea>

            {/* <CardActions sx={{ marginLeft: 1.5 }}>
              <SwitchButton />
            </CardActions> */}
          </Card>
      
    </div>
  );
}

export default CourseCard;
