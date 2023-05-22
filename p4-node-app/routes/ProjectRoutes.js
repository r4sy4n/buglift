const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel');


//Projects Endpoint
//GET Endpoint to get all projects
router.get('/projects', ( request, response ) => {
    Project.find().then( project => {
        response.status( 200 ).send({ projects: project });
    });
});

//GET Endpoint to get specific project
router.get('/projects/:projectid', ( request, response ) => {
    Project.findOne({ _id: request.params.projectid }).then( dbResponse => {
        if( dbResponse ){
            response.status( 200 ).send({ dbResponse });
        }else{
            response.status( 404 ).send({ error: 'No project found' });
        };
    }).catch( (e) => {
            response.status( 404 ).send({ error: e.message });
    });
});

//POST Endpoint to create project
router.post('/projects', ( request, response ) => {
    Project.find({ projectName: request.body.projectName }).then(dbResponse => {
        if( dbResponse.length > 0 ){
            //  db has record of response
            response.status( 400 ).send({ error: 'Please use unique project name' });
        }else{
                const newProject = new Project({ projectName: request.body.projectName, description: request.body.description, username: request.body.username });
                newProject.save().then( dbResponse => {
                    response.status( 201 ).send({ dbResponse, message: 'Project Created' });
                });
        }
    })
});

//PUT Endpoint to edit project
router.put('/projects/:projectid', ( request, response ) => {
    Project.findByIdAndUpdate( request.params.projectid, request.body, { new: true } ).then( dbResponse => {;
        response.status( 200 ).send({ dbResponse });
    });
});

module.exports = router;