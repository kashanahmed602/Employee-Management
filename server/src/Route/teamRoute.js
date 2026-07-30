const express = require('express');
const router = express.Router();

const {createTeam, getTeam} = require('../Controller/teamController');

router.post('/createTeam', createTeam);
router.get('/getTeam', getTeam);

module.exports = router;