const mongoose = require('mongoose');
const { Schema } = mongoose;


const taskSchema = new mongoose.Schema({
    //id: { type: String },
    title: { type: String },
    description: { type: String },
    dateStart: { type: String },
    dateEnd: { type: String },
    order: { type: Number },
    panel: { type: Schema.Types.ObjectId, ref: 'Panel' },
}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
})


module.exports = {
    Task: mongoose.model('Task', taskSchema),
    taskSchema,
}
