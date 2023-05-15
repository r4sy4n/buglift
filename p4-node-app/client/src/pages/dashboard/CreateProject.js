import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { SharedLayoutContext } from './SharedLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../App';
import { v4 as uuidv4 } from 'uuid';

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
    case 'SET_VALUES':
      return {
        ...state,
        values: action.payload,
      };
    case 'SET_PROJECT_NAME':
      return {
        ...state,
        projectName: action.payload,
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const CreateProject = () => {
  const projectUser = ['Manager', 'Project Manager', 'User'];

  const [state, dispatch] = useReducer(reducer, {
    values: 'Manager',
    projectName: '',
    description: '',
  });

  const { showSidebar } = useContext(SharedLayoutContext);
  const { projects, setProjects } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    dispatch({ type: 'SET_VALUES', payload: event.target.value });
  };

  const nameChange = (event) => {
    dispatch({ type: 'SET_PROJECT_NAME', payload: event.target.value });
  };

  const descriptionChange = (event) => {
    dispatch({ type: 'SET_DESCRIPTION', payload: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!state.projectName || !state.description) {
      toast.error('All fields are required!');
    } else {
      addProject();
      toast.success('Project Created');
      setTimeout(() => {
        navigate('/projects');
      }, 600);
    }
  };

  const addProject = () => {
    let newEntry = {
      id: uuidv4(),
      name: state.projectName,
      description: state.description,
    };
    setProjects([...projects, newEntry]);
  };

  return (
    <Wrapper>
      <form
        className={showSidebar ? 'form' : 'form-move'}
        onSubmit={submitHandler}
      >
        <h3>Create New Project</h3>
        <div className='form-center'>
          <label htmlFor='project-name' className='form-label'>
            Project Name
          </label>
          <input
            type='text'
            id='project-name'
            value={state.projectName}
            className='form-input'
            onChange={nameChange}
          ></input>
          <label htmlFor='project-description' className='form-label'>
            Project Description
          </label>
          <input
            type='text'
            id='project-description'
            value={state.description}
            className='form-input'
            onChange={descriptionChange}
          ></input>
          <div>
            <div className='form-label'>Assign Project</div>
            <select
              className='form-select'
              value={state.values}
              onChange={handleChange}
            >
              {projectUser.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
          <button type='submit' className='btn btn-block'>
            Create Project
          </button>
        </div>
      </form>
    </Wrapper>
  );
};



export default CreateProject;