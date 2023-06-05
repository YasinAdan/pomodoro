import React from 'react';
import styled from 'styled-components';

export default function Prevssn({sessions}) {
  return (
    <Container>
        <h1>past-sessions</h1>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
        <div className='session'>
            <b>1/20/2021: </b><p>25 Minutes | <span>SSINS 2/4</span></p>
        </div>
    </Container>
  )
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
            background-color: #e8e8e8;
            font-weight: bold;
            padding: 0.2rem;
        }
    }
    


`;