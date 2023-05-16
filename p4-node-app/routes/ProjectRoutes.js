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


module.exports = router;