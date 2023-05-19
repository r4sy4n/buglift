const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    ticketTitle: "String",
    ticketDescription: "String",
    fromProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketType: {
        type: String,
        enum: ['Bugs/Error', 'Feature Request', 'Task'],
    },
    ticketStatus: { type: String, default: 'Open' },
    ticketPriority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
});

module.exports = mongoose.model( 'Ticket', TicketSchema );