const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: "String",
    email: "String",
    password: "String",
    role: "String",
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
});

module.exports = mongoose.model( 'User', UserSchema );
