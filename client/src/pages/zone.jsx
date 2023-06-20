import React, { useEffect, useState } from "react";
import Timer from "../components/timer";
import Prevssn from "../components/prevssn";
import styled from "styled-components";
import TodoList from "../components/todo";
import axios from "axios";

export default function zone() {
  const [sessions, setSessions] = useState();

  useEffect(() => {
    // make a call for the user's sessions
    const getSessions = async () => {
      try {
        // add header with id from local storage
        const { data } = await axios.get("http://localhost:8000/api/user/get", {
          headers: { id: localStorage.getItem("id") },
        });

        console.log(data.sessions);

        // slice the sessions array to only include the last 30 days
        const filter = data.sessions.slice(0, 7);
        console.log(filter);

        setSessions(filter);
      } catch (error) {
        console.log(error);
      }
    };
    getSessions();
  }, []);

  return (
    <Container>
      <Prevssn sessions={sessions} />
      <Timer />
      <TodoList />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
