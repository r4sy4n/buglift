import { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { SharedLayoutContext } from './SharedLayout';

const Wrapper = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  min-width: 80vw;
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
    width: 85vw;
  }
  .flex-item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .form {
    margin: 0 0 1rem;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    transition: 0.3s ease-in-out all;
    /* width: 100%; */
  }
  hr{
    color: #f0f4f8;
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
  button{
    margin: 1rem 0;
    padding: 0 3rem;
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
span{
  text-decoration: underline;
  color: blue;
}
span:hover {
  color: #E21818;
  cursor: pointer;
}
`
const TicketDetails = () => {
  const {tickets} = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams(); 
  const [comment, setComment] = useState('');
  const [commenter, setCommenter] = useState('');
  const [comments, setComments] = useState([]);
  const {showSidebar} = useContext(SharedLayoutContext);

  const handleDetail = (e) => {
    e.preventDefault();
    navigate('/tickets');
  }
  const handleEdit = (id) => {
    navigate(`/editticket/${id}`);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      text: comment,
      commenter: commenter,
      date: new Date().toLocaleString()
    };
    setComments([...comments, newComment]);
    setComment('');
    setCommenter('');
  };
  const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
  // const handleCommenterChange = (event) => {
  //   setCommenter(event.target.value);
  // };
  

  return (
    <Wrapper>
        <div className={showSidebar ? 'table' : 'table-move'}>
        <h3>Ticket Details</h3>
        <p onClick={handleDetail}><span>Back to list</span></p>
        {tickets.filter(ticket => ticket.id === (id)).map((ticket, index) => (
        <p key={index} onClick={() => handleEdit(ticket.id)}><span>Edit Ticket</span></p>))}
        <section className='grid-item'>
          {tickets.filter(ticket => ticket.id === (id)).map(ticket => (
            <div className='grid'>
              <div key={ticket.id} className='flex-item'>
                  <h4>Ticket Title</h4>
                  <p>{ticket.title}</p>
                  <h4>Ticket Description</h4>
                  <p>{ticket.ticketDescription}</p>
                  <h4>Project</h4>
                  <p>{ticket.project}</p>
                  <h4>Submitted by</h4>
                  <p>{ticket.submittedBy}</p>
              </div> 
              <div key={ticket.id} className='flex-item'>
                  <h4>Ticket Type</h4>
                  <p>{ticket.ticketType}</p>
                  <h4>Ticket Priority</h4>
                  <p>{ticket.ticketPriority}</p>
                  <h4>Ticket Status</h4>
                  <p>{ticket.ticketStatus}</p>
              </div> 
            </div>
          ))}
        </section>
        <hr></hr>
        <section className='grid grid-item'>
          {/* <div className='flex-item'>
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
                  {tickets.map((ticket, index) => (
                    <tr>
                      <td>Russell</td>
                      <td>Demo Admin</td>                      
                    </tr>
                  ))}
                </tbody>
              </table>
          </div> */}
          <div className='flex-item'>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Add a Comment?</h3>
                <textarea
                    type='text' 
                    id='ticket-comment' 
                    value={comment}
                    className='form-textarea'
                    onChange={handleCommentChange} required
                    ></textarea>
                {/* <label htmlFor="commenter" className='form-label'>Commenter: </label>
                <input type="text" id="commenter" value={commenter} className='form-input' onChange={handleCommenterChange} required /> */}
                <button type='submit' className='btn btn-block' >Add</button>
            </form>
                <h3>Messages</h3>
            <table>
                <thead>
                  <tr>
                    {/* <th>Commenter</th> */}
                    <th>Message</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => (
                        <tr key={index}>
                        {/* <td>{comment.commenter}</td> */}
                        <td>{comment.text}</td>
                        <td>{comment.date}</td>
                        </tr>
                     ))}
                </tbody>
              </table>
          </div>
        </section>
        </div>
    </Wrapper>
  )
}

export default TicketDetails;