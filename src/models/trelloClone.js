const mongoose = require('mongoose');
const { Schema } = mongoose;


const trelloCloneSchema = new Schema({
    name: { type: String, default: "My Trello" },
}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
})

trelloCloneSchema.virtual('boards', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'trello'
});

module.exports = {
    TrelloClone: mongoose.model('TrelloClone', trelloCloneSchema, 'TrelloClone'),
    trelloCloneSchema
}


