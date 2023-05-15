import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SharedLayoutContext } from './SharedLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  .cancel-btn {
    cursor: pointer;
    color: #fff;
    background: #334e68;
    border: transparent;
    border-radius: 0.25rem;
    letter-spacing: 1px;
    padding: 0.375rem 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.3s ease-in-out all;
    text-transform: capitalize;
    display: inline-block;
    margin-left: 1rem;
}
`

const EditTicket = () => {
  const {projects} = useContext(AppContext);
  const projectName = projects;
  const ticketType = ['Bugs/Error', 'Feature Request', 'Task'];
  const ticketPriority = ['Low', 'Medium', 'High'];
  const ticketStatus = ['Open', 'In Progress', 'Completed'];
  const {showSidebar} = useContext(SharedLayoutContext);
  const {tickets, setTickets} = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [nameValues, setNameValues] = useState('');
  const [typeValues, setTypeValues] = useState('');
  const [priorityValues, setPriorityValues] = useState('');
  const [statusValues, setStatusValues] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');

  useEffect(() => {
    const selected = tickets.find(ticket => ticket.id === id);
    if (selected) {
      setSelectedTicket(selected);
      setNameValues(selected.project);
      setTypeValues(selected.ticketType);
      setPriorityValues(selected.ticketPriority);
      setStatusValues(selected.ticketStatus);
      setTicketTitle(selected.title);
      setTicketDescription(selected.ticketDescription);
      setSubmittedBy(selected.submittedBy);
    }
  }, [tickets, id]);


  const handleChange = (event) => {
    setNameValues(event.target.value);
  };
  const ticketChange = (event) => {
    setTicketTitle(event.target.value);
  };
  const descriptionChange = (event) => {
    setTicketDescription(event.target.value);
  };
  const submittedByChange = (event) => {
    setSubmittedBy(event.target.value);
  }
  const typeChange = (event) => {
    setTypeValues(event.target.value);
  };
  const priorityChange = (event) => {
    setPriorityValues(event.target.value);
  };
  const statusChange = (event) => {
    setStatusValues(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!ticketTitle || !ticketDescription || !submittedBy) {
      toast.error('All fields are required!');
    }
    if (ticketTitle && ticketDescription && submittedBy) {
      const updatedTicket = {
        ...selectedTicket,
        project: nameValues,
        submittedBy: submittedBy,
        ticketDescription: ticketDescription,
        ticketType: typeValues,
        ticketPriority: priorityValues,
        ticketStatus: statusValues,
        title: ticketTitle
      }
      const updatedTickets = tickets.map(ticket => {
        if (ticket.id === id) {
          return updatedTicket;
        }
        return ticket;
      });
      setTickets(updatedTickets);
      toast.success('Ticket Updated');
      setTimeout(() => {
        navigate(`/ticketdetails/${id}`);
      }, 600);
    }
  }


  const cancelHandler = () => {
    toast.info('Cancel Changes');
      setTimeout(() =>{
        navigate('/tickets');  
      }, 600);
  }

  return (
    <Wrapper> 
      <form className={showSidebar ? 'form' : 'form-move'} onSubmit={submitHandler}>
        <h3>Edit Ticket</h3>
        <div className='form-center'>
          <div>
            <div className='form-label'>Project Name</div>
              <select className='form-select' value={nameValues} onChange={handleChange} disabled>
                {
                  projectName.map((project, index) =><option key={index} value={project.name}>{project.name}</option>)
                }        
              </select>
          </div>
          <label htmlFor='ticket-title' className='form-label'>Ticket Title</label>
          <input 
            type='text' 
            id='ticket-title' 
            value={ticketTitle}  
            className='form-input'
            onChange={ ticketChange }></input>
          <label htmlFor='ticket-description' className='form-label'>Description</label>
          <textarea 
            type='text' 
            id='ticket-description' 
            value={ticketDescription} 
            className='form-textarea'
            onChange={descriptionChange}></textarea>
          <div>
            <div className='form-label'>Ticket Type</div>
            <select className='form-select' value={typeValues} onChange={typeChange}>
              {
                ticketType.map((type, index) =><option key={index} value={type}>{type}</option>)
              }        
            </select>
          </div>
          <div>
            <div className='form-label'>Ticket Priority</div>
            <select className='form-select' value={priorityValues} onChange={priorityChange}>
              {
                ticketPriority.map((priority, index) =><option key={index} value={priority}>{priority}</option>)
              }        
            </select>
          </div>
          <div>
            <div className='form-label'>Ticket Status</div>
            <select className='form-select' value={statusValues} onChange={statusChange}>
              {
                ticketStatus.map((status, index) =><option key={index} value={status}>{status}</option>)
              }        
            </select>
          </div>
          <label htmlFor='submitted-by' className='form-label'>Submitted by</label>
          <input 
            type='text' 
            id='submitted-by' 
            value={submittedBy}  
            className='form-input'
            onChange={ submittedByChange } disabled></input>
          <button type='submit' className='btn btn-block'>Save Changes</button>
          <button type='button' className='cancel-btn btn-block' onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default EditTicket;