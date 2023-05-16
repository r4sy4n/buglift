const express = require('express');
const router = express.Router();
const Ticket = require('../models/TicketModel');


//Tickets Endpoint
//GET Endpoint to get all projects
router.get('/tickets', ( request, response ) => {
    Ticket.find().then( ticket => {
        response.status( 200 ).send({ tickets: ticket })
    });
})


module.exports = router;