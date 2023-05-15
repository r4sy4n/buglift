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
    case 'SET_NAME_VALUES':
      return { ...state, nameValues: action.payload };
    case 'SET_TYPE_VALUES':
      return { ...state, typeValues: action.payload };
    case 'SET_PRIORITY_VALUES':
      return { ...state, priorityValues: action.payload };
    case 'SET_STATUS_VALUES':
      return { ...state, statusValues: action.payload };
    case 'SET_TICKET_TITLE':
      return { ...state, ticketTitle: action.payload };
    case 'SET_TICKET_DESCRIPTION':
      return { ...state, ticketDescription: action.payload };
    case 'SET_SUBMITTED_BY':
      return { ...state, submittedBy: action.payload };
    default:
      throw new Error();
  }
};

const CreateTicket = () => {
  const {showSidebar} = useContext(SharedLayoutContext);
  const {tickets, setTickets} = useContext(AppContext);
  const {projects} = useContext(AppContext);
  
  const navigate = useNavigate();
 
  const initialState = {
    projectName: projects,
    ticketType: ['Bugs/Error', 'Feature Request', 'Task'],
    ticketPriority: ['Low', 'Medium', 'High'],
    ticketStatus: ['Open'],
    nameValues: 'Project A',
    typeValues: 'Bugs/Error',
    priorityValues: 'High',
    statusValues: 'Open',
    ticketTitle: '',
    ticketDescription: '',
    submittedBy: 'Admin',
  };
  // const {id} = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    dispatch({ type: 'SET_NAME_VALUES', payload: event.target.value });
  };

  const ticketChange = (event) => {
    dispatch({ type: 'SET_TICKET_TITLE', payload: event.target.value });
  };

  const descriptionChange = (event) => {
    dispatch({ type: 'SET_TICKET_DESCRIPTION', payload: event.target.value });
  };

  const submittedByChange = (event) => {
    dispatch({ type: 'SET_SUBMITTED_BY', payload: event.target.value });
  };

  const typeChange = (event) => {
    dispatch({ type: 'SET_TYPE_VALUES', payload: event.target.value });
  };

  const priorityChange = (event) => {
    dispatch({ type: 'SET_PRIORITY_VALUES', payload: event.target.value });
  };

  const statusChange = (event) => {
    dispatch({ type: 'SET_STATUS_VALUES', payload: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!state.ticketTitle || !state.ticketDescription || !state.submittedBy) {
      toast.error('All fields are required!');
    }
    if (state.ticketTitle && state.ticketDescription && state.submittedBy) {
      addTicket();
      toast.success('Ticket Created');
      setTimeout(() => {
        navigate('/tickets');
      }, 600);
    }
  };
  
  const addTicket = () => {
    let newEntry = {
      id: uuidv4(),
      title: state.ticketTitle,
      project: state.nameValues,
      submittedBy: state.submittedBy,
      ticketDescription: state.ticketDescription,
      ticketType: state.typeValues,
      ticketPriority: state.priorityValues,
      ticketStatus: state.statusValues,
      Details: '',
    }
    setTickets ([
      ...tickets,
        newEntry
    ]);
  };

  return (
    <Wrapper> 
      <form className={showSidebar ? 'form' : 'form-move'} onSubmit={submitHandler}>
        <h3>Create New Ticket</h3>
        <div className='form-center'>
          <div>
            <div className='form-label'>Project Name</div>
              <select className='form-select' value={state.nameValues} onChange={handleChange}>
                {
                  state.projectName.map((project, index) =><option key={index} value={project.name}>{project.name}</option>)
                }        
              </select>
          </div>
          <label htmlFor='ticket-title' className='form-label'>Ticket Title</label>
          <input 
            type='text' 
            id='ticket-title' 
            value={state.ticketTitle}  
            className='form-input'
            onChange={ ticketChange }></input>
          <label htmlFor='ticket-description' className='form-label'>Description</label>
          <textarea 
            type='text' 
            id='ticket-description' 
            value={state.ticketDescription} 
            className='form-textarea'
            onChange={descriptionChange}></textarea>
          <div>
            <div className='form-label'>Ticket Type</div>
            <select className='form-select' value={state.typeValues} onChange={typeChange}>
              {
                state.ticketType.map((type, index) =><option key={index} value={type}>{type}</option>)
              }        
            </select>
          </div>
          <div>
            <div className='form-label'>Ticket Priority</div>
            <select className='form-select' value={state.priorityValues} onChange={priorityChange}>
              {
                state.ticketPriority.map((priority, index) =><option key={index} value={priority}>{priority}</option>)
              }        
            </select>
          </div>
          <div>
            <div className='form-label'>Ticket Status</div>
            <select className='form-select' value={state.statusValues} onChange={statusChange}>
              {
                state.ticketStatus.map((status, index) =><option key={index} value={status}>{status}</option>)
              }        
            </select>
          </div>
          <label htmlFor='submitted-by' className='form-label'>Submitted by</label>
          <input 
            type='text' 
            id='submitted-by' 
            value={state.submittedBy}  
            className='form-input'
            onChange={ submittedByChange } disabled></input>
          <button type='submit' className='btn btn-block'>Create Ticket</button>  
        </div>
      </form>
    </Wrapper>
  )
}

export default CreateTicket;