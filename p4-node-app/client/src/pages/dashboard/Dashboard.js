import React, { useContext } from 'react';
import styled from 'styled-components'
import { BarChartData, ProjectStats, TicketStats, PriorityChart, TypeChart, StatusChart } from '../../components';
import { SharedLayoutContext } from './SharedLayout';
import { AppContext } from '../../App';

const Wrapper = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  min-width: 80vw;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
 .grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  margin-bottom: 4rem;
 }
 .flex{
  display: flex;
  flex-direction: column;
 }
 .grid-chart{
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  margin-top: 4rem;
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
.form-move{
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  width: 90vw;
  background: #fff;  
  transition: 0.3s ease-in-out all;
}
@media only screen and (max-width: 1392px) {
  .grid-chart{
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    align-items: center;
    justify-content: center;
  }
}
`

const Dashboard = () => {
  const { showSidebar } = useContext(SharedLayoutContext);
  const {tickets} = useContext(AppContext);
  const {projects} = useContext(AppContext);
  

  return (
    <Wrapper>
      <div className={showSidebar ? 'form' : 'form-move'}>
      <section className='flex'>
        <div className='grid'>
          <ProjectStats projects={projects}/>
          <TicketStats tickets={tickets}/>
        </div>
      </section>
      <section>
        <div className='grid-chart'>
          <BarChartData tickets={tickets} projects={projects}/>
          <TypeChart tickets={tickets}/>
          <PriorityChart tickets={tickets}/>
          <StatusChart tickets={tickets}/>
        </div>
      </section>
      </div>
    </Wrapper>
  );
};

export default Dashboard;