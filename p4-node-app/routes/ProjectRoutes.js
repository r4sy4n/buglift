const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');


//Projects Endpoint
//GET Endpoint to get all projects
router.get('/projects', ( request, response ) => {
    Project.find().then( project => {
        response.status( 200 ).send({ projects: project })
    });
});

//POST Endpoint to create project
router.post('/projects', ( request, response ) => {
    Project.find({ projectName: request.body.projectName }).then(dbResponse => {
        if( dbResponse.length > 0 ){
            //  db has record of response
            response.status( 400 ).send({ error: 'Please use unique project name' });
        }else{
                const newUser = new Project({ projectName: request.body.projectName, description: request.body.description });
                newUser.save().then( dbResponse => {
                    response.status( 201 ).send({ dbResponse });
                });
        };
    })
});


module.exports = router;