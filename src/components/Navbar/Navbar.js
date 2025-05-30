import { NavLink } from "react-router-dom";
import { useAuth } from "../auth";

import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
export const Navbar = () => {
  const { cartItems } = useSelector((reducers) => reducers.cartReducer);
  const navigate = useNavigate();
  const auth = useAuth();

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "none",
    };
  };
  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar-sm  navbar-expand-lg navbar-light  bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav  me-auto fs-7 mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active text-light"
                  aria-current="page"
                  href="#"
                >
                  Mon - Sun : 09:00am - 09:00pm
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link text-light"
                  href="https://fastlansalon@gmail.com"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  fastlansalon@gmail.com
                </a>
              </li>
              <li className="nav-item ">
                <a
                  className="nav-link text-light"
                  href="https://wa.me/3105321069"
                >
                  <i className="fa-brands fa-whatsapp"  ></i>07577 007993
                </a>
              </li>
            </ul>
            <div className="navbar-text pl-10px text-light">
              <a href="https://twitter.com/">
                <i className="f fa-brands fa-twitter-square fa-1x  bg-dark  text-light"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="f fa-brands fa-instagram fa-1x text-white"></i>
              </a>
              <a href="https://web.facebook.com/">
                <i className="f fa fa-facebook-official fa-1x text-white"></i>
              </a>

              <a href="https://www.youtube.com/channel/">
                <i className="f fa-brands fa-youtube-square text-white"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top font-family-Nunito bg-White">
        <div className="container-fluid">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-dark"></span>
          </button>
          <div className="collapse navbar-collapse   " id="navbarTogglerDemo01">
            <Link className="navbar-brand  text-aqua bg-dark " to="/">
              FastLaneSalon
            </Link>

            <ul className="navbar-nav m-2  d-flex me-auto mb-2 mb-lg-0  ">
              <li className="nav-item ">
                <NavLink to="/" className=" text-dark" style={navLinkStyles}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/product"
                  className=" text-dark"
                  style={navLinkStyles}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" text-dark"
                  to="/service"
                  style={navLinkStyles}
                >
                  Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" text-dark"
                  to="/contact"
                  style={navLinkStyles}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  className=" text-dark"
                  to="/about"
                  style={navLinkStyles}
                >
                  About
                </NavLink>
              </li>



              {/* <NavLink to='/admin' style={navLinkStyles}>
        Admin
      </NavLink> */}


     {/* {!auths.users && (
        <NavLink to='/loginAdmin' style={navLinkStyles}>
          LoginAdmin
        </NavLink>
      )}  */}



              
            </ul>
            <div className="i">
              <button
                className="btn btn-dark btn-lg"
                onClick={() => navigate("/Proceed")}
              >
                Cart {cartItems.length}
              </button>
              {!auth.user && (
                <button
                  className="btn btn-dark btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            {" "}
              {auth.user && (
                <button
                  className="btn btn-dark btn-lg"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
