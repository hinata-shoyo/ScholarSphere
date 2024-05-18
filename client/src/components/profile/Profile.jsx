import { useEffect, useState } from "react";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Post from "../post/Post";

const Profile = (props) => {
  const [User, setUser] = useState({});
  const [posts, setPost] = useState([]);
  const { state } = useLocation();
  const getData = async () => {
    try {
      const user = await axios.get(
        `http://localhost:3000/user/users/${state.id}`,
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      const post = await axios.get(
        `http://localhost:3000/user/getposts/${state.id}`,
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setUser(user.data.user);
      setPost(post.data.posts);
      console.log(posts.data.posts)
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
      <div style={{height:"20px"}}></div>
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
        <p className="username">{`Username: ${User.username}`}</p>
        <p className="uni">{`University: ${User.university}`}</p>
      </div>
      {posts && <div className="walll">
        {posts.map((post) => {
          return (
            <Post
              pfp={"/profile.png"}
              user={post.user}
              post={post.description}
              time={post.time}
              photo={post.photo}
              id={post.userId}
            />
          );
        })}

      </div>}
      <div style={{height:"20px"}}></div>
    </div>
  );
};

export default Profile;
