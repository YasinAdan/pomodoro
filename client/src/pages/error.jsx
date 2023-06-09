import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import styled from "styled-components";


export default function Error({data}) {
  let message = [data]
  return (
    <Container>
        <h1 style={{ paddingTop: '5rem', fontWeight: 'normal' }}>
        {' '}
        <span style={{ color: 'black', fontWeight: 'bold' }}>
          <Typewriter
            words={message}
            loop={false}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
    </Container>
  )
}

const Container = styled.div`

text-align: center;
font-family: "Courier New", Courier, monospace;


`;