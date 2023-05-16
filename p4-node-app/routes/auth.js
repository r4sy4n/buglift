const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');


//POST Endpoint to create user
router.post('/users/register', ( request, response ) => {
    const newUser = new User();
    newUser.username = request.body.username;
    newUser.email = request.body.email;
    newUser.password = request.body.password;
    // newUser.role = request.body.role;

    newUser.save().then( dbResponse => {
        response.status( 201 ).send({ dbResponse })
        console.log( dbResponse );
    });
});


module.exports = router;