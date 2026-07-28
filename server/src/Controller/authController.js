const User = require('../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
// const user = require('../models/user');

const registerUser = async (req, res) => {
    try{
        const { name, email, password, role} = req.body;

        const extingUser = await User.findOne({ email});

        if(extingUser){
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role
        });

        const token = JWT.sign({
            userId: newUser._id,
            email: newUser.email,
            role: newUser.role,

        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )

        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            token: token,
            user: newUser,
        });
    }
    catch(error){
        console.log("error",error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }

};

const loginUser = async (req, res) => {
    try {

        const { email, password, role } = req.body;

        // Check email
        const user = await User.findOne({ email, role });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Check password
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate Token
        const token = JWT.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {registerUser, loginUser};