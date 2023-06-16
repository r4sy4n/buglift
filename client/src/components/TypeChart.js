import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TypeChart = ({tickets}) => {
  const data = [
  { name: 'Bugs/Error', value: tickets.filter(ticket => ticket.ticketType === 'Bugs/Error').length },
  { name: 'Feature Request', value:  tickets.filter(ticket => ticket.ticketType === 'Feature Request').length },
  { name: 'Task', value: tickets.filter(ticket => ticket.ticketType === 'Task').length },
];

  return (
     <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#F9D923" />
      <text x="300" y="30" textAnchor="middle" dominantBaseline="middle">Tickets by Type</text>
    </BarChart>
  );
};

export default TypeChart;