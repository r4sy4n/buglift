const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const verify = require('../middlewares/auth');

//Users Endpoint
//GET Endpoint to get all users
router.get('/users', verify, ( request, response ) => {
    User.find().then( user => {
        response.status( 200 ).send({ users: user })
    });
});

//GET Endpoint to get specific user
router.get('/users/:userid', verify, ( request, response ) => {
    User.findOne({ _id: request.params.userid }, { password: 0 }).then( dbResponse => {
        if( dbResponse ){
            response.status( 200 ).send({ user: dbResponse.username });
        }else{
            response.status( 404 ).send({ error: 'No user found' });
        };
    }).catch( (e) => {
            response.status( 404 ).send({ error: e.message });
    })
})


module.exports = router;