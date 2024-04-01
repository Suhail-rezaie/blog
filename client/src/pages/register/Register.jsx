import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      // console.log(res);
    } catch (err) {
      // console.log(err);
      setErr(true);
    }
  };

  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerfrom" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          className="registerinput"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Username...."
          type="text"
        />
        <label htmlFor="">Email</label>
        <input
          className="registerinput"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email...."
          type="text"
        />
        <label htmlFor="">password</label>
        <input
          className="registerinput"
          onChange={(e) => setPassowrd(e.target.value)}
          placeholder="Enter Your password...."
          type="password"
        />
        <button className="registerbutton" type="submit">
          Register
        </button>
        {err && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something Went Wrong
          </span>
        )}
      </form>

      <button className="registerloginbutton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
    </div>
  );
}
