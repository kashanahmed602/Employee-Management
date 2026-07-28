const User = require('../models/user');

const getEmployee = async (req, res) => {
    try{
        const employee = await User.find({role:'employee'});

        res.status(200).json({
            success: true,
            employee
        });

    }catch(error){
        console.log("error employee", error)
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

module.exports = {getEmployee};