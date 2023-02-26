import React, { useState } from "react";
import "../CSS/Post.css";

import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";

function Post({ docId, userId, post, caption, comments, isVideo }) {
  const [comment, setComment] = useState("");

  function handleComment(e) {
    e.preventDefault();

    db.collection("posts")
      .doc(docId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(
          `${auth.currentUser.displayName}%*%${comment}`
        ),
      });

    setComment("");
  }

  return (
    <article>
      <div className="userDetail">
        <span>{userId[0].toUpperCase()}</span>
        <p className="userId">{userId}</p>
      </div>
      <div className="userPost">
        {isVideo ? (
          <video src={post} controls></video>
        ) : (
          <img src={post} alt={"Post by " + userId} />
        )}
      </div>
      <p className="userCaption">
        <span className="userId">{userId} &nbsp;</span>
        {caption}
      </p>

      <div className="comments">
        {comments
          .slice(0)
          .reverse()
          .map((comment, i) => {
            const curr = comment.split("%*%");
            return (
              <p key={i}>
                <span className="userId">{curr[0]}&nbsp;</span> {curr[1]}
              </p>
            );
          })}
      </div>

      <form onSubmit={handleComment} className="comment">
        <input
          type="text"
          placeholder="Add a comment..."
          className="commentText"
          style={{ border: "none" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="postComment" disabled={!comment}>
          Post
        </button>
      </form>
    </article>
  );
}

export default Post;
