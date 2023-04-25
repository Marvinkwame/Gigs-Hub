import React from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={active ? "header active" : "header"}>
      <nav className="container ">
        <div className="logo">
          <div to="/" className="link">
            <span className="text">Gigsters</span>
          </div>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <ul className="nav-links">
            <li>Gigsters Hub</li>
            <li>Explore</li>
            <li>English</li>
            {!currentUser?.isSeller && <li>Become a Seller</li>}
          </ul>

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser.img ||
                  "https://img.freepik.com/free-icon/user_318-563642.jpg?w=2000"
                }
                alt="profile pic"
              />
              <span>
                {currentUser.username.charAt(0).toUpperCase() +
                  currentUser.username.slice(1)}
              </span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add Gigs</Link>
                      <Link to="/earnings">Earnings</Link>
                      <Link to="/messages">Messages</Link>
                      <Link to="/orders">Orders</Link>
                    </>
                  )}
                  <Link to="/profile">Profile</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/request">Post a Request</Link>
                  <Link to="/">Refer a Friend</Link>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign In
              </Link>
              <Link className="link" to="/register">
                <button className="tickets">Join</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {active && (
        <>
          <hr />
          <div className="menu">
            <a href="">Graphics and Design</a>
            <a href="">Video & Animation</a>
            <a href="">Writing & Translation</a>
            <a href="">Digital Marketing</a>
            <a href="">Music & Audio</a>
            <a href="">AI Services</a>
            <a href="">Programming & Tech</a>
            <a href="">Lifestyle</a>
          </div>
          <hr />
        </>
      )}
    </header>
  );
};

export default Navbar;
