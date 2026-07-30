const task = require('../models/task');


const createTask = async (req, res) => {
    const { title, date, assign, category, description, assignType } = req.body;

    try {
        const newTask = await task.create({
            title,
            date,
            assign,
            assignType,
            category,
            description
        });

        res.status(201).json({
            success: true,
            message: "task Created Successfully",
            task: newTask
        });

    }catch(error){
        console.log("Task Error : ", error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getAssignTask = async (req, res) =>{

    try{

    const {assign} = req.params; 
    const getTask = await task.find({assign});

    res.status(200).json({
        success: true,
        message: "Task Fetched Successfully",
        task: getTask
    })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getTask = async (req, res) =>{

    try{

    const getTask = await task.find();

    res.status(200).json({
        success: true,
        message: "Task Fetched Successfully",
        task: getTask
    })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;

    try {

        const updatedTask = await task.findByIdAndUpdate(
            id,
            { type },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            task: updatedTask
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try{
    const deleteTask = await task.findByIdAndDelete(id);

    if(!deleteTask){
        res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Task deleted Successfully",
        task: deleteTask
    })

}catch(error){
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}
}

const addChat = async (req, res) => {

    const {id} = req.params;
    const {sender, message} = req.body;

    try{
    const findTask = await task.findById(id);

    if(!findTask){
       return res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }

    findTask.chat.push({
        sender,
        message
    });

    await findTask.save();

    res.status(200).json({
        success: true,
        task: findTask
    });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

const getChat = async (req, res) =>{
    const {id} = req.params;

    try{
        const getTask = await task.findById(id);

        if(!getTask){
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });
        }

        res.status(200).json({
            success: true,
            chat: getTask.chat
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = {createTask, getTask, getAssignTask, updateTask, deleteTask, addChat, getChat};