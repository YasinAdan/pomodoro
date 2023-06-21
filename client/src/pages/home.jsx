import React from "react";
import StarsCanvas from "../components/Stars";
import styled from "styled-components";
import EarthCanvas from "../components/canvas/Earth";
import { titleAnim, fade, photoAnim, pageAnimation } from "../animations";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container>
        <StarsCanvas />
        <div className="body">
          <Description>
            <motion.div>
              <Hide>
                <motion.h2 variants={titleAnim}>
                  Get More<span className="highlight-1"> Shit</span>
                </motion.h2>
              </Hide>
              <Hide>
                <motion.h2 variants={titleAnim}>
                  Done With <span className="highlight-2">p-mo.d-ro</span>
                </motion.h2>
              </Hide>
              <Hide>
                <motion.h2 variants={titleAnim}>
                  Be More <span className="highlight-3">Productive.</span>
                </motion.h2>
              </Hide>
            </motion.div>
            <motion.p variants={fade}>
              Boost your productivity with the Pomodoro technique and accomplish
              more in less time. Start your journey towards efficient work
              management today.
            </motion.p>
            <Link to="signup">
              <motion.button>Get Started</motion.button>
            </Link>
          </Description>
          <div className="right">
            <EarthCanvas />
          </div>
        </div>
      </Container>
    </motion.div>
  );
}

const Container = styled.div`
  .body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;

    .right {
      margin-top: 2rem;
    }
  }
`;

const Description = styled.div`
  flex: 1;
  padding-right: 5rem;
  h2 {
    font-weight: lighter;
    font-size: 4rem;
  }
  .highlight-1 {
    font-weight: bold;
    color: #e99b9b;
  }
  .highlight-2 {
    font-weight: bold;
    color: #23d997;
  }
  .highlight-3 {
    font-weight: bold;
    color: #f263ed;
  }
  z-index: 2;

  p {
    padding: 3rem 0rem;
    font-size: 1.4rem;
    line-height: 150%;
  }

  button {
    font-size: 1.5rem;
    padding: 1rem 4rem;
    border: 4px solid #23d997;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      background-color: #23d997;
      color: white;
    }

    a {
      text-decoration: none;
      color: white;
    }
  }

  @media (max-width: 1300px) {
    padding: 0;
    button {
      margin: 2rem 0rem 5rem 0rem;
    }
  }
`;

const Hide = styled.div`
  overflow: hidden;
`;
