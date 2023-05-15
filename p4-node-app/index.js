const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://russellramiro:08i3Zkj66NWRIaxE@cluster0.rz5gupu.mongodb.net/bugliftdb');
const baseURL = '/api/v1';
const BuglitftRoutes = require('./routes/BugliftRoutes');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

app.use( baseURL, BuglitftRoutes );

app.get( '/', ( request, response ) => {
    response.send({ message: `Express server for p4-node-app`});
});

app.listen( PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});