import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, Register, ErrorPage, ProtectedRoute } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dashboard, Tickets, Projects, CreateProject, CreateTicket, EditTicket, SharedLayout, UserProfile, Admin, ProjectDetails, TicketDetails, EditProject} from './pages/dashboard/';
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const AppContext = createContext(); 

function App() {
  const [tickets, setTickets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const id = localStorage.getItem('id'); 
  const currentUser = users.filter(user => user._id === id );

  useEffect(() => {
    axios.get( 'https://buglift-app.onrender.com/api/v1/projects' ).then( response => {
      setProjects(response.data.projects)
    })
  }, []);
  
  useEffect(() => {
    axios.get( 'https://buglift-app.onrender.com/api/v1/tickets' ).then( response => {
      setTickets(response.data.tickets)
    })
  }, []);

  const token = localStorage.getItem('token'); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get( 'https://buglift-app.onrender.com/api/v1/users', config ).then( response =>{
      setUsers(response.data.users)
    });
  }, []);

  return (
    <AppContext.Provider value={{projects, setProjects, tickets, setTickets, currentUser}}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
            }>
              <Route index element={<Dashboard/>}/>
              <Route path='tickets' element={<Tickets/>}/>
              <Route path='projects' element={<Projects/>}/>
              <Route path='createproject' element={<CreateProject/>}/>
              <Route path='createticket' element={<CreateTicket/>}/>
              <Route path='editticket/:id' element={<EditTicket/>}/>
              <Route path='editproject/:id' element={<EditProject/>}/>
              <Route path='projectdetails/:id' element={<ProjectDetails/>}/>
              <Route path='ticketdetails/:id' element={<TicketDetails/>}/>
              <Route path='userprofile' element={<UserProfile/>}/>
              <Route path='admin' element={<Admin/>}/>
            </Route>          
          <Route path='landing' element={<LandingPage />}/>
          <Route path='register' element={<Register />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
        <ToastContainer position='top-center' autoClose='3000'/>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
