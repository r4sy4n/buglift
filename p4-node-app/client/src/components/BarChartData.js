import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const BarChartData = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/tickets' ).then( response => {
      console.log(response)
      setTickets(response.data.tickets)
    })
  }, [])
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get( 'http://localhost:8000/api/v1/projects' ).then( response => {
      setProjects(response.data.projects)
    })
  }, [])
  const data = [
  { name: 'Projects', value: projects.filter(project => project).length },
  { name: 'Tickets', value: tickets.filter(ticket => ticket).length },
];

  return (
    <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#187498" />
        <text x="300" y="30" textAnchor="middle" dominantBaseline="middle">Total Projects and Tickets</text>
      </BarChart>
  );
  }
  export default BarChartData;