import "./Post.css";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import {RiDeleteBin6Line} from "react-icons/ri"
import axios from "axios";


const Post = (props) => {

  const handleDelete = async () => {
    
    try {
      
      const response = await axios.delete(`https://scholar-sphere-puce.vercel.app/user/delete/${props.postId}`,
      {
        headers:{
          Authorization: `bearer ${window.localStorage.getItem("token")}`
        }
      })
      console.log(response.data.msg)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    


  }

  return (
    <>
      <div className="postwall">
        <div className="details">
          <Link
            to={`/user/${props.id}`}
            state={{ id: props.id }}
            className="pfp"
            style={{ width: "40px" }}
          >{console.log(props.key)}
            <img className="pfp" src={props.pfp} alt="pfp" />
          </Link>
          <Link to={`/user/${props.id}`} state={{ id: props.id }}>
            <p className="user"> {props.user} </p>
          </Link>
          {props.delete && <RiDeleteBin6Line className="delete" onClick={handleDelete}/>}
          <p className="time">{props.time}</p>
          {props.post && <p className="text">{props.post}</p>}
        </div>
        {props.photo && (
          <div className="Photo">
            <a href={props.photo} className="post" target="_blank">
              <img className="post" src={props.photo} alt="" />
            </a>
          </div>
        )}
        <div className="like">
          <div className="thumbsup">
            <BiLike className="heart"></BiLike>
          </div>
          <div className="comment">
            <BiCommentDetail className="box"></BiCommentDetail>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
