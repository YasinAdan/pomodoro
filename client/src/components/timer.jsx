import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { userData } from "../reducers/user";

export default function Timer() {
  // dates
  const today = new Date().toLocaleString("default", { weekday: "long" });
  const todaysDate = new Date().toLocaleString().split(",")[0];

  const email = useSelector((state) => state.user.email);

  const uri = "http://localhost:8000/api/user/save";

  const [sessionLength, setSessionLength] = useState(25); // in minutes
  const [breakLength, setBreakLength] = useState(5); // in minutes
  const [currentSession, setCurrentSession] = useState(0); // 0-indexed
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState({
    email,
    date: [today, todaysDate],
    sessions: 1,
    breaks: 0,
  });
  const [isOnBreak, setIsOnBreak] = useState(false);

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
    color: currentSession % 2 === 0 ? "#C60C30" : "#004687",
  };

  const handleSessionSave = async () => {
    try {
      const updatedSessionCount = {
        email,
        date: [today, todaysDate],
        sessions: isOnBreak ? sessionCount.sessions : sessionCount.sessions + 1,
        breaks: isOnBreak ? sessionCount.breaks + 1 : sessionCount.breaks,
      };

      const response = await axios.post(uri, updatedSessionCount);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
      <SaveButton
        disabled={sessionCount.breaks >= 1 ? false : true}
        onClick={handleSessionSave}
        >
        Save Session
      </SaveButton>
    </>
  );
}

const Container = styled.div`
  // circular container that is centered
  width: 65vh;
  height: 65vh;
  border-radius: 50%;
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
  position: absolute;
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
