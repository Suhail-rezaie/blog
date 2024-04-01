import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlepost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);
  const [updateMode, setUpdateMode] = useState(false);

  const PF = "http://localhost:5600/images/";

  console.log(path);
  // posting something
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      // console.log(res);
    };
    getPost();
  }, [path]);

  //deleting the post belong the that use
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  // update the post belong to that user

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img className="singlepostimg" src={PF + post.photo} alt="" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleposttitleinput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleposttitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlepostedit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <span>
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostdescinput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        ) : (
          <p className="singlepostdesc">
            {post.desc}
            <br />
            <br />
          </p>
        )}
        {updateMode && (
          <button className="singlepostbutton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
