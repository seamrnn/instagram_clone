import React from "react";
import { useEffect, useState } from "react";
import Post from "./Post.js";
import { db } from "../firebase.js";

function Content() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <>
      {posts.map((doc) => {
        return (
          <Post
            key={doc.id}
            docId={doc.id}
            userId={doc.post.userId}
            post={doc.post.postImg}
            caption={doc.post.caption}
            comments={doc.post.comments}
            isVideo={doc.post.isVideo}
          />
        );
      })}
    </>
  );
}

export default Content;
