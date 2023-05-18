const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'BUGLIFT';

const verify = require('../middlewares/auth');

//POST Endpoint to create user
router.post('/register', ( request, response ) => {
    User.find({ $or: [ { username: request.body.username }, { email: request.body.email } ]}).then(dbResponse => {
        if( dbResponse.length > 0 ){
            //  db has record of response
            response.status( 400 ).send({ error: 'Please use unique username or email' });
        }else{
             bcrypt.hash( request.body.password, 10 ).then((hash, err) => {
                const newUser = new User({ username: request.body.username, email: request.body.email,  password: hash });
                newUser.save().then( dbResponse => {
                    response.status( 201 ).send({ dbResponse });
                });
            });
        };
    })
});

//POST Endpoint to login user
router.post('/login', ( request, response ) => {
    User.findOne({ username: request.body.username }).then( dbResponse => {
        if( !dbResponse ){
            console.log('Username does not exist')
            return response.status( 404 ).send({ error: 'Username does not exist' });
        }
        bcrypt.compare( request.body.password, dbResponse.password ).then( isValid => {
            if( !isValid ){
            console.log('wrong')
                response.status( 400 ).send({ error: 'Please enter correct username or password!' });
            }else{
                //create token
                const token = jwt.sign( { id: dbResponse._id, email: dbResponse.email }, SECRET );
                response.status( 200 ).send({ message: 'Login Successful', token: token, role: dbResponse.role });
            };
        });
    });
});


module.exports = router;