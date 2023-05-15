import React, { useContext, useReducer }from 'react';
import styled from 'styled-components';
import { SharedLayoutContext } from './SharedLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';



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
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 75vw;
    transition: 0.3s ease-in-out all;
    /* width: 100%; */
  }
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
    case 'SET_PROJECT_LIST':
      return {
        ...state,
        projectList: action.payload,
      };
    case 'SET_ASSIGN_PROJECT':
      return {
        ...state,
        assignProject: action.payload,
      };
    case 'SET_ASSIGN_USERS':
      return {
        ...state,
        assignUsers: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const Admin = () => {
  const {projects} = useContext(AppContext);


  const assignProject = ['Manager', 'Project Manager', 'User'];
  const projectList = projects;
  const userList = ['John Smith', 'Mary Jones', 'Alex Lee'];
  const { showSidebar } = useContext(SharedLayoutContext);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    projectList: '',
    assignProject: '',
    assignUsers: '',
  });


  const listChange = (event) => {
    dispatch({ type: 'SET_PROJECT_LIST', payload: event.target.value });
  };

  const projectChange = (event) => {
    dispatch({ type: 'SET_ASSIGN_PROJECT', payload: event.target.value });
  };

  const userChange = (event) => {
    dispatch({ type: 'SET_ASSIGN_USERS', payload: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    toast.success('Save Changes');
    setTimeout(() => {
      navigate('/');
    }, 600);
  };


  return (
    <Wrapper>
      <form className={showSidebar ? 'form' : 'form-move'} onSubmit={submitHandler}
        >    
          <h3>Admin Page</h3>
          <p>Manage Users</p>
          <div className='form-center'>
            <div className='form-label'>Project List</div>
            <select
              className='form-select'
              value={state.projectList}
              onChange={listChange}
            >
              {projectList.map((project, index) => (
                <option key={index} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
            <div className='form-label'>Assign Project</div>
            <select
              className='form-select'
              value={state.assignProject}
              onChange={projectChange}
            >
              {assignProject.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
            <div className='form-label'>Assign Users</div>
            <select
              className='form-select'
              value={state.assignUsers}
              onChange={userChange}
            >
              {userList.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          <button type='submit' className='btn btn-block'>
            Save
          </button>
          </div>
      </form>
    </Wrapper>
  )
}

export default Admin;