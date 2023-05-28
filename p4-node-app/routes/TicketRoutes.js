const express = require('express');
const router = express.Router();
const Ticket = require('../models/TicketModel');


//Tickets Endpoint
//GET Endpoint to get all projects
router.get('/tickets', ( request, response ) => {
    Ticket.find().then( ticket => {
        response.status( 200 ).send({ tickets: ticket })
    });
});

//GET Endpoint to get specific ticket
router.get('/tickets/:ticketid', ( request, response ) => {
    Ticket.findOne({ _id: request.params.ticketid }).then( dbResponse => {
        if( dbResponse ){
            response.status( 200 ).send({ tickets: dbResponse });
        }else{
            response.status( 404 ).send({ error: 'No ticket found' });
        };
    }).catch( (e) => {
            response.status( 404 ).send({ error: e.message });
    });
});

//POST Endpoint to create ticket
router.post('/tickets', ( request, response ) => {
    Ticket.find( {ticketTitle: request.body.ticketTitle} ).then(dbResponse => {
        if( dbResponse.length > 0 ){
            //  db has record of response
            response.status( 400 ).send({ error: 'Please use unique ticket title' });
        }else{
                const newTicket = new Ticket({ ticketTitle: request.body.ticketTitle, fromProject: request.body.fromProject, ticketDescription: request.body.ticketDescription, ticketPriority: request.body.ticketPriority, ticketType: request.body.ticketType, submittedBy: request.body.submittedBy });
                newTicket.save().then( dbResponse => {
                    response.status( 201 ).send({ dbResponse, message: 'Ticket Created' });
                });
        };
    });
});

//PUT Endpoint to edit ticket
router.put('/tickets/:ticketid', ( request, response ) => {
    Ticket.findByIdAndUpdate( request.params.ticketid, request.body, { new: true } ).then( dbResponse => {
        response.status( 200 ).send({ tickets: dbResponse, message: 'Changes Saved' });
    });
});


module.exports = router;