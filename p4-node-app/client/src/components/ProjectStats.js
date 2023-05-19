import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapper = styled.section`
    padding: 2rem;
    background:#fff;
    border-radius: 0.25rem;
    text-align: center;
    border: 2px solid #F99417;
`

const ProjectStats = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/projects' ).then( response => {
      setProjects(response.data.projects)
    })
  }, [])

  return (
    <Wrapper>
        <h1>{projects.length}</h1>
        <h3>Active Projects</h3>
    </Wrapper>
  )
}

export default ProjectStats;