import React from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import { useContext } from 'react';
import { SharedLayoutContext } from '../pages/dashboard/SharedLayout';
import Navlinks from './Navlinks';

const Wrapper = styled.aside`
box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
transition: 0.3s ease-in-out all;
  .sidebar-container {
        background: #fff;
        min-height: 100vh;
        height: 100%;
        width: 250px;
        transition: 0.3s ease-in-out all;
        z-index: 1;
    }
  .content {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  header {
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2.5rem;
      z-index: 1;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: 0.3s ease-in-out all;
    }
    .active {
      color: #102a43;
    }
    .active .icon {
      color: #E21818;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #627d98;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      background: #f0f4f8;
      padding-left: 3rem;
      color: #102a43;
    }
    .nav-link:hover .icon {
      color: #E21818;
    }
  @media only screen and (max-width: 992px) {
    display: none;
  }
`
const Sidebar = () => {
      const {showSidebar} = useContext(SharedLayoutContext);

  return (
   <Wrapper className={showSidebar ? null : 'hide'}>
      <div className='sidebar-container'>
        <div className='content'>
          <header>
            <Banner />
          </header>
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar;