import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import styled from "styled-components";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

export default function Signup() {

  const navigate = useNavigate();

  const [message, setMessage] = useState(""); // ["success", "message"

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);

    const {email, password} = values;

    try {
      const {data} = await axios.post("http://localhost:8000/api/user/signup", {email, password});

      // if response is good, dispatch user to redux store

      setLoading(false);

      if(data.status >= 200 && data.status < 300) {
        setMessage("Success! Redirecting to login page...");
      }


      setTimeout(() => {
        navigate("/login");
      }, 2000);






    } catch (error) {
      setLoading(false);
      setMessage("Error signing up. Please try again.")
    }  
  }



  return (
    <Container>
      <h1>Sign Up</h1>
     <Formik
       initialValues={{ email: '', password: '', confirmPassword: '' }}
       validate={values => validate(values)}
       onSubmit={(values) => handleSubmit(values)}
     >
         <Form className='form'>
           <Field type="email" name="email" placeholder="email..." className="input"/>
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" placeholder="password" className="input" autoComplete="true"/>
           <ErrorMessage name="password" component="div" />
           <Field type="password" name="confirmPassword" placeholder="confirm password" className="input" autoComplete="true"/>
           <ErrorMessage name="confirmPassword" component="div" />
           <button type="submit" >
            
             Submit
           </button>
           <Link to="/login">Already have an account? Login here.</Link>
         </Form>
     </Formik>
      {message && <div className='message'>{message}</div>}
   </Container>
  )
}

const Container = styled.div`
  height: 70vh;
  width: 70vw;
  margin: 6.5rem auto;
  position: relative;
  // gradient
  background: linear-gradient(90deg, rgba(57, 106, 252, 0.7) 0%, rgba(41,72,255,0.85) 50%);
  border-radius: 10px;

  h1 {
    position: absolute;
    top: -8%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 2rem;
    // italic font style
    font-style: italic;

  }


  .message {
    position: absolute;
    left: 50%;
    color: black;
    font-size: 1.2rem;
  }
  
  

  .form {
    position: relative;

    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      margin: 10px;
      width: 20rem;
      height: 2rem;
      border-radius: 5px;
      border: none;
      padding: 5px;

      &:focus {
        outline: none;
      }
    }

    button {
      margin: 10px;
      width: 10rem;
      height: 2rem;
      border-radius: 5px;
      border: none;
      background-color: #28a745;
      color: white;
      cursor: pointer;

      &:active {
        // scale animation
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
    }

    a {
      position: absolute;
      bottom: 2%;
      left: 80%;
      color: white;
    }
  }
`;