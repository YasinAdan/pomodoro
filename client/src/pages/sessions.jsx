import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/card";
import Loading from "../components/loading";

export default function Sessions() {
  const [sessions, setSessions] = useState();

  useEffect(() => {
    // make a call for the user's sessions
    const getSessions = async () => {
      try {
        // add header with id from local storage
        const { data } = await axios.get("http://localhost:8000/api/user/get", {
          headers: { id: localStorage.getItem("id") },
        });

        // slice the sessions array to only include the last 30 days
        const sessions = data.sessions.slice(0, 30);
        // sort the sessions array by date
        sessions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setSessions({ sessions });
      } catch (error) {
        console.log(error);
      }
    };
    getSessions();
  }, []);

  return (
    <>
      {sessions ? (
        <Container>
          <h1>past-sessions</h1>
          <span className="sub-text">progress from past 30 days</span>

          {sessions &&
            sessions.sessions.map((session, i) => {
              return (
                <div className="card" key={i}>
                  <Card session={session} />
                </div>
              );
            })}
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

const Container = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: 600;
    background-image: linear-gradient(to left, #553c9a, #b393d3);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .sub-text {
    position: absolute;
    top: 18%;
    left: 56%;
    transform: translate(-50%, -50%);
    font-weight: 600;

    text-shadow: -10px 10px 0px #8effff, -20px 20px 0px #62e8e8,
      -30px 30px 0px #63abab;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  // align content center
  gap: 2rem;
  flex-wrap: wrap;
  margin-left: 3rem;

  .card {
    flex: 0 0 calc(20% - 2rem); /* 20% width for each card with 2rem margin */
    margin-top: 1.5rem;
    margin-top: 2rem;
  }
`;
