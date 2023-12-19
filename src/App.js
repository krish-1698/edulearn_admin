import React,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login/Login"; // Adjust the import path to match your project structure
import Register from "../src/pages/Register"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/users/users";
import Students from "./pages/students/student";
import Teachers from "./pages/Teachers/teachers";
import Courses from "./pages/Courses/courses";

const App = () => {

  const [userType, setUserType] = useState("Admin")
  // setUserType(localStorage.getItem(userType));
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard userType={userType} />}  />
          <Route path="/users" element={<Users/>} />
          <Route path="/students" element={<Students userType={userType}/>} />
          <Route path="/teachers" element={<Teachers userType={userType}/>} />
          <Route path="/courses" element={<Courses userType={userType}/>} />
          {/* Add more routes for other components/pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
