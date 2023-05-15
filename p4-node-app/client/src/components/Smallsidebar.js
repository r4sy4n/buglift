import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { SharedLayoutContext } from '../pages/dashboard/SharedLayout';
import { FaTimes } from 'react-icons/fa';
import Banner from './Banner';
import Navlinks from './Navlinks';


const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: 0.3s ease-in-out all;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: #fff;
    width: 90vw;
    height: 95vh;
    border-radius: 0.25rem;
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: #842029;
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: #627d98;
    padding: 1rem 0;
    text-transform: capitalize;
    transition: 0.3s ease-in-out all;
  }
  .nav-link:hover {
    color: #102a43;
  }
  .nav-link:hover .icon {
    color: #842029;
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: 0.3s ease-in-out all;
  }
  .active {
    color: #334e68;
  }
  .active .icon {
    color: #E21818;
  }
@media only screen and (min-width: 992px) {
  display: none;
}
`


const Smallsidebar = () => {
  const {showSidebar, setShowsidebar} = useContext(SharedLayoutContext);

  const toggle = () => {
      setShowsidebar(!showSidebar)
  };

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Banner />
          </header>
          <Navlinks toggle={toggle}/>
        </div>
      </div>
    </Wrapper>
)}

export default Smallsidebar;