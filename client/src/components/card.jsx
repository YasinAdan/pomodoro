import React from 'react';
import styled from 'styled-components';

export default function Card({session}) {
  return (
    <Container>
        <div className='header'>
            {session.date[0]} | {session.date[1]}
        </div>
            <p>25 Minutes</p>
        <div className='card-body'>
            <div className='left'>
                <p>sessions: {session.sessions}/4</p>
                <p>breaks: {session.breaks}</p>
            </div>
            <div className='line'></div>
            <div className='right'>
                <p>notes would go here in this section</p>
            </div>
        </div>

    </Container>
  )
}

const Container = styled.div`
position: relative;
margin: 1rem;

background-color: #000000;
color: white;

border: 1px solid black;

width: 15vw;
height: 15vh;

display: flex;
flex-direction: column;

.card-body {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    gap: 3.5rem;

    .left {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;


    }

    .right {
        width: 50%;
    }

    .line {
        width: 1px;
        height: 100%;
        background-color: white;
        position: absolute;
        left: 50%;
    }

}






`;