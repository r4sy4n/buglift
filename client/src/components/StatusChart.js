import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatusChart = ({tickets}) => {
  const data = [
  { name: 'Open', value: tickets.filter(ticket => ticket.ticketStatus === 'Open').length },
  { name: 'In Progress', value: tickets.filter(ticket => ticket.ticketStatus === 'In Progress').length },
  { name: 'Completed', value: tickets.filter(ticket => ticket.ticketStatus === 'Completed').length },
];

  return (
     <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#36AE7C" />
      <text x="300" y="30" textAnchor="middle" dominantBaseline="middle">Tickets by Status</text>
    </BarChart>
  );
};

export default StatusChart;