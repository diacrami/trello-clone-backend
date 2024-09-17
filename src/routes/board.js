const express = require('express');
const mongoose = require('mongoose');

const { TrelloClone, trelloCloneSchema } = require('../models/trelloClone');
const { Task, taskSchema } = require('../models/task');
const { Panel, panelSchema } = require('../models/panel');
const { default: axios } = require('axios');
const { Board } = require('../models/board');
/* Crear un enrutador */
/* este router lo exporto de este archivo y lo uso en el servidor que es el index.js */
const router = express.Router();
/* 
    CREA EL MODELO DE DATOS DE LA APP PARA CADA TIPO
    DE DATO PARA PODER ALMACENAR INFORMACIÓN
    Los modelos de datos se llaman schemas en mongoose
*/


//----------------------------TRELLO-------------------
//Create a new trello con name default without boards
// get all trello clones
router.get('/trellos', (req, res) => {
    TrelloClone.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//get an specific trello with boards and all
router.get('/trello', async (req, res) =>{
    let obj_trello = {};
    let task = {}
    const trello = await TrelloClone.findOne()
    obj_trello = {trello}
    const boards = await TrelloClone.findOne({"_id":trello._id}).populate('boards')
    obj_trello['trello'].boards=boards.boards;

    Promise.all(await boards.boards.map(async (board, indexBoard) => {
        const panels = await Board.findOne({"_id":board._id}).populate('panels')
        obj_trello['trello'].boards[indexBoard].panels=panels.panels;
        
        return Promise.all(await panels.panels.map( async(panel, indexPanel)=> {
            const tasks = await Panel.findOne({"_id":panel._id}).populate('tasks')
            obj_trello['trello'].boards[indexBoard].panels[indexPanel].tasks=tasks.tasks;
            
        }))
    })).then((data) =>{
        res.json(obj_trello)
    })
})


// get all boards from one trello
router.get('/boards/:pk', async (req, res) => {
    const { pk } = req.params;
    await TrelloClone.findOne().populate('boards')
        .then((data) => res.json(data.boards))
        .catch((error) => res.json({ message: error }));

})
//CREAR TRELLO
router.post('/trello', async (req, res) => {
    const trelloClone = new TrelloClone({ _id: new mongoose.Types.ObjectId() });

    await trelloClone.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})


// actualizar datos trello
router.put('/trello/:pk', (req, res) => {
    const { pk } = req.params;
    const { name, bgcolor, panels } = req.body;
})

//----------------------BOARD---------------------
// get an specific board
//get one board by id
//el id viene en los params de la petición, hay que obtenerlo
router.get('/board/:id', async (req, res) => {
    const { id } = req.params;
    await Board
        .findById(id)
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: error }))
})

//crear un board
router.post('/board', async (req, res) => {
    const { name, bgcolor, trello } = req.body;
    const board = new Board({ name, bgcolor, trello })
    await board.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//Actualizar datos board
router.put('/board/:pk', (req, res) => {
    const { pk } = req.params;
    const { _id, name, bgcolor, trello } = req.body;
    Board
        .updateOne({ '_id': pk }, { "$set": { "name": name, "bgcolor": bgcolor } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//delete Board
router.delete('/board/:id', async (req, res) =>{
    const { id } = req.params;
    await Board
        .deleteOne({ '_id' : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//----------------------PANEL---------------------

// get all panels from one board
router.get('/panel/:id', async (req, res) => {
    const { id } = req.params;
    await Panel.findOne({ '_id': id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//crear un panel
router.post('/panel', async (req, res) => {
    const { title, bgcolor, order, board } = req.body;
    const panel = new Panel({ _id: new mongoose.Types.ObjectId(), title, bgcolor, order, board })
    await panel.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//Para postear nueva task ocupo actualizar el board
router.put('/panel/:pk', (req, res) => {
    const { pk } = req.params;
    const { _id, title, bgcolor, order, board } = req.body
    
    Panel
        .updateOne({ '_id': pk }, { "$set": { title, bgcolor, order, board } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

})

//delete panel
router.delete('/panel/:id', async (req, res) =>{
    const { id } = req.params;
    await Panel
        .deleteOne({ '_id' : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})



//----------------------TASK---------------------


//task
router.get('/task/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findOne({ '_id': id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//crear un task
router.post('/task', async (req, res) => {
    const { title, description, dateStart, dateEnd, order, panel } = req.body;
    const task = new Task({ _id: new mongoose.Types.ObjectId(), title, description, dateStart, dateEnd, order, panel })
    await task.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
})

//actualizar task
router.put('/task/:pk', async (req, res) => {
    const { pk } = req.params;
    const { _id, title, description, dateStart, dateEnd, order, panel } = req.body
    await Task
        .updateOne({ '_id': pk }, { "$set": { title, description, dateStart, dateEnd, order, panel } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

})

//delete task
router.delete('/task/:id', async (req, res) =>{
    const { id } = req.params;
    await Task
        .deleteOne({ '_id' : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports = router;

