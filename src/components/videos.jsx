/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { listFiles, getFileURL } from "../firebase/storage";
import Video from "./video";
import "./videos.scss";

function Videos() {
  const [url, setURL] = useState([]);
  const [TITLE, setTITLE] = useState([]);
  useEffect(() => {
    (async () => {
      const { items } = await listFiles("/mp4");
      const titles = items.map((item) => item.name);
      const urls = await Promise.all(
        titles.map((uri) => getFileURL(`/mp4/${uri}`))
      );
      setTITLE(titles.map((title) => title.replace(".mp4", "")));
      setURL(urls);
    })();
  }, []);
  return [
    <div className="videos-wrapper">
      {url &&
        url.map((url, index) => (
          <Video key={url} src={url} title={TITLE[index]} />
        ))}
    </div>,
  ];
}

export default Videos;
