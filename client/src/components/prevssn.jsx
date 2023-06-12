import React from "react";
import styled from "styled-components";
import Loading from './loading';

export default function Prevssn({ sessions }) {
   
  return (

    <Container>
      <h1>past-sessions</h1>
      {sessions ? (
        sessions.sessions.map((session, i) => {
          return (
            <div className="session" key={i}>
              <b>{session.date[1]}: </b>
              <p className={`${
              session.sessions === 1 ? "nc" : session.sessions === 2 ? "kc" : session.sessions === 3 ? "kc" : "cc"
            }`}>
                {" "}
                25 Minutes | <span>SSINS {session.sessions}/4</span>
              </p>
            </div>
        );
      })
      ) : (
        <LL>
          <Loading />
        </LL>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  left: -5rem;

  height: 50vh;
  width: 15vw;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
    margin-left: 0.5rem;
    text-decoration: underline;
    text-decoration-style: double;
  }

  .session {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;

    b {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }

    p {
      font-weight: bold;
      padding: 0.2rem;

    }
    .nc {
      background-color: rgb(253 204 188);
    }
    .kc {
      background-color: #fcf38f;
    }
    .cc {
      background-color: #affdaf;
    }
  }

`;

const LL =  styled.div`

  position: absolute;
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%);

  color: black;
  font-weight: bold;

`;