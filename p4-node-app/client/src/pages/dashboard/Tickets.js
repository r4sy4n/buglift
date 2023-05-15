import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SharedLayoutContext } from './SharedLayout';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../App";


const Wrapper = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); 
.project-table {
  max-width: 90vw;
  margin: 0 auto;
  padding: 20px;
}
.table {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 75vw;
  transition: 0.3s ease-in-out all;
  width: 90vw;
  background: #fff;
}
.table-move {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  width: 90vw;
  background: #fff;  
  transition: 0.3s ease-in-out all;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 3rem;
}
tr:hover {
  background: #f0f4f8;
  color: #102a43;
}
th, td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: #ddd;
}
p {
  display: inline-block;
  margin-top: 18px;
  text-decoration: underline;
  color: blue;
}
p:hover {
  color: #E21818;
  cursor: pointer;
}
.sort-container{
  margin-top: 3rem;
}
.drop-select {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    background: #f0f4f8;
    border: 1px solid #bcccdc;
}
.badge {
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  text-align: center;
  margin: 0.3rem;
  border-radius: 5px;
  color: #fff;
}
.danger{
  background: #FF1700;
}
.warning{
  background: #F77E21;
}
.success{
  background: #367E18;
}
.completed{
  background: #07689F;
}.in-progress{
  background: #40A8C4;
}.open{
  background: #EBB02D;
}
.task{
  background: #B206B0;
}
.feature{
  background: #6F1AB6;
}
.bugs{
  background: #CD0404;
}
`

const Tickets = () => {
  const {showSidebar} = useContext(SharedLayoutContext);
  const navigate = useNavigate();
  const {tickets} = useContext(AppContext);

  const clickHandle = (e) => {
    e.preventDefault();
    navigate('/createticket');   
  }
  const handleDetail = (id) => {
    navigate(`/ticketdetails/${id}`);
  }
  const [sortOption, setSortOption] = useState('All');
  
  const filteredTickets = tickets.filter(ticket => {
     if (sortOption === 'All') {
      return true;
    } else {
      return ticket.ticketStatus === sortOption;
    }
  });
  
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
    
  }
  const priorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="badge danger">{priority}</span>;
      case 'Medium':
        return <span className="badge warning">{priority}</span>;
      case 'Low':
        return <span className="badge success">{priority}</span>;
      default:
        return null;
    }
  };
  const statusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="badge completed">{status}</span>;
      case 'In Progress':
        return <span className="badge in-progress">{status}</span>;
      case 'Open':
        return <span className="badge open">{status}</span>;
      default:
        return null;
    }
  };
  const typeBadge = (type) => {
    switch (type) {
      case 'Bugs/Error':
        return <span className="badge bugs">{type}</span>;
      case 'Feature Request':
        return <span className="badge feature">{type}</span>;
      case 'Task':
        return <span className="badge task">{type}</span>;
      default:
        return null;
    }
  };
  return (    
      <Wrapper>
        <form className={showSidebar ? 'table' : 'table-move'}>
          <button type='button' className='btn btn-block' onClick={clickHandle}>Create New Ticket</button>
            <div className="project-table form-center">
              <h3>Ticket List</h3>
              <span>All the tickets you have</span>
               <div className="sort-container">
                <label htmlFor="sortOption" className='form-label'>Sort By Status</label>
                <select id="sortOption" value={sortOption} className='drop-select' onChange={handleSortOptionChange}>
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>From Project</th>
                    <th>Submitted by</th>
                    <th>Ticket Type</th>
                    <th>Ticket Status</th>
                    <th>Ticket Priority</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td>{ticket.title}</td>
                      <td>{ticket.project}</td>
                      <td>{ticket.submittedBy}</td>
                      <td>{typeBadge(ticket.ticketType)}</td>
                      <td>{statusBadge(ticket.ticketStatus)}</td>
                      <td>{priorityBadge(ticket.ticketPriority)}</td>
                      <td><p onClick={() => handleDetail(ticket.id)}>More Details</p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </form>
      </Wrapper>    
  )
}

export default Tickets;