import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    padding: 2rem;
    background:#fff;
    border-radius: 0.25rem;
    text-align: center;
    border: 2px solid #F99417;
`

const ProjectStats = ({projects}) => {
  return (
    <Wrapper>
        <h1>{projects.length}</h1>
        <h3>Active Projects</h3>
    </Wrapper>
  )
}

export default ProjectStats;