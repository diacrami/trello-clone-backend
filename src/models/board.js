const mongoose = require('mongoose');
const { Schema } = mongoose;
const { deletePanels } = require('./opPanel');
const panel = require('./panel');

const boardSchema = new mongoose.Schema({
    name: { type: String, default: "My Trello Board" },
    bgcolor: { type: String, default: "#000000" },
    trello: { type: Schema.Types.ObjectId, ref: 'TrelloClone' },
}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
})

boardSchema.virtual('panels', {
    ref: 'Panel',
    localField: '_id',
    foreignField: 'board'
});

boardSchema.pre('deleteOne', { document: false, query: true }, async function(){
    const board = await this.model.findOne(this.getFilter());
    const panel = await deletePanels(board)
})

module.exports = {
    Board: mongoose.model('Board', boardSchema, 'Board'),
    boardSchema
};