import React from 'react';
import error from "../assets/images/error.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    margin: 2rem 0;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #627d98;
  }
  a {
    color: #3b82f6;
    text-decoration: underline;
    text-transform: capitalize;
  }
`


const ErrorPage = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={error} alt='error' />
        <h3>Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
    
  )
}

export default ErrorPage;