import React, { useState } from "react";
import "../CSS/Create.css";
import postBG from "../images/createPostBackground.png";

import { db, auth, storage } from "../firebase";

function Create() {
  const [uploadfile, setUploadFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleFile(e) {
    const file = e.target.files[0];
    setUploadFile(file);
    if (file) {
      if (file.size > 27000000) {
        alert("Excedded file limit!\nFile size should be less than 25MB.");
      } else {
        setPostUrl(URL.createObjectURL(file));

        setFileSelected(true);
        setIsVideo(file.type === "video/mp4");
      }
    } else {
      setFileSelected(false);
      setPostUrl("");
      setIsVideo(false);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    const countP = await db.collection("count").get();
    const count = countP.docs[0].data().count;

    const fileName = "file" + count + uploadfile.name.slice(-4);
    const uploadTask = storage.ref(`files/${fileName}`).put(uploadfile);
    const btn = document.querySelector("#createPost form button");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(progress);
        btn.innerHTML = "Uploading...";
        btn.disabled = true;
      },
      (error) => {
        //error function...
        console.log(error.message);
      },
      () => {
        //uploaded successfully function...
        storage
          .ref("files")
          .child(fileName)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              userId: auth.currentUser.displayName,
              postImg: url,
              caption: caption,
              comments: [],
              timestamp: new Date(),
              isVideo: isVideo,
            });
          });

        db.collection("count")
          .doc("imageCount")
          .update({ count: count + 1 });

        btn.innerHTML = "Upload";
        setUploadFile(null);
        setFileSelected(false);
        setCaption("");
        setPostUrl("");
        setIsVideo(false);
        setProgress(0);
      }
    );
  }

  const imgStyle = {
    display: "block",
    width: "100%",
    height: "76%",
    objectFit: "contain",
    marginBottom: "-14px",
  };

  return (
    <div id="createPost">
      <div>
        {postUrl ? (
          isVideo ? (
            <video
              controls
              autoPlay
              src={postUrl}
              style={{ width: "100%", height: "76%", marginBottom: "-15px" }}
            ></video>
          ) : (
            <img src={postUrl} alt="post overview" style={imgStyle} />
          )
        ) : (
          <img src={postBG} alt="default post background" style={imgStyle} />
        )}
        <progress
          value={progress}
          max={1}
          style={{ width: "100%", height: "8px" }}
        ></progress>
        <form onSubmit={handleUpload}>
          <span id="createData">
            <input
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              type="text"
              placeholder="Enter a caption"
              required
            />
            <label
              htmlFor="inputFile"
              title="Add photo or video to create a new post"
            >
              Select file
            </label>
            <input
              type="file"
              accept="image/*, video/mp4"
              id="inputFile"
              onChange={handleFile}
              required
            />
          </span>
          <button type="submit" disabled={!fileSelected}>
            Upload
          </button>
        </form>
      </div>
      <p style={{ color: "#f1f1f1", fontSize: "12px", marginTop: "10px" }}>
        click outside the box to exit
      </p>
    </div>
  );
}

export default Create;
