const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    ticketTitle: "String",
    ticketDescription: "String",
    fromProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticketType: "String",
    ticketStatus: { type: String, default: 'Open' },
    ticketPriority: "String"
});

module.exports = mongoose.model( 'Ticket', TicketSchema );