import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  max-width: 80vw;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }   
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80vw;
  }
  .flex-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }  
  hr{
    color: #f0f4f8;
  }
  span{
    text-decoration: underline;
    color: blue;
  }
  span:hover {
  color: #E21818;
  cursor: pointer;
  }
  .grid-item{
    margin-top: 3rem;
  }
  th, td{
    padding: 0 3rem;
  }
  .more-details {
  display: inline-block;
  margin-top: 18px;
  text-decoration: underline;
  color: blue;
  }
  .more-details:hover {
    color: #E21818;
    cursor: pointer;
  }
  @media only screen and (max-width: 1392px){
    .grid {
    display: flex;
    flex-direction: column;
    }
    .margin-top{
      margin-top: 4rem;
    }   
  } 
`
const ProjectDetails = () => {
  const {projects, tickets} = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const [users, setUsers] = useState([]);
  
  const handleDetail = (e) => {
    e.preventDefault();
    navigate('/projects');
  };
  const token = localStorage.getItem('token'); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/users', config ).then( response =>{
      setUsers(response.data.users);
        console.log(response)
    });
  }, []);

  const filteredProjects = projects.filter(project => project._id === id);
  const project = filteredProjects.length > 0 ? filteredProjects[0] : null;
  
  const projectTickets = tickets.filter(ticket => ticket.fromProject === project._id);
   
  const projectUsers = users.filter(user => user.username === project.username )

  const handleDetailTickets = (id) => {
    navigate(`/ticketdetails/${id}`);
  }

  return (
    <Wrapper>
        <h3>Project Details</h3>
        <span onClick={handleDetail}>Back to list</span>
        <section className='grid-item'>
          {projects.filter(project => project._id === (id)).map(project => (
            <div className='grid'>
              <div className='flex-column' key={project._id}>
                  <h4>Project Name</h4>
                  <p>{project.projectName}</p>
              </div>
              <div className='flex-column' key={project.projectName}>
                  <h4>Description</h4>
                  <p>{project.description}</p>
              </div>  
            </div>
          ))}
        </section>
        <hr></hr>
        <section className='grid grid-item'>
          <div className='flex-item'>
            <h3>Project Team</h3>
            <p>Current users on this project</p>
             <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {projectUsers.map((project, index) => (
                    <tr key={index}>
                      <td>{project.username}</td>
                      <td>{project.role}</td>                      
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          <div className='flex-item margin-top'>
            <h3>Tickets for this project</h3>
            <p>Current ticket details</p>
            <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Submitted by</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {projectTickets.map((ticket, index) =>  (
                    <tr key={index}>
                      <td>{ticket.ticketTitle}</td>
                      <td>{ticket.submittedBy}</td>
                      <td>{ticket.ticketStatus}</td>
                      <td><p className='more-details' onClick={() => handleDetailTickets(ticket._id)}>More Details</p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </section>
    </Wrapper>
  )
}

export default ProjectDetails;
