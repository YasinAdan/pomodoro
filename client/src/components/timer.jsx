import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { userData } from "../reducers/user";
import MusicPlayer from "./player";

export default function Timer() {
  // dates
  const today = new Date().toLocaleString("default", { weekday: "long" });
  const todaysDate = new Date().toLocaleString().split(",")[0];

  const email = useSelector((state) => state.user.email);

  const id = localStorage.getItem("id");

  const uri = "http://localhost:8000/api/user/save";

  const [sessionLength, setSessionLength] = useState(0.05); // in minutes
  const [breakLength, setBreakLength] = useState(0.05); // in minutes
  const [currentSession, setCurrentSession] = useState(0); // 0-indexed
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState({
    email,
    date: [today, todaysDate],
    sessions: 1,
    breaks: 0,
  });
  const [note, setNote] = useState("");
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);

  const [clickCounter, setClickCounter] = useState(1);

  useEffect(() => {
    let timer = null;
    if (timerRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (timerRunning && timeRemaining === 0) {
      if (currentSession % 2 === 0) {
        setCurrentSession(currentSession + 1);
        setTimeRemaining(breakLength * 60);
        setSessionCount((prevSessionCount) => ({
          ...prevSessionCount,
          breaks: prevSessionCount.breaks + 1,
        }));
      } else if (sessionCount.sessions === 4) {
        setCurrentSession(0);
        setTimeRemaining(breakLength * 60);
        setSessionCount((prevSessionCount) => ({
          sessions: 0,
          breaks: prevSessionCount.breaks + 1,
        }));
      } else {
        setCurrentSession(currentSession + 1);
        setTimeRemaining(sessionLength * 60);
        setSessionCount((prevSessionCount) => ({
          ...prevSessionCount,
          sessions: prevSessionCount.sessions + 1,
        }));
      }
    }

    if (sessionCount.breaks === 4) {
      setTimerRunning(false);
    }

    return () => clearInterval(timer);
  }, [
    timerRunning,
    timeRemaining,
    currentSession,
    breakLength,
    sessionLength,
    sessionCount,
  ]);

  const startTimer = () => {
    setIsOnBreak(false);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setCurrentSession(0);
    setTimeRemaining(sessionLength * 60);
    setTimerRunning(false);
    setSessionCount({ sessions: 1, breaks: 0 });
  };

  const theme = {
    color: currentSession % 2 === 0 ? "#e35e79" : "#307dc5",
  };

  const handleSessionSave = async () => {
    // modify the try section, when user clicks on button, it should activate the add a note section, on the
    // second click, it should save the note and the session count to the database

    try {
      if (clickCounter === 1) {
        setConfirmSave(true);
        setClickCounter(2);
        return;
      } else if (clickCounter === 2) {
        const updatedSessionCount = {
          id,
          date: [today, todaysDate],
          sessions: isOnBreak
            ? sessionCount.sessions
            : sessionCount.sessions + 1,
          breaks: isOnBreak ? sessionCount.breaks + 1 : sessionCount.breaks,
          note,
        };

        const response = await axios.post(uri, updatedSessionCount);
        console.log(response);

        // reset session count
        setSessionCount({
          email,
          date: [today, todaysDate],
          sessions: 1,
          breaks: 0,
        });
        setNote("");
        setConfirmSave(false);
        // reset timer
        resetTimer();
        setClickCounter(1);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Main>
      <Container theme={theme}>
        <div>
          <h2 className="header">
            {currentSession % 2 === 0 ? "Work" : "Break"}
          </h2>
        </div>

        <div>
          <h2 className="time">
            {Math.floor(timeRemaining / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeRemaining % 60).toString().padStart(2, "0")}
          </h2>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setBreakLength(5);
              setCurrentSession(0);
              setTimeRemaining(5 * 60);
              setIsOnBreak(true);
              setTimerRunning(true);
            }}
            >
            5 min. break
          </button>

          {timerRunning ? (
            <button onClick={stopTimer} className="sr">
              Pause Timer
            </button>
          ) : (
            <button onClick={startTimer} className="sr">
              Start Timer
            </button>
          )}
          <button onClick={resetTimer}>Reset Timer</button>
          <p className="sessions">Sessions: {sessionCount.sessions}/4</p>
        </div>
      </Container>
      {confirmSave && (
        <CSave>
          <button
            className="cancel-btn"
            onClick={() => {
              setConfirmSave(false);
              setSessionCount({
                email,
                date: [today, todaysDate],
                sessions: 1,
                breaks: 0,
                note: "",
              });
            }}
            >
            ✕
          </button>
          <div className="save-container">
            <h2>Add a note?</h2>
            <div className="data">
              sessions: {sessionCount.sessions}, breaks: {sessionCount.breaks}
            </div>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              maxLength={40}
              ></textarea>
          </div>
        </CSave>
      )}
      <SaveButton
        disabled={sessionCount.breaks >= 1 ? false : true}
        onClick={handleSessionSave}
        >
        Save Session
      </SaveButton>
    <MusicPlayer />
    </Main>
        </>
  );
}

const Main = styled.div`
  position: relative;
`;

const Container = styled.div`
  // circular container that is centered
  width: 65vh;
  height: 65vh;
  border-radius: 2rem;
  z-index: 10;
  // border color
  border: 8px solid ${(props) => props.theme.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;

  .time {
    font-size: 3rem;
    font-weight: bold;
    color: ${(props) => props.theme.color};

    // italic
    font-family: "Courier New", Courier, monospace;
  }

  .header {
    color: ${(props) => props.theme.color};
    font-size: 2rem;
    text-decoration: dashed;
  }

  .sessions {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.color};
    font-weight: bold;
    font-size: 1.1rem;
  }

  button {
    outline: none;
    background: ${(props) => props.theme.color};
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 0 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .sr {
    background: #42fa42;
  }
`;

const SaveButton = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  background: #66edff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;

  &:hover {
    cursor: pointer;
    transform: translate(-50%, -50%) translateY(-5px);
  }
`;

const CSave = styled.div`
  position: fixed;
  background-color: rgb(114, 191, 203);
  width: 15vw;
  height: 20vh;
  border-radius: 2rem;
  color: black;

  // bottom right
  left: 70%;
  top: 79%;

  .cancel-btn {
    position: absolute;
    top: 1%;
    right: 5%;

    border: none;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;

    &:hover {
      scale: 1.2;

      // rotate or spin the x button
      animation: spin 1s linear infinite;
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }

  .save-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;

    .data {
      font-size: 1.2rem;
      font-weight: bold;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 0.5rem;
    }

    textarea {
      width: 80%;
      height: 50%;
      border-radius: 0.5rem;
      outline: none;
      border: none;
      resize: none;
      padding: 0.5rem;

      &:focus {
        border: 2px solid #307dc5;
      }
    }
  }
`;
