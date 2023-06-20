import React, { useState, useEffect } from "react";
import lofiPlaylist from "../playlist";
import styled from "styled-components";

function MusicPlayer() {
  const playlist = lofiPlaylist();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = playlist[currentSongIndex];

  const handlePrevious = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(playlist.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSongIndex === playlist.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  useEffect(() => {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.addEventListener("ended", handleNext);
    return () => {
      audioPlayer.removeEventListener("ended", handleNext);
    };
  }, [currentSongIndex]);

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
