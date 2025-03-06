import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  getCollection,
  getCollectionEntry,
  updateCollectionEntry,
} from "../firebase/firestore";
import { connect } from "react-redux";
import "./video.scss";

const mapStateToProps = ({ state }) => ({
  fingerprint: state.authentication.fingerprint,
  updateTick: state.updateTick,
});

function Video({ src: url, updateTick, fingerprint, title, key, ...props }) {
  delete props.dispatch;
  const [playeds, setPlayeds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(undefined);
  const [savedPlayedSeconds, setSavedPlayedSeconds] = useState(0);
  const [savedPlayedSecondsAll, setSavedPlayedSecondsAll] = useState(0);
  const [saveEndOnPlay, setSaveEndOnPlay] = useState(false);
  useEffect(() => {
    if (playedSeconds === undefined) return;
    updateCollectionEntry("fingerprints", fingerprint, {
      [title]: savedPlayedSeconds + playedSeconds,
    });
  }, [playedSeconds]);
  useEffect(() => {
    (async () => {
      const documents = await getCollection("fingerprints");
      if (documents === undefined || title === null) return;
      const data = documents.map((document) => document.data());
      let secondsArray = data.map(
        ({ [title]: saveOfPlayedSeconds }) => saveOfPlayedSeconds
      );
      secondsArray = secondsArray.filter((value) => !isNaN(value));
      setSavedPlayedSecondsAll(
        secondsArray.reduce((previous, current) => previous + current, 0)
      );
    })();
  }, [updateTick]);
  useEffect(() => {
    (async () => {
      const { [title]: saveOfPlayedSeconds } = await getCollectionEntry(
        "fingerprints",
        fingerprint
      );
      if (saveOfPlayedSeconds === undefined) return;
      setSavedPlayedSeconds(saveOfPlayedSeconds);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let plays = 0;
      const documents = await getCollection("fingerprints");
      if (documents == undefined) return;
      const docPlayedsCollection = documents.map(
        (document) => document.data().played
      );
      docPlayedsCollection.forEach((array) => {
        if (array.includes(title)) {
          plays = ++plays;
        }
      });
      setPlayeds(plays);
    })();
  }, []);
  return (
    <div className="video-wrapper" key={key + "0"}>
      <div className="video-title" key={key + "1"}>
        {title}
      </div>
      <ReactPlayer
        onEnded={() => {
          setSaveEndOnPlay(true);
        }}
        onProgress={({ playedSeconds }) => {
          setPlayedSeconds(playedSeconds);
        }}
        onPlay={() => {
          if (saveEndOnPlay) {
            setSaveEndOnPlay(false);
            setSavedPlayedSeconds(savedPlayedSeconds + playedSeconds);
          }
          getCollectionEntry("fingerprints", fingerprint).then(
            ({ played = [] }) => {
              if (!played.includes(title)) {
                setPlayeds(playeds + 1);
                updateCollectionEntry("fingerprints", fingerprint, {
                  played: [title, ...played],
                });
              }
            }
          );
        }}
        className="video"
        controls
        {...{ url, key, ...props }}
      />
      <div key={key + "2"}>
        joué: {playeds} fois, temps total joué:{" "}
        {formatSeconds(
          savedPlayedSecondsAll === undefined || isNaN(savedPlayedSecondsAll)
            ? 0
            : savedPlayedSecondsAll
        )}
      </div>
    </div>
  );
}
function formatSeconds(seconds) {
  let days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return (
    (days === 0 ? "" : days < 10 ? "0" + days + "ⱼ:" : days + "ⱼ:") +
    (hours < 10 ? "0" + hours : hours) +
    "ₕ:" +
    (minutes < 10 ? "0" + minutes : minutes) +
    "ₘ:" +
    (seconds < 10 ? "0" + Math.floor(seconds) : Math.floor(seconds)) +
    "ₛ"
  );
}
export default connect(mapStateToProps)(Video);
