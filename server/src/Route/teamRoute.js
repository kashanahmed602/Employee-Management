const express = require('express');
const router = express.Router();

const {createTeam} = require('../Controller/teamController');

router.post('/createTeam', createTeam);

module.exports = router;