import React from "react";
import '../App.css';
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            <img src="http://shimmeringsoul.weebly.com/uploads/1/3/0/3/13031044/1-xkmi4fb5vws6-my7b22lza_1.png" alt="logo" className="brand_logo_img"/>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/signin">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
