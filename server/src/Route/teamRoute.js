const express = require('express');
const router = express.Router();

const {createTeam, getTeam, deleteTeam} = require('../Controller/teamController');

router.post('/createTeam', createTeam);
router.get('/getTeam', getTeam);
router.delete('/teamDelete/:id', deleteTeam);

module.exports = router;