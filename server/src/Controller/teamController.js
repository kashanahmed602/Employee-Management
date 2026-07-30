const team = require('../models/team');
const user = require('../models/user');


const createTeam = async (req, res) => {

    const { name, members } = req.body;

    try {

        // Database se selected users nikaalo
        const users = await user.find({
            _id: { $in: members }
        });

        // Team members ka data banao
        const teamMembers = users.map(user => ({
            employeeId: user._id,
            name: user.name,
            email: user.email
        }));

        // Team save karo
        const newTeam = await team.create({
            name,
            members: teamMembers
        });

        res.status(201).json({
            success: true,
            message: "Team Created Successfully",
            team: newTeam
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
            stack: error.stack
        });

    }
};

module.exports = {createTeam};