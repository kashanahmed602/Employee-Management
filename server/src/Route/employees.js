const express = require('express');
const router = express.Router();

const {getEmployee, deleteEmployee} = require('../Controller/employeesController');

router.get('/employee', getEmployee);
router.delete('/employeeDelete/:id', deleteEmployee);


module.exports = router;