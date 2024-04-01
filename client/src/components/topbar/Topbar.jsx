import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  // const user = true;
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5600/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topleft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topcenter">
        <ul className="toplist">
          <li className="toplistitem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="toplistitem">ABOUT</li>
          <li className="toplistitem">CONTACT</li>
          <li className="toplistitem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="toplistitem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link className="link" to="/setting">
            <img className="topimg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistitem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="toplistitem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
