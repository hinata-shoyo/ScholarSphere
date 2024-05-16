import React from "react";
import "./Post.css";
import { BiLike, BiCommentDetail } from "react-icons/bi";

const Post = (props) => {
  return (
    <>
      <div className="postwall">
        <div className="details">
          <img className="pfp" src={props.pfp} alt="pfp" />
          <p className="user"> {props.user}</p>
          <p className="time">{props.time}</p>
          <p className="text">
            {props.post}
          </p>
        </div>
        {props.photo && <div className="Photo">
          <img className="post" src={props.photo} alt="" />
        </div>}
        <div className="like">
          <div className="thumbsup">
            <BiLike className="heart"></BiLike>
            {/* <h5 className="liketext">Like</h5> */}
          </div>
          <div className="comment">
            <BiCommentDetail className="box"></BiCommentDetail>
            {/* <h5 className="commentText">Comment</h5> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
