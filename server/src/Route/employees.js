const express = require('express');
const router = express.Router();

const {getEmployee} = require('../Controller/employeesController');

router.get('/employee', getEmployee);


module.exports = router;