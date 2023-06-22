import React from "react";
import styled from "styled-components";
import { motion } from 'framer-motion';
import { ALAnim, ARAnim } from '../animations';


function About() {
  return (
    <Container>
      <motion.div className="left" variants={ALAnim} initial='hidden' animate='show' exit='exit'>
        <h1>The Pomodoro Technique</h1>
        <p>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s. It is a popular approach that
          helps individuals improve productivity, manage time effectively, and
          maintain focus on tasks. The technique uses a timer to break work into
          intervals, typically 25 minutes in length, separated by short breaks.
        </p>

        <h2>Steps of the Pomodoro Technique:</h2>
        <ol>
          <li>
            Plan: Begin by creating a to-do list or identifying the tasks you
            want to accomplish.
          </li>
          <li>
            Set the timer: Set a timer for 25 minutes, known as one Pomodoro.
            During this time, focus solely on the task at hand without any
            distractions.
          </li>
          <li>
            Work: Engage in deep work during the Pomodoro period, aiming to
            complete as much of the task as possible. Avoid multitasking and
            stay fully immersed in the activity.
          </li>
          <li>
            Take a break: When the timer goes off, take a short break of around
            5 minutes. Use this time to relax, stretch, or do something
            unrelated to work. This break helps recharge and rejuvenate.
          </li>
          <li>
            Repeat: After the short break, start another Pomodoro session.
            Repeat the cycle of work and break until you have completed four
            Pomodoros.
          </li>
          <li>
            Longer break: After completing four Pomodoros, take a longer break
            of around 15-30 minutes. This extended break allows for deeper
            relaxation and helps maintain overall productivity.
          </li>
        </ol>

        <p>
          The Pomodoro Technique offers several benefits. By breaking work into
          focused intervals, it promotes better time management and helps
          overcome procrastination. The time limits create a sense of urgency
          and prevent tasks from dragging on indefinitely. The technique also
          encourages regular breaks, preventing mental fatigue and improving
          productivity in the long run.
        </p>

        <p>
          Moreover, the Pomodoro Technique aids in tracking progress, as each
          completed Pomodoro represents a unit of work accomplished. It also
          provides an opportunity to assess task estimation accuracy, as
          individuals can analyze how many Pomodoros specific activities
          require.
        </p>

        <p>
          Overall, the Pomodoro Technique is a practical and effective time
          management approach that fosters concentration, combats distractions,
          and enhances productivity. It can be adapted to various work settings
          and proves valuable for individuals seeking to make the most of their
          time while maintaining a healthy work-life balance.
        </p>
      </motion.div>

      <motion.div className="right" variants={ARAnim} initial='hidden' animate='show' exit='exit'>
        <h2>Contact</h2>
        <form action="https://formsubmit.co/yasinadan1@gmail.com" method="POST">
          <input type="text" name="name" required placeholder="name" />
          <input type="email" name="email" required placeholder="email" />
          <textarea
            name="message"
            required
            rows={10}
            placeholder="message"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </motion.div>
    </Container>
  );
}

const Container = styled.div`
  //divide the page into two columns
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .left {
    position: relative;
    top: -3rem;
    margin-left: 5rem;
    background-color: #152529;
    padding: 2rem;
    width: 50%;
    color: white;
    h1 {
      font-size: 2rem;
      text-align: center;
    }

    p {
      margin-bottom: 10px;
      line-height: 1.5;
      text-align: left;
    }

    ol {
      margin: 1rem;

      li {
        margin-bottom: 10px;
        line-height: 1.5;
        text-align: left;
      }
    }
  }

  .right {
    margin-right: 10rem;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;

      input {
        width: 15vw;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid #85ccde;
        background: #f1f1f1;

        &:focus {
          background: #e1e1e1;
        }

        &:hover {
          background: #e1e1e1;
        }
      }

      textarea {
        width: 15vw;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid #85ccde;
        background: #f1f1f1;

        &:focus {
          background: #e1e1e1;
        }
        &:hover {
          background: #e1e1e1;
        }
      }

      button {
        width: 5vw;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid #85ccde;
        background: #f1f1f1;
        cursor: pointer;

        &:hover {
          background: #85ccde;
        }

        &:focus {
          background: #85ccde;
        }
      }
    }
  }
`;

export default About;
