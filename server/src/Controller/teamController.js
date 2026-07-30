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

const getTeam = async (req, res) => {
    try{
        const teams = await team.find();

        if(!teams){
            res.status(400).json({
                success: false,
                message: "Team Not Found"
            });
        }

        res.status(200).json({
            success: true,
            team: teams
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message

        });
    }
};

module.exports = {createTeam, getTeam};