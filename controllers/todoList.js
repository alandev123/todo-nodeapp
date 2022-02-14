const Todo = require('../models/Todo');

const createNote = (req,res) =>{
    return new Promise (async (resolve, reject) => {
        const todoData = req.body;
        let titleNotTaken = await Todo.findOne( {status : 'active',title : { $regex : new RegExp(todoData.title, "i") } });
        if (titleNotTaken) {
            return reject({
                message :"Title already taken.",
                success : false
            }); 
        }
        const newdata = new Todo ({
            ...todoData,
        });
        await newdata.save().then( () => {
            return resolve({ 
                message :" To-do Note Added Successfully", 
                success : true
            }); 
        }).catch((e) => {
            return reject({ 
                message :e.message, 
                success : false
            });
        });
    })
};

const updateNote = (req,res) =>{
    return new Promise(async (resolve, reject) => {
        const id = req.query.id;
        const todoData = req.body;
        if(todoData.title != null){
            let titleNotTaken = await Todo.findOne( {status : 'active',title : { $regex : new RegExp(todoData.title, "i") } });
            if (titleNotTaken) {
                return resolve({
                    message :"Title already taken.",
                    success : false
                }); 
            }
        }
        Todo.updateOne(
            { _id: id},
            {
                $set: {
                    ...todoData,
                }
            },
            async function(err,result){
                if(err){
                    return reject({ 
                        message :"Error in update Notes", 
                        success : false,
                        error:err.message
                    });
                }
                else {
                    return resolve({
                        message :"Note Updated Successfully",
                        success : true
                    });
                }
            }
        );
    })
};

const deleteNotes = (req,res) =>{
    return new Promise(async (resolve, reject) => {
        const id = req.query.id;
        Todo.updateOne(
            { _id: id},
            {
                $set:{
                        status : 'inactive'
                    }
            },
            function(err,result){
                if(err){
                        return reject({ 
                            message :"Error in Delete Note", 
                            success : false,
                            error:err.message
                        });
                    }
                else {
                    return resolve({
                            message :"Note Deleted Successfully",
                            success : true
                    });
                }
            }
        );
    })

};

const getNote = (req,res) =>{
    return new Promise( (resolve, reject) => {
        Todo.find({status:"active"},function (err,todoData) {
            if (err){
                reject({ 
                    message: err.message, 
                    success: false
                });
            }
            if (todoData){
                resolve( todoData);
            }
            else {
                reject({ 
                    message: "No Data Found", 
                    success: false
                });
            }
        });
    });
};

const listTitle = (req,res) =>{
    return new Promise( (resolve, reject) => {
        Todo.aggregate([
            {$match :{status:"active"}},
            {
                $project:{
                    _id:1,
                    title:"$title",
                }
            },
        ],function (err,title) {
            if (err){
              return reject({
                  success : false ,
                  message:err.message
                });
            }
            resolve(title);    
        })
    })
};

const getNoteByID = (req,res) =>{
    return new Promise( (resolve, reject) => {
        const id = req.query.id;
        Todo.findOne({_id:id},function (err,notes) {
            if (err){
                reject({ 
                    message: err.message, 
                    success: false
                });
            }
            if (notes){
                resolve(notes);
            }
            else {
                reject({ 
                    message: "No data found", 
                    success: false
                });
            }
        });
    })
};

module.exports = {
    createNote,
    updateNote,
    deleteNotes,
    getNote,
    listTitle,
    getNoteByID
}