const mongoose = require('mongoose');
const User = require('./user')

const teamSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    members:[
        {
        employeeId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },

        name: String,

        email: String
    }
    ]

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Team", teamSchema);