
const { Task } = require('./task')

const deleteTasks = async (panel) =>{
    return await Task.deleteMany({ "panel" : panel._id })
}

module.exports = {
    deleteTasks
}