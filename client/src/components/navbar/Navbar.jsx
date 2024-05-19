import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [image, setImage] = useState("");

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };

  const gotoProfile = () => {
    window.location.href ="/myprofile"
  }

  const getUser = async () => {
    try {
      const response = await axios.get("https://scholar-sphere-puce.vercel.app/user", {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setImage(response.data.user.profilePicture);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="navbar">
      <div className="logoContainer">
        <a href="/" className="logo">
          <img src="/Untitled.jpg" alt="logo" className="logo" />
        </a>
      </div>
      <div className="rightCon">
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
        <img src={image} alt="pfp" className="pfp2" onClick={gotoProfile} />
      </div>
    </div>
  );
};

export default Navbar;
