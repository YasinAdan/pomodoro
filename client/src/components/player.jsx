import React, { useState, useEffect } from "react";
import lofiPlaylist from "../playlist";
import styled from "styled-components";

function MusicPlayer() {
  const playlist = lofiPlaylist();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);

  useEffect(() => {
    // Shuffle the playlist on component mount or page reload
    const shuffled = playlist.sort(() => Math.random() - 0.5);
    setShuffledPlaylist(shuffled);
    setCurrentSongIndex(0);
  }, []);

/* This is a useEffect hook that adds an event listener to the audio player element when the
shuffledPlaylist or currentSongIndex state variables change. The event listener listens for the
"ended" event, which is triggered when the audio finishes playing. When the event is triggered, it
calls the handleNext function to play the next song in the shuffled playlist. The useEffect hook
also returns a cleanup function that removes the event listener when the component unmounts or when
the shuffledPlaylist or currentSongIndex state variables change. */
  useEffect(() => {
    if (shuffledPlaylist.length > 0) {
      const audioPlayer = document.getElementById("audio-player");
      audioPlayer.addEventListener("ended", handleNext);
      return () => {
        audioPlayer.removeEventListener("ended", handleNext);
      };
    }
  }, [shuffledPlaylist, currentSongIndex]);

  const handlePrevious = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(shuffledPlaylist.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSongIndex === shuffledPlaylist.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  if (shuffledPlaylist.length === 0) {
    return <div>No songs available.</div>;
  }

  const currentSong = shuffledPlaylist[currentSongIndex];

  return (
    <Player>
      <div className="info">
        <h2>
          {currentSong.track} - {currentSong.artist}
        </h2>
        <img src={currentSong.cover} alt={currentSong.track} />
      </div>

      <div className="play">
        <audio
          id="audio-player"
          controls
          autoPlay
          src={currentSong.audio}
          muted
        />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </Player>
  );
}

const Player = styled.div`
  position: absolute;
  height: 7rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    h2 {
      position: absolute;
      bottom: 100%;
      left: 0%;
      font-size: 1.5rem;
      width: 35vw;
      color: black;
      z-index: 1;
      margin-bottom: 0.5rem;
    }
  }

  .play {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30vw;

    button {
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: none;
      outline: none;
      background: #f1f1f1;
      cursor: pointer;

      &:hover {
        background: #e1e1e1;
      }
    }

    audio {
      outline: none;
      width: 20vw;
      margin: 0 1rem;
    }
  }
`;

export default MusicPlayer;
