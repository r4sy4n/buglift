import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartData = ({tickets, projects}) => {
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