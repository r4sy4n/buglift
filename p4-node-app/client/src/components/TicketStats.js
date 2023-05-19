import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.section`
    padding: 2rem;
    background:#fff;
    border-radius: 0.25rem;
    text-align: center;
    border: 2px solid #5D3891;
`

const TicketStats = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/tickets' ).then( response => {
      console.log(response)
      setTickets(response.data.tickets)
    })
  }, []);

  return (
    <Wrapper>
        <h1>{tickets.length}</h1>
        <h3>Active Tickets</h3>
    </Wrapper>
  )
}

export default TicketStats;