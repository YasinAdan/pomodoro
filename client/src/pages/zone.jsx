import React from 'react';
import Timer from '../components/timer';
import Prevssn from '../components/prevssn';
import styled from 'styled-components';
import TodoList from '../components/todo';

export default function zone() {
  return (
    <Container>
      <Prevssn />
        <Timer />
      <TodoList />
    </Container>
  )
}

const Container = styled.div`

    width: 100vw;

    display: flex;
    justify-content: space-around;
    align-items: center;
   
    
    





`;