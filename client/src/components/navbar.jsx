import React, {useState} from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth, userData } from '../reducers/user';

function menuOptions (auth, handleLogout) {
    return (
        <div className='menu-options'>
            <Link to='/' className='link'>Home</Link>
            {auth ? <Link to='/zone' className='link'>Zone</Link> : <Link to='/signup' className='link'>Signup</Link>}
            {auth ? <Link to='/sessions' className='link'>Sessions</Link> : <Link to='/login' className='link'>Login</Link>}
            {auth && <button className='logout' onClick={handleLogout}>Logout</button>}
        </div>
    )
}

export default function navbar() {
    const [menu, setMenu] = useState(false);
    const auth = useSelector(state => state.user.auth);
    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();


    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setAuth(false));
        dispatch(userData({id: null, userEmail: null}));


    }
  return (
    <Container>
        <div className='logo'>
            <h3>p-mo.d-ro</h3>
        </div>
        <div className='links-container'>
            <Link to='/' className='link'>Home</Link>
            {auth ? <Link to='/zone' className='link'>Zone</Link> : null}
            <Link to='/sessions' className='link'>Sessions</Link>
            <Link to='/about' className='link'>About</Link>
        </div>
        <button className='menu-btn' onClick={() => setMenu(!menu)}>Menu</button>
        {menu && menuOptions(auth, handleLogout)}
    </Container>
  )
}

const Container = styled.nav`

    width: 100vw;
    height:8vh;
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

    .menu-btn {
        background-color: #2E41F3;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        }

    .menu-options {
        background-color: #000000;
        border-radius: 5px;
        z-index: 1;
        width: 15vh;
        height: 17vh;
        padding: 0.5rem;
        position: absolute;
        top: 9vh;
        right: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        
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