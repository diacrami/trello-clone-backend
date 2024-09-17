const { Panel } = require('./panel')

const deletePanels = async (board) =>{
    return await Panel.deleteMany({ "board" : board._id })
}

module.exports = {
    deletePanels
}