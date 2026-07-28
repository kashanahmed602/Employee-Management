const express = require('express');
const router = express.Router();

const {createTask, getAssignTask, getTask, updateTask, deleteTask, addChat, getChat} = require('../Controller/TaskController');

router.get("/test", (req, res) => {
    res.send("Task Route Working");
});

router.post('/createTask', createTask);
router.get('/allTask/:assign', getAssignTask);
router.get('/allTask', getTask);
router.put('/taskUpdate/:id', updateTask);
router.delete('/taskDelete/:id', deleteTask);
router.post('/taskChat/:id', addChat);
router.get('/getTaskChat/:id', getChat);



module.exports = router;