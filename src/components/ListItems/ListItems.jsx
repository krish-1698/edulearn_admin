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
} from "@mui/icons-material";
import NavBarItem from "../../components/NavBarItem/NavBarItem";
import { Link } from "react-router-dom";

function AllCoursesDataFetching() {
  const [courses, setCourses] = useState([]);

}




export const studentListItems = (
  <React.Fragment>
    {[
      {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/dashboard",
      },

      {
        name: "Courses",
        icon: <BookmarkAdded />,
        link: "/enrollments",
      },
      {
        name: "Teachers",
        icon: <Person />,
        link: "/grades",
      },
    ].map((item) => (
      <Link to={item.link} style={{ textDecoration: "none", color: "black" }}>
        <NavBarItem title={item.name} icon={item.icon} />
      </Link>
    ))}
  </React.Fragment>
);

export const lecturerListItems = (
  <React.Fragment>
    {[
      {
        name: "Dashboard",
        icon: <Dashboard />,
        link: "/",
      },

      {
        name: "Courses",
        icon: <BookmarkAdded />,
        link: "/enrollments",
      },
      // {
      //   name: "Sub Topic",
      //   icon: <Topic />,
      //   link: "/enrollments",
      // },

      {
        name: "Teachers",
        icon: <Person3 />,
        link: "/enrollments",
      }

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
        link: "/login",
      },
    ].map((item) => (
      <Link to={item.link} style={{ textDecoration: "none", color: "black" }}>
      <NavBarItem title={item.name} icon={item.icon} />
      </Link>
    ))}
  </React.Fragment>
);
