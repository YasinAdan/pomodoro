import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, userData } from "../reducers/user";

function menuOptions(auth, handleLogout) {
  return (
    <>
      <Link to="/" className="link">
        Home
      </Link>
      {auth ? (
        <Link to="/zone" className="link">
          Zone
        </Link>
      ) : (
        <Link to="/signup" className="link">
          Signup
        </Link>
      )}
      {auth ? (
        <Link to="/sessions" className="link">
          Sessions
        </Link>
      ) : (
        <Link to="/login" className="link">
          Login
        </Link>
      )}
      {auth && (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
}

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const auth = useSelector((state) => state.user.auth);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("todos");
    dispatch(setAuth(false));
    dispatch(userData({ id: null, userEmail: null }));
  };

  return (
    <Container>
      <div className="logo">
        <h3>p-mo.d-ro</h3>
      </div>
      <div className="links-container">
        <Link to="/" className="link">
          Home
        </Link>
        {auth ? (
          <Link to="/zone" className="link">
            Zone
          </Link>
        ) : null}
        {auth ? (
          <Link to="/sessions" className="link">
            Sessions
          </Link>
        ) : null}
        <Link to="/about" className="link">
          About
        </Link>
      </div>
      <div className="menu-container">
        <button className="menu-btn" onClick={() => setMenu(!menu)}>
          Menu
        </button>
        <div className={`menu-options ${menu ? "open" : "hide"}`}>
          {menuOptions(auth, handleLogout)}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  width: 100vw;
  height: 8vh;
  background-color: #2c2b2b;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20rem;

  .logo {
    h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #ffffff;
    }
  }

  .links-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;

    .link {
      text-decoration: none;
      font-size: 1.2rem;
      color: #ffffff;
    }
  }

  .menu-container {
    position: relative;
  }

  .menu-btn {
    background-color: #2e41f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .menu-options {
    background-color: #2e41f3;
    border-radius: 5px;
    z-index: 1;
    width: 15vh;
    height: 0;
    position: absolute;
    top: 100%;
    left: -3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    transition: height 0.3s ease;
    margin-top: 1.9rem;

    &.open {
      height: 17vh;
    }

    &.hide {
    }

    .link {
      text-decoration: none;
      font-size: 1.2rem;
      color: #ffffff;

      &:hover {
        text-decoration: underline;
      }
    }

    .logout {
      background-color: #f32e48;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  }
`;
