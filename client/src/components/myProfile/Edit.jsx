import { useState } from "react";
import "./Edit.css";
import { MdCancelPresentation } from "react-icons/md";
import axios from "axios";

const Edit = (props) => {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState();
  const [university, setUniversity] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("firstName", firsName);
      formData.append("lastName", lastName);
      formData.append("university", university);

      const response = await axios.put(
        "https://scholar-sphere-puce.vercel.app/user/update",
        formData,
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.msg);
      window.location.href = "/myprofile";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return props.popup ? (
    <div className="popup">
      <div className="inner">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="First Name"
            className="firstinput"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="name"
            placeholder="Last Name"
            className="lastinput"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="name"
            placeholder="University"
            className="uniinput"
            onChange={(e) => setUniversity(e.target.value)}
          />
          <input
            type="file"
            name="file"
            placeholder="pfp"
            className="pic"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="logout submit">edit</button>
        </form>
        <MdCancelPresentation onClick={() => props.trigger(false)}  className="cancel"/>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Edit;
