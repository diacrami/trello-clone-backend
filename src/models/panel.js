const mongoose = require('mongoose');
const { Schema } = mongoose;
const { deleteTasks } = require('./op');

const panelSchema = new mongoose.Schema({
    title: { type: String },
    bgcolor: { type: String },
    order: { type: Number },
    board: { type: Schema.Types.ObjectId, ref: 'Board' }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

panelSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'panel'
});

panelSchema.pre(['deleteOne', 'deleteMany'], { document: false, query: true }, async function(){
    const panel = await this.model.findOne(this.getFilter()) || [];
    const task = await deleteTasks(panel)

})

module.exports = {
    Panel: mongoose.model('Panel', panelSchema),
    panelSchema
};