import "./createPost.css"
import { useState } from "react"
import axios from "axios"


const Create = (props) => {

    const [desc, setDesc] = useState("")
    const [file, setFile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("description", desc);
    
          const response = await axios.post(
            "https://scholar-sphere-puce.vercel.app/user/post",
            formData,
            {
              headers: {
                Authorization: `bearer ${window.localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data.msg);
          window.location.href = "/";
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <div className="createpost">
            <form encType="multpart/form-data" onSubmit={handleSubmit} >
            <input type="text" placeholder="Share a post..." className="desc" onChange={(e) => setDesc(e.target.value)}/>
            <input type="file" className="photoo" id="file" onChange={(e) => setFile(e.target.files[0])}/>
            <label for="file" className="label">select file</label>
            <button className="logout send">Post</button>
            </form>
        </div>
    )
}

export default Create