const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Project = require('../models/ProjectModel');
const Ticket = require('../models/TicketModel');

//Users Endpoint
//GET Endpoint to get all users
router.get('/users', ( request, response ) => {
    User.find().then( user => {
        response.status( 200 ).send({ users: user })
    });
})
//POST Endpoint to create user
router.post('/users', ( request, response ) => {
    const newUser = new User();
    newUser.username = request.body.username;
    newUser.email = request.body.email;
    newUser.password = request.body.password;
    newUser.role = request.body.role;

    newUser.save().then( dbResponse => {
        response.status( 201 ).send({ dbResponse })
        console.log( dbResponse );
    });
});


//Projects Endpoint
//GET Endpoint to get all projects
router.get('/projects', ( request, response ) => {
    Project.find().then( project => {
        response.status( 200 ).send({ projects: project })
    });
})

//Tickets Endpoint
//GET Endpoint to get all projects
router.get('/tickets', ( request, response ) => {
    Ticket.find().then( ticket => {
        response.status( 200 ).send({ tickets: ticket })
    });
})


module.exports = router;