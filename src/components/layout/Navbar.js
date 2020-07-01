import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link className="nav-links" to="/">
        <h1>
          <i className="secondary fas fa-cookie-bite"></i> Recipe
        </h1>
      </Link>
      <div>
        {/* <Link className="nav-links" to="/search">
          Search Recipe
        </Link> */}
        <Link className="nav-links" to="/add">
          <i className="secondary fas fa-plus"></i> Add Recipe
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
