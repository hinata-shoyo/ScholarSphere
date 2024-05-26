import Navbar from "../navbar/Navbar";
import Post from "../post/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
import Create from "../createPost/createPost";
import Loading from "../alert/Loading";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
    const [isHide, setIsHide] = useState(true)


  const getPosts = async () => {
    try {
      const response = await axios.get("https://scholar-sphere-puce.vercel.app/user/posts", {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });
      // console.log
      console.log(response.data.posts);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.token === null) {
      window.location.href = "/login";
    }

    getPosts();
     setTimeout(() => {
      setIsHide(false)
    }, 3000)
  }, []);

  return (
    <>
    <div className="containerr">
      <Navbar />

      <div className="create">

      <Create />
      </div>
      <div style={{ height: "1px" }}></div>
      {posts && (
        <div className="walll">
          {isHide?<Loading/>:null}
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
                postId={post._id}
              />
            );
          })}
        </div>
      )}
      <div style={{ height: "10px" }}></div>
    </div>
    </>
  );
};

export default Home;
