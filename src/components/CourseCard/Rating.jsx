// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';

// export default function BasicRating() {
//   const [value, setValue] = React.useState(2);

//   return (
//     <Box
//       sx={{
//         '& > legend': { mt: 2 },
//       }}
//     >
//       <Typography component="legend">Controlled</Typography>
//       <Rating
//         name="simple-controlled"
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       />
//       <Typography component="legend">Read only</Typography>
//       <Rating name="read-only" value={value} readOnly />
//       <Typography component="legend">Disabled</Typography>
//       <Rating name="disabled" value={value} disabled />
//       <Typography component="legend">No rating given</Typography>
//       <Rating name="no-value" value={null} />
//     </Box>
//   );
// }

// import StarIcon from '@mui/icons-material/Star';
// import StarHalfIcon from '@mui/icons-material/StarHalf';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

// function Rating(props) {
//   const { rating, numReviews, caption } = props;
//   debugger;
//   return (
//     <div className="rating">
//       <span> 
//         <i
//           className={  
//             rating >= 1
//               ? 'fas fa-star'
//               : rating >= 0.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         />
//       </span>
//       <span>
//         <i
//           className={
//             rating >= 2
//               ? 'fas fa-star'
//               : rating >= 1.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         />
//       </span>
//       <span>
//         <i
//           className={
//             rating >= 3
//               ? 'fas fa-star'
//               : rating >= 2.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         />
//       </span>
//       <span>
//         <i
//           className={
//             rating >= 4
//               ? 'fas fa-star'
//               : rating >= 3.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         />
//       </span>
//       <span>
//         <i
//           className={
//             rating >= 5
//               ? 'fas fa-star'
//               : rating >= 4.5
//               ? 'fas fa-star-half-alt'
//               : 'far fa-star'
//           }
//         />
//       </span>
//       {caption ? (
//         <span>{caption}</span>
//       ) : (
//         <span>{' ' + numReviews + ' reviews'}</span>
//       )}
//     </div>
//   );
// }
// export default Rating;

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Rating(props) {
  const { rating, numReviews, caption } = props;

  // Round the rating to the nearest half star
  const roundedRating = Math.round(rating * 2) / 2;

  // Generate an array of stars based on the rating
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      // Full star
      stars.push(<StarIcon key={i}  style={{ color: '#ffc000', fontSize: '18px' }}/>);
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half star
      stars.push(<StarHalfIcon key={i} style={{ color: '#ffc000',fontSize: '18px' }}/>);
    } else {
      // Empty star
      stars.push(<StarBorderIcon key={i} style={{ color: '#ffc000',fontSize: '18px' }} />);
    }
  }

  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center'}}>
      {stars.map((star, index) => (
        <span key={index} >{star}</span>
      ))}
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span style={{marginLeft: '5px'}}>{' (' + numReviews + ')'}</span>
      )}
    </div>
  );
}

export default Rating;
