import { useState, useEffect } from "react";
import "./Comment.css";
import axios from "axios";
import { MdCancelPresentation } from "react-icons/md";

const CommentCard = (props) => {
  return (
  
  <div className="comCard">
    <div className="byy">
      {props.by}
    </div>
    <div className="content">{props.comment}</div>
  </div>
  )
};

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  const getComs = async () => {
    try {
      const response = await axios.get(
        `https://scholar-sphere-puce.vercel.app/user/comments/${props.id}`,
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setComments(response.data.comments);
      console.log(comments)
    } catch (error) {
      console.log(error);
    }
  };

  const comment = async () => {
    try {
      const response = await axios.put(
        `https://scholar-sphere-puce.vercel.app/user/comment/${props.id}`,
        {
          comment:body,
        },
        {
          headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getComs();
      setBody("")
      console.log(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComs();
  }, []);

  useEffect(() => {
    if (props.show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [props.show]);

  return props.show ? (
    <div className="popup">
      <div className="inner commenttt">
        <MdCancelPresentation
          onClick={() => props.trigger(false)}
          className="cancel"
        />
        <div className="commentsss">


        
          
        
          {comments.length !== 0 ?(comments.map((comment) => {
            return <CommentCard comment={comment.comment} by={comment.by} key={comment._id}/>;
          })): <div className="noCom">Be the first one to comment :3</div>}
         
        </div>
        <div className="addComm">
          <input
            type="comment"
            className="input"
            placeholder="Add your comment"
            onChange={(e) => {
              setBody(e.target.value)
            }}
          />
          <button className="add logout" onClick={comment}>
            Add
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Comment;
