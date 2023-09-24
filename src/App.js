import React,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login/Login"; // Adjust the import path to match your project structure
import Register from "../src/pages/Register"; 
import Dashboard from "./pages/Dashboard/Dashboard";


const App = () => {

  const [userType, setUserType] = useState("admin")
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard userType={userType} />}  />
          {/* Add more routes for other components/pages */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
