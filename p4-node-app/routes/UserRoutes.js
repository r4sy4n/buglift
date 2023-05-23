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
            response.status( 200 ).send({ user: dbResponse.username, email: dbResponse.email });
        }else{
            response.status( 404 ).send({ error: 'No user found' });
        };
    }).catch( (e) => {
            response.status( 404 ).send({ error: e.message });
    })
});

//PUT Endpoint to user role
router.put('/users/:userid', (request, response) => {
  const { username, email } = request.body;

  User.findById(request.params.userid)
    .then(dbResponse => {

      const { username: originalUsername, email: originalEmail } = dbResponse;

      User.findByIdAndUpdate(request.params.userid, { username, email }, { new: true })
        .then(updatedUser => {
          const { username: updatedUsername, email: updatedEmail } = updatedUser;

          if (username === originalUsername && email === originalEmail) {
            console.log('Fields unchanged');
            return response.status( 400 ).send({ error: 'Edit Desired Fields' });
          }
          response.status( 200 ).send({
            user: { username: updatedUsername, email: updatedEmail },
            message: 'Update successful!',
            success: true
          });
        })
        .catch(error => {
          console.log(error);
          response.status(500).send({ error: 'Server Error' });
        });
    })
    .catch(error => {
      console.log(error);
      response.status(500).send({ error: 'Server Error' });
    });
});


module.exports = router;