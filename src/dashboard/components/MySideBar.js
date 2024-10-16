import React from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faBullhorn,
  faUser,
  faFemale,
  faUsers,
  faMagic,
  faTachometerAlt, // Icon for Dashboard
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaClipboard,
  FaSignOutAlt,
  FaComments,
  FaUsers,
} from "react-icons/fa";
const categories = [
  { name: "Best Picture", icon: faFilm, path: "/dashboard?tab=bestpicture" },
  {
    name: "Best Director",
    icon: faBullhorn,
    path: "/dashboard?tab=bestdirector",
  },
  { name: "Best Actor", icon: faUser, path: "/dashboard?tab=best-actor" },
  { name: "Best Actress", icon: faFemale, path: "/dashboard?tab=best-actress" },
  {
    name: "Best Supporting Actor",
    icon: faUsers,
    path: "/dashboard?tab=best-supporting-actor",
  },
  {
    name: "Best Supporting Actress",
    icon: faUsers,
    path: "/dashboard?tab=best-supporting-actress",
  },
  {
    name: "Best Visual Effects",
    icon: faMagic,
    path: "/dashboard?tab=best-visual-effects",
  },
];

function MySideBar(props) {
  return (
    <div>
      <Sidebar className="sidebar-container">
        <Menu>
          <MenuItem component={<Link to="/dashboard?tab=dash" />}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </MenuItem>
          <div style={{ borderTop: "1px solid #ccc", margin: "10px 0" }} />{" "}
          {/* Divider */}
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              component={<Link to={category.path} />}
              //   icon={<FaTachometerAlt />}
            >
              {" "}
              <FontAwesomeIcon
                style={{ marginRight: "10px", width: "20px" }}
                icon={category.icon}
              />{" "}
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}

MySideBar.propTypes = {
  // Define prop types if needed
};

export default MySideBar;
