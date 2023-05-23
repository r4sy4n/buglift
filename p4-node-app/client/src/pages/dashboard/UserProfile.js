import React, { useState, useReducer, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SharedLayoutContext } from './SharedLayout';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from 'axios';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); 
  h3 {
    margin-top: 0;
  }
  /* .form-center {
    grid-template-columns: 1fr 1fr 1fr;
  } */
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 75vw;
    transition: 0.3s ease-in-out all;
    /* width: 100%; */
  }
  /* .form-center {
    display: grid;
    row-gap: 0.5rem;
  } */
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 2rem;
  }
  .form-move{
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    width: 90vw;
    background: #fff;  
    transition: 0.3s ease-in-out all;
  }
`
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const UserProfile = () => {
  const { showSidebar } = useContext(SharedLayoutContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('')
  const id = localStorage.getItem('id'); 
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  
  const initialState = {
    username: user,
    email: email,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const token = localStorage.getItem('token'); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get( `http://localhost:8000/api/v1/users/${id}`, config ).then( response =>{
      setUser(response.data.user);
      setEmail(response.data.email);
      setIsLoading(false);
        console.log(response)
    });
  }, []);

  const usernameChange = (event) => {
    dispatch({ type: 'SET_USERNAME', payload: event.target.value });
  };

  const emailChange = (event) => {
    dispatch({ type: 'SET_EMAIL', payload: event.target.value });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
        axios.put( `http://localhost:8000/api/v1/users/${id}`, {
          username: state.username,
          email: state.email
        }).then( response => {
          console.log(response)
          setUser(response.data.user);
          setEmail(response.data.email);
          setIsLoading(true);
          navigate('/')
        }).catch(error => {
          toast.error(error.response.data.error)
      })
    }

  return (
    <Wrapper>
      <form className={showSidebar ? 'form' : 'form-move'} onSubmit={handleSubmit}>
        <h3>User Profile</h3>
        <div className='form-center'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            name='username'
            value={state.username}
            className='form-input'
            onChange={usernameChange}
            placeholder={user}
          ></input>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={state.email}
            className='form-input'
            onChange={emailChange}
            placeholder={email}
          ></input>
          
          <button type='submit' className='btn btn-block' >
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default UserProfile;