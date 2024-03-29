import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";


export default function Navbar() {
  let location = useLocation();
  let navigate= useNavigate()
  const{user, setUser, userDetail}=useContext(AuthContext)
  const{alertCall}=useContext(AlertContext)
  const handleLogout=()=>{
    localStorage.removeItem('token');
    alertCall("logout successful")
    setUser(false)
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          NoteBook 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {
            (user===true)?<form className="d-flex">
            <a className="btn btn-primary mx-2"  onClick={handleLogout}>Logout from {userDetail.name}</a>
          </form>:<form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup">Sign up</Link>
          </form>
          }
          
          
        </div>
      </div>
    </nav>
  );
}
