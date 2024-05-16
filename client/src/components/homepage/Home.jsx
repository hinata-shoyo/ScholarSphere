import Navbar from "../navbar/Navbar";
import Post from "../post/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = (props) => {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/posts", {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.posts);
      setPosts(response.data.posts)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.token === null) {
      window.location.href = "/login";
    }

    getPosts();
  }, []);

  return (
    <div className="containerr">
      <Navbar />
      <div style={{ height: "10px" }}></div>
      <div className="walll">
        {posts.map((post) => {
          return(
            <Post pfp={post.profilePic} user={post.user} post={post.description} time={post.time} photo={post.photo}/>
          )
        })}
      </div>
      <div style={{ height: "10px" }}></div>
    </div>
  );
};

export default Home;
