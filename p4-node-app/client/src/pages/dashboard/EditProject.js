import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SharedLayoutContext } from './SharedLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from 'axios';

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

const EditProject = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [ projects, setProjects ] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const { showSidebar } = useContext(SharedLayoutContext);
  
  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/projects' ).then( response => {
      setProjects(response.data.projects)
    })
  }, []);
  useEffect(() => {
    const selected = projects.find(project => project._id === id);
    if (selected) {
      setSelectedProject(selected);
      setProjectId(selected._id);
      setProjectName(selected.projectName);
      setDescription(selected.description);
      setIsLoading(false);
    }
  }, [projects, id]);

  const nameChange = (event) => {
        setProjectName(event.target.value);
  };

  const descriptionChange = (event) => {
        setDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!projectName || !description) {
      toast.error('All fields are required!');
    }
    if (projectName || description) {
      axios.put( `http://localhost:8000/api/v1/projects/${projectId}`, { 
          "projectName": projectName, 
          "description": description, 
        } ).then( response => {
            console.log(response)
          toast.success(response.data.message);
        setTimeout(() => {
          navigate('/projects');
        }, 600);
      }).catch(error => {
      })
    }
  }

  if (isLoading) {
    return <Loading center />;
    }

  return (
    <Wrapper>
      <form
        className={showSidebar ? 'form' : 'form-move'}
        onSubmit={submitHandler}
      >
        <h3>Edit Project</h3>
        <div className='form-center'>
          <label htmlFor='project-name' className='form-label'>
            Project Name
          </label>
          <input
            type='text'
            id='project-name'
            value={projectName}
            className='form-input'
            onChange={nameChange}
          ></input>
          <label htmlFor='project-description' className='form-label'>
            Project Description
          </label>
          <input
            type='text'
            id='project-description'
            value={description}
            className='form-input'
            onChange={descriptionChange}
          ></input>
          <button type='submit' className='btn btn-block'>
            Save Changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditProject;