import React, { useEffect } from "react";
import "./Post.css";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const Post = (props) => {
  // const gotoUser = () => {
  //   // console.lgo(props)
  //   window.location.href = "/user"
  // }

  return (
    <>
      <div className="postwall">
        <div className="details">
          <Link to={"/user"} state={{ id: props.id }} className="pfp">
            <img className="pfp" src={props.pfp} alt="pfp" />
          </Link>
          <Link to={"/user"} state={{ id: props.id }}>
            <p className="user"> {props.user} </p>
          </Link>
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
