import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
      // window.location.replace("/");
      console.log(newPost);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeimg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeform" onSubmit={handleSubmit}>
        <div className="writeformgroup">
          <label htmlFor="fileinput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileinput"
            type="file"
            className="fileinput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <input
            type="text"
            className="writeinput"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>

        <div className="writeformgroup">
          <textarea
            className="writeinput writetext"
            placeholder="Tell Your Story....."
            onChange={(e) => setDesc(e.target.value)}
            type="text"
          ></textarea>
        </div>

        <button className="writesubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
