const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

//Users Endpoint
//GET Endpoint to get all users
router.get('/users', ( request, response ) => {
    User.find().then( user => {
        response.status( 200 ).send({ users: user })
    });
});


module.exports = router;