/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";

function test2() {
  const [videoUpload, setVideoUpload] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);

  const videosListRef = ref(storage, "videos/");
  const uploadFile = () => {
    if (videoUpload == null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(videosListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setVideoUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        accept="video/*"
        onChange={(event) => {
          setVideoUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Video</button>
      {videoUrls.map((url, index) => {
        return <video key={index} src={url} controls />;
      })}
    </div>
  );
}

export default test2;
