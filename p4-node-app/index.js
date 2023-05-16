const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');

mongoose.connect('mongodb+srv://russellramiro:08i3Zkj66NWRIaxE@cluster0.rz5gupu.mongodb.net/bugliftdb');
const baseURL = '/api/v1';
const UserRoutes = require('./routes/UserRoutes');
const ProjectRoutes = require('./routes/ProjectRoutes');
const TicketRoutes = require('./routes/TicketRoutes');
const authRoutes = require('./routes/auth');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );
app.use( morgan('dev') );
app.use( helmet() );

app.use( baseURL, UserRoutes );
app.use( baseURL, ProjectRoutes );
app.use( baseURL, TicketRoutes );
app.use( `${baseURL}/auth`, authRoutes );

app.get( '/', ( request, response ) => {
    response.send({ message: `Express server for p4-node-app`});
});

app.listen( PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});