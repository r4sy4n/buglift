import React from 'react';
import {Banner , Logo} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.main`
  nav {
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
    height: 6rem;
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
  }
  span {
      color: #E21818;
    }
  p {
    color: #486581;
  }
  .main-img {
    display: none;
  }
  @media only screen and (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  `

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Banner/>
      </nav>
      <div className='container page'>
        <div>
          <h1>Bug <span>Tracker</span> App</h1>
          <p>BugLift is an <span>online</span> bug tracker and issue tracking app that helps you to track and fix bugs quickly. It is also a <span>collection</span> of tickets for projects regarding the issues/bugs or future requests in your software <span>development</span> project.</p>
          <Link to='/register' className='btn btn-hero'>Login/Register</Link>
        </div>
          <Logo />
      </div>
    </Wrapper>
  )
}

export default LandingPage;