import React, { useState,useEffect } from 'react';
import PieChart from '../../components/PieChart';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import BarChart from '../../components/BarChart';
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ReportInfo = () => {

    const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentYear = currentDate.getFullYear().toString();
  
  const [income, setIncome] = useState('');
  const [incomeC, setIncomeC] = useState('');
  const [selectedMonth, setSelectedMonth] = useState({ value: '', label: 'Any' });
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [selectedYearForTable, setSelectedYearForTable] = useState(currentYear);

  const generateCurrentMonthLabel = () => {
    console.log(currentMonth);
    const monthLabels = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = parseInt(currentMonth, 10);
    return monthLabels[monthIndex-1];
  };
  const [selectedMonthForCourse, setSelectedMonthForCourse] = useState({ value: currentMonth, label: generateCurrentMonthLabel() });
  
  const [details, setDetails] = useState([]);
  const [monthVals, setMonthValues] = useState([]);
  const [dataBar, setData1] = useState([]);

  

  const fetchIncomeData = async () => {
    console.log(selectedMonth);
    console.log(selectedYear);
      axios
        .get("http://localhost:3001/api/getIncomeForAdmin",{ params: { month: selectedMonth.value, year: selectedYear } })
        .then((res) => {
          // setCourses(res.data);
          setIncomeC(res.data[0].income);
          console.log(res.data); 
        })
        .catch((err) => {
          console.log(err);
        });
    }

  useEffect(() => {
    if(localStorage.getItem('userType') == 'Admin'){
        axios
        .get("http://localhost:3001/api/getIncomeForAds", { params: { month: selectedMonth.value, year: selectedYear } })
        .then((res) => {
          // setCourses(res.data);
          setIncome(res.data[0].income);
          console.log(res.data); 
        })
        .catch((err) => {
          console.log(err);
        });

        
        fetchIncomeData();
    } 
},[selectedMonth,selectedYear]);

useEffect(() => {
  if(localStorage.getItem('userType') == 'Teacher'){
    axios
    .get(`http://localhost:3001/api/allcoursesForTeacher/${localStorage.getItem('user_id')}`)
    .then((res) => {
      // setCourses(res.data);
      setCourses(res.data);
      console.log(res.data); 
      if (res.data.length > 0) {
        setCourse({value : res.data[0].title, id:res.data[0].id});
        console.log(res.data[0].id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else{
    axios.get("http://localhost:3001/api/allCourses").then(
      (response) => {
          console.log(response.data);
          // setAllTeacherData(...allTeacherData, '');
          setCourses(response.data);
          if (response.data.length > 0) {
            setCourse({value : response.data[0].title, id:response.data[0].id});
            console.log(response.data[0].id);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }
},[]);

useEffect(() => {
  // Check if the course state is set
  if (course && course.id) {
    // Now you can perform actions that depend on the course state
    // For example, fetch data based on the selected course
    fetchIncomeForCourse();
  }
}, [course]);

const fetchIncomeForCourse = () =>{
  console.log("shit");
  // if(localStorage.getItem('userType') == 'Teacher'){
    console.log(course);
      axios
      .get("http://localhost:3001/api/getIncomeByCourseId", { params: { course_id: course.id} })
      .then((res) => {
        // setCourses(res.data);
        setBarChartData(res.data);
        fillBarChartData(res.data);
        console.log(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  // } 
}

useEffect(() => {
  if(localStorage.getItem('userType') == 'Teacher'){
    axios
    .get("http://localhost:3001/api/getRevenueDetais", { params: { month: selectedMonthForCourse.value, user_id:localStorage.getItem('user_id') } })
    .then((res) => {
      // setCourses(res.data);
      setDetails(res.data);
      console.log(res.data); 
    })
    .catch((err) => {
      console.log(err);
    });

  }
  else{
    axios
    .get("http://localhost:3001/api/getRevenueDetailsForAll", { params: { month: selectedMonthForCourse.value, year: selectedYearForTable} })
    .then((res) => {
      // setCourses(res.data);
      setDetails(res.data);
      console.log(res.data); 
    })
    .catch((err) => {
      console.log(err);
    });
  }
},[selectedMonthForCourse,selectedYearForTable]);

const data = {
    labels: ['By Advertisements', 'By Course'],
    datasets: [{
      data: [income, incomeC],
      backgroundColor: [
        'red',
        'blue',
        // 'yellow',
        // 'green',
        // 'purple',
        // 'orange'
      ],
      borderColor: 'white',
      borderWidth: 1
    }]
  };

  // useEffect(() => {
  //   setSelectedMonth(months.find(month => month.value == currentMonth) || null);
  //   setSelectedYear(currentYear);
  // }, []);
  const months = [
    { value: '', label: 'Any' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  const years = [
    '2023','2024', '2025' 
  ];
  const handleMonthChange = (event, value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (event, value) => {
    setSelectedYear(value);
  };
  const handleYearChangeForTable = (event, value) => {
    setSelectedYearForTable(value);
  };

  const handleCourseChange = (event, value) => {
    setCourse(value);
  };

  const handleMonthChangeForCourse = (event, value) => {
    console.log(value);
    if(value == null){
      debugger;
      console.log(currentMonth);
      console.log(generateCurrentMonthLabel());
      setSelectedMonthForCourse({ value: currentMonth, label: generateCurrentMonthLabel() });
    }
    else{
      setSelectedMonthForCourse(value);
    }
    
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // const chartData = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [{
  //     label: 'Course Income',
  //     data: [50, 30, 60, 70, 40],
  //     backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //     borderColor: 'rgba(75, 192, 192, 1)',
  //     borderWidth: 1
  //   }]
  // };

  const fillBarChartData = (barChartData1) =>{
setData1([]);
    const data1 = [];

// Define an array of month labels
const monthss = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];
let monthValues = [];
// Iterate over the months array
monthss.forEach((monthVal, index) => {
  // Extract the revenue value for the current month
  console.log(monthVal);
  const revenue = barChartData1[0][`revenue_${index + 1}`];
  if(revenue != null){
    monthValues.push(monthVal.label);
    data1.push(revenue || 0);
  }
  
  
});
setMonthValues(monthValues);
setData1(data1);
console.log(data1);
console.log(barChartData[0]['revenue_2']);
  }
  

const chartData = {
  labels: monthVals,
  datasets: [{
    label: 'Course Income',
    data: dataBar,
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = details.slice(startIndex, endIndex);

  return (
    <div>
      {localStorage.getItem('userType') !== 'Teacher' && (
  <div>
    <h2>Income</h2>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
      <div style={{ width: '300px' }}>
        <Autocomplete
          options={months}
          getOptionLabel={(option) => option.label}
          style={{ width: '100%' }}
          value={selectedMonth}
          onChange={handleMonthChange}
          renderInput={(params) => <TextField {...params} label="Month" variant="outlined" />}
        />
      </div>
      <div style={{ width: '300px' }}>
        <Autocomplete
          options={years}
          getOptionLabel={(option) => option} // Add this line to get the label for years
          style={{ width: '100%' }}
          value={selectedYear}
          onChange={handleYearChange}
          renderInput={(params) => <TextField {...params} label="Year" variant="outlined" />}
        />
      </div>
    </div>
  </div>
)}

  <div style={{width:'300px'}}>
  {localStorage.getItem('userType') === 'Admin' && <PieChart data={data} />}
  </div>
  <div>
  <div style={{ width: '300px', float:'right',marginTop:'40px'  }}>
      <Autocomplete
      options={courses.map((course, index) => ({
        value: course.title,
        id:course.id
      }))}
      getOptionLabel={(option) => option.value} // Use 'value' instead of 'label'
      style={{ width: '100%' }}
      value={course} // Use your state variable here
      onChange={handleCourseChange} // Pass your change handler function
      renderInput={(params) => <TextField {...params} label="Course" variant="outlined" />} // Change the label to "Course"
    />
    </div>
      <BarChart chartData={chartData} />
    </div>
    <h2>Monthly Revenue Details </h2>
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
    <div style={{ width: '300px', float:'right',marginBottom:'10px' }}>
      <Autocomplete
        options={months.slice(1)}
        getOptionLabel={(option) => option.label}
        style={{ width: '100%' }}
        value={selectedMonthForCourse}
        onChange={handleMonthChangeForCourse}
        renderInput={(params) => <TextField {...params} label="Month" variant="outlined" />}
      />
    </div>
    <div style={{ width: '300px', float:'right',marginBottom:'10px' }}>
    <Autocomplete
          options={years}
          getOptionLabel={(option) => option} // Add this line to get the label for years
          style={{ width: '100%' }}
          value={selectedYearForTable}
          onChange={handleYearChangeForTable}
          renderInput={(params) => <TextField {...params} label="Year" variant="outlined" />}
        />
        </div>
        </div>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Course Name</b></TableCell>
              {localStorage.getItem('userType') == 'Admin' && <TableCell><b>Teacher Name</b></TableCell>}
              <TableCell><b>New Students</b></TableCell>
              <TableCell ><b> Monthly Revenue</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {displayedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{row.title}</TableCell>
                {localStorage.getItem('userType') == 'Admin' && <TableCell>{row.tname}</TableCell>}
                <TableCell >{row.enrolmentCount}</TableCell>
                <TableCell >Rs.{(row.amount * 0.7 * row.enrolmentCount).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={details.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginLeft:'800px' }}
      />
    </div>

    
  );
};

export default ReportInfo;
