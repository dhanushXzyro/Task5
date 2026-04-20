//load mongoose package
const mongoose = require("mongoose");

//schema creation
const todoSchema = mongoose.Schema({
    task : {type: String},
    status: {type:Boolean, default:false},
});


module.exports = mongoose.model("todolist", todoSchema);



//task = {
//_id: 572672yuhjhj789
//task : task 1
//status: false
//}

//task._id = 572672yuhjhj789
//task.task = task 1
//task.status = fasle