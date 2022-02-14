const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const todoListSchema = mongoose.Schema(
    {
        _id:{ 
            type: String, 
            default: uuidv4 
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        dueDate:{
            type: Date,
            required: true
        },
        priority:{
            type: String,
            required: true,
        },
        status:{
            type:String,
            default:"active",
        }
   },
   {timestamps:true}
);

module.exports = mongoose.model('Todo',todoListSchema);  