const express = require('express');
const router = express.Router();

const {createTeam, getTeam, deleteTeam, updateTeam} = require('../Controller/teamController');

router.post('/createTeam', createTeam);
router.get('/getTeam', getTeam);
router.delete('/teamDelete/:id', deleteTeam);
router.put('/teamUpdate/:id', updateTeam);

module.exports = router;