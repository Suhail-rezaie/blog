import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Setting() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5600/images/";
  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put("/users/" + user._id, updateUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log(res);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="setting">
      <div className="settingwrapper">
        <div className="settingtitle">
          <span className="settingtitleupdate">Update</span>
          <span className="settingtitledelete">Delete</span>
        </div>
        <form className="settingform" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settingpp">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileinput">
              <i className="settingppicon far fa-user-circle"></i>{" "}
            </label>
            <input
              type="file"
              id="fileinput"
              style={{ display: "none" }}
              className="settingppinput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            name=""
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
            name=""
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name=""
          />
          <button className="settingsubmitbutton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
