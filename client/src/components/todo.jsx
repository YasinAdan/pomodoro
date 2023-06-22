import React, { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import { todoAnim } from "../animations";
import Error from "../pages/error";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const addTodo = (e) => {
    e.preventDefault();
    const name = todoNameRef.current.value;
    if (name === "") return;
    const newTodo = { name, done: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    todoNameRef.current.value = "";
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    // also remove it from local storage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const doneTodo = (index) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos[index] = {
        ...newTodos[index],
        done: !newTodos[index].done,
      };
      return newTodos;
    });
  };

  // save todos to local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    if (todos.length === 0) return;

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container variants={todoAnim} initial="hidden" animate="show" exit="exit">
      <div className="header">
        <h1>to-do</h1>
        <span>keep it simple, 3 tasks max</span>
      </div>
      {!todos.length && (
        <EM>
          <Error data="add a task to get started" className="message" />
        </EM>
      )}
      <div className="todos">
        {todos.map((todo, index) => (
          <div className="todo" key={index}>
            <p className={`${todo.done ? "done" : ""}`}>{todo.name}</p>
            <div>
              <button onClick={() => doneTodo(index)} className="doneBtn">
                ✓
              </button>
              <button onClick={() => removeTodo(index)} className="remove">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <form>
        <input
          type="text"
          placeholder={todos.length > 2 ? "reached limit." : "add a task"}
          ref={todoNameRef}
          disabled={todos.length > 2}
        />
        <button onClick={addTodo} disabled={todos.length > 2}>
          Create+
        </button>
      </form>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: relative;

  width: 15vw;
  height: 40vh;

  .header {
    h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-align: left;
      margin-left: 0.5rem;
      text-decoration: underline;
    }

    span {
      font-size: 1rem;
      font-weight: bold;
      position: relative;
      left: 2rem;
      bottom: 0.5rem;
    }
  }

  .todos {
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .done {
      text-decoration: line-through;
    }
    .todo {
      width: 100%;
      background: #f5f5f5;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.5rem;

      // align center

      p {
        font-size: 1.5rem;
        font-weight: bold;
        margin-right: 1rem;
      }

      button {
        font-size: 1rem;
        font-weight: bold;
        margin: 0 0.3rem;

        &.doneBtn {
          border-color: #28a745;
          color: #28a745;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          padding: 0.375rem 0.75rem;
          border-radius: 0.25rem;
          background-color: transparent;
          border: 1px solid #28a745;

          &:hover {
            background-color: #28a745;
            color: white;
            transition: 0.5s;
            cursor: pointer;
          }
        }

        &.remove {
          border-color: #dc3545;
          color: #dc3545;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          padding: 0.375rem 0.75rem;
          border-radius: 0.25rem;
          background-color: transparent;
          border: 1px solid #dc3545;

          &:hover {
            background-color: #dc3545;
            color: white;
            transition: 0.5s;
            cursor: pointer;
          }
        }
      }
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    input {
      width: 70%;
      height: 2rem;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;

      &:focus {
        outline: none;
        scale: 1.1;
        // give it a box shadow
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
    }

    button {
      font-size: 0.75rem;
      font-weight: bold;
      margin: 0 0.3rem;
      border-color: #007bff;
      color: #007bff;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      background-color: transparent;
      border: 1px solid #007bff;

      &:hover {
        background-color: #007bff;
        color: white;
        transition: 0.5s;
        cursor: pointer;
      }
    }
  }
`;

const EM = styled.div`
  position: absolute;
  width: 100%;

  font-size: 0.5rem;
`;

export default TodoList;
