const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },

    date:{
        type: Date,
        require: true
    },

    assign:{
        type: String,
        require: true
    },

    category:{
        type: String,
        require: true
    },

    description:{
        type: String
    },

    type:{
        type: String,
        enum: ['New Task', 'Active Task', 'Completed Task', 'Failed Task'],
        default: "New Task"
    },

    chat:[
        {
        sender:{
            type: String,
            required: true
        },

        message:{
            type:String,
            required: true
        },

        createdAt:{
            type: Date,
            default: Date.now
        }
    }
    ]
},
    {
       timestamps: true  
    
})

module.exports = mongoose.model('Task', task);