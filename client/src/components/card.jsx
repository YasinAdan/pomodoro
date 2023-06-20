import React from "react";
import styled from "styled-components";

export default function Card({ session }) {
    
  return (
    <Container>
      <div
        className={`
        main ${session.sessions <= 2 ? "red" : "black"}
        `}
      >
        <div className="header">
          {session.date[0]} | {session.date[1]}
          <p>25 Minutes</p>
        </div>
        <div className="card-body">
          <div className="left">
            <p>sessions: {session.sessions}/4</p>
            <p>breaks: {session.breaks}</p>
          </div>
          <div className="line"></div>
          <div className="right">
            {session.note ? <p>notes: {session.note}</p> : <p>no notes...</p>}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 1rem;
  width: 15vw;
  height: 15vh;

  display: flex;
  flex-direction: column;
  color: white;
  
  .main {
    border-radius: 0.5rem;
  }

  .black {
    background: #0f2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c5364,
      #203a43,
      #0f2027
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c5364,
      #203a43,
      #0f2027
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    height: 100%;
  }
  .red {
    background: #200122; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #6f0000,
      #200122
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #6f0000,
      #200122
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: 100%;
  }

  .header {
    height: 40%;
    padding: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .card-body {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 3.5rem;
    font-size: 0.9rem;

    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    .right {
      width: 50%;
      word-wrap: break-word;
    }

    .line {
      width: 1px;
      height: 100%;
      background-color: white;
      position: absolute;
      left: 48%;
    }
  }
`;
