import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = (props) => {

  const [image, setImage] = useState("")

  const handleLogout = () => {
  window.localStorage.removeItem('token')
  window.location.href ="/"
  }

  var picture;

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:3000/user/",
        {
            headers:{
                Authorization: `bearer ${window.localStorage.getItem("token")}`
            }
        })
        picture = response.data.user.profilePicture
        setImage(picture)
    } catch (error) {
        console.log(error.response.msg)
        
    }
  }

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="navbar">
      <div className="logoContainer">
        <a href="/">

        <img className="logo" src="/Untitled.jpg" alt="logo" />
        </a>
      </div>
      <div className="rightCon">
        <button onClick={handleLogout} className="logout">Logout</button>
        <img className="pfp2" src={image} alt="pfp" />
      </div>
    </div>
  );
};

export default Navbar;
