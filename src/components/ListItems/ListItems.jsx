import React, { useEffect, useState } from "react";
import {
  Logout,
  Dashboard,
  LocalLibrary,
  BookmarkAdded,
  Grade,
  Person3,
  Person,
  Topic,
  Groups,
  Image,
  AutoStories,
  Assessment,
  ReportProblem
} from "@mui/icons-material";
import NavBarItem from "../../components/NavBarItem/NavBarItem";
import { Link } from "react-router-dom";

function AllCoursesDataFetching() {
  const [courses, setCourses] = useState([]);

}

const handleLogout = () => {
  // Perform logout actions, such as clearing localStorage
  localStorage.clear();
};


export const adminListItems = (

  <React.Fragment>
    {[
      {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/dashboard",
      },

      {
        name: "Students",
        icon: <Groups/>,
        link: "/students",
      },
      {
        name: "Teachers",
        icon: <Person />,
        link: "/teachers",
      },
      {
        name: "Courses",
        icon: <AutoStories />,
        link: "/courses",
      },
      {
        name: "Advertisements",
        icon: <Image />,
        link: "/advertisements",
      },
      {
        name: "Enrolments",
        icon: <AutoStories />,
        link: "/enrolments",
      },
      {
        name: "Groups",
        icon: <AutoStories />,
        link: "/groups",
      },
      // {
      //   name: "Reports",
      //   icon: <Assessment />,
      //   link: "/reports",
      // },
      // {
      //   name: "Q & A Reports",
      //   icon: <ReportProblem />,
      //   link: "/qaReports",
      // },
    ].map((item) => (
      <Link to={item.link} style={{ textDecoration: "none", color: "black"}}>
        <NavBarItem title={item.name} icon={item.icon} />
      </Link>
    ))}
  </React.Fragment>
  );
  
export const teacherListItems = (
  <React.Fragment>
    {[
      {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/dashboard",
      },

      {
        name: "Courses",
        icon: <AutoStories />,
        link: "/courses",
      },
      // {
      //   name: "Sub Topic",
      //   icon: <Topic />,
      //   link: "/enrollments",
      // },

      // {
      //   name: "Teachers",
      //   icon: <Person3 />,
      //   link: "/teachers",
      // },
      {
        name: "Enrolments",
        icon: <AutoStories />,
        link: "/enrolments",
      },

    ].map((item) => (
      <Link to={item.link} style={{ textDecoration: "none", color: "black" }}>
        <NavBarItem title={item.name} icon={item.icon} />
      </Link>
    ))}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {[
      {
        name: "Log out",
        icon: <Logout />,
        link: "/",
      },
    ].map((item) => (
      <Link to={item.link} style={{ textDecoration: "none", color: "black" }} onClick={handleLogout}>
      <NavBarItem title={item.name} icon={item.icon} />
      </Link>
    ))}
  </React.Fragment>
);
