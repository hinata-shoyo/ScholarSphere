import { useEffect, useState } from "react";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const Profile = (props) => {
  const [User, setUser] = useState();
  const { state } = useLocation();
  const getData = async () => {
    try {
      const user = await axios.get(`http://localhost:3000/user/${state.id}`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setUser(user.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="containerr">
      {/* <div>{console.log(User.username)}</div> */}
      <Navbar/>
      <div className="infoCard">
        {/* <img src={User.profilePicture} alt="pfp" /> */}
        {/* <p>{User.firstName} {User.lastName}</p> */}
        {/* <p>{User.university}</p> */}

      </div>
      <div>

      </div>
    </div>
  );
};

export default Profile;
