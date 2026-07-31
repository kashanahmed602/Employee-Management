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

const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully",
            employee: deletedUser
        });
    } catch (error) {
        console.error("deleteEmployee error", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {getEmployee, deleteEmployee};