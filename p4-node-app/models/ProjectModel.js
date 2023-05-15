const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: "String",
    description: "String",
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
});

module.exports = mongoose.model( 'Project', ProjectSchema );