import { useState, createContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {Navbar, Sidebar, Smallsidebar} from '../../components/index';
import styled from 'styled-components';
export const SharedLayoutContext = createContext();

const Wrapper = styled.section`
  
    .dashboard {
      display: grid;
      grid-template-columns: 1fr;
    }
    .dashboard-page {
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      top: 6.5rem;
      left: 280px;
      transition: 0.3s ease-in-out all;
    }
    .hide{
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    .move-side{
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      top: 6.5rem;
      left: 30px;
      transition: 0.3s ease-in-out all; 
    }
    @media only screen and (max-width: 992px) {
    .dashboard-page {
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      top: 6.5rem;
      left: 30px;
      transition: 0.3s ease-in-out all;
    }
  }
`

const SharedLayout = () => {
  const [showSidebar, setShowsidebar] = useState(true);
  const isAuthenticated = localStorage.getItem('name'); 
  const navigate = useNavigate();

  useEffect(() => {
  if(!isAuthenticated){ 
    navigate('/landing'); 
    }
  }, []);
  
  return (
    <SharedLayoutContext.Provider value={{showSidebar, setShowsidebar}}>
      <Wrapper>
          <main className='dashboard'>
              <Smallsidebar />
              <Sidebar />
              <div>
                  <Navbar />
                  <div className={showSidebar ? 'dashboard-page' : 'move-side'}>
                      <Outlet />
                  </div>
              </div>
          </main>
      </Wrapper>
    </SharedLayoutContext.Provider>
  )
}

export default SharedLayout;