import { useEffect, useState } from "react";
import "./Myprofile.css";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { MdOutlineModeEdit } from "react-icons/md";
import Post from "../post/Post";
import Edit from "./Edit";

const MyProfile = (props) => {
  const [User, setUser] = useState({});
  const [posts, setPost] = useState([]);
  const [popup, setPopup] = useState(false);

  const handleEdit = () => {
    setPopup(true);
  };

  const getData = async () => {
    try {
      const user = await axios.get(`https://scholar-sphere-puce.vercel.app/user/`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });
      const post = await axios.get(
        `https://scholar-sphere-puce.vercel.app/user/getposts/${user.data.user._id}`,
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setUser(user.data.user);
      setPost(post.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="containerrr">
      <Navbar />
      <div style={{ height: "20px" }}></div>
      <div className="infoCard">
        <img
          src={User.profilePicture}
          alt="pfp"
          className="pfp3"
          style={{ height: "150px" }}
        />
        <p className="name">
          {User.firstName} {User.lastName}
        </p>
        <MdOutlineModeEdit className="edit" onClick={handleEdit} />
        <Edit popup={popup} trigger={setPopup} />
        <p className="username">{`Username: ${User.username}`}</p>
        <p className="uni">{`University: ${User.university}`}</p>
      </div>
      {posts && (
        <div className="walll">
          {posts.toReversed().map((post) => {
            return (
              <Post
                key={post._id}
                pfp={post.profilePic}
                user={post.user}
                post={post.description}
                time={post.time}
                photo={post.photo}
                id={post.userId}
              />
            );
          })}
        </div>
      )}
      <div style={{ height: "293px" }}></div>
    </div>
  );
};

export default MyProfile;
