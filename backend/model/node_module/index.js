//Import: Load the express package.

const express= require("express");
const mongoose = require("mongoose");
const Todo = require("./model/Todo");
const cors = require("cors");

//create the app obj

const app = express();

//middleware
app.use(express.json());
//cors
app.use(cors());


// mongodb+srv://TodoListApplication:todolistapp12345@cluster0.ixnufht.mongodb.net/Todolistapp?appName=Cluster0

mongoose
  .connect(
    "mongodb+srv://TodoListApplication:todolistapp12345@cluster0.ixnufht.mongodb.net/Todolistapp?appName=Cluster0",
  )
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((e) => {
    console.log(e);
  });

///get route
app.get("/todolist", async (req, res) => {
    const todoget = await Todo.find();
    res.json(todoget);
});

///post route
app.post("/todolist", async (req, res) => {
    const todopost = new Todo({task : req.body.task});
   await todopost.save();
    res.json(todopost);
});


///put route
app.put("/todolist/:id", async (req, res) => {
    const todoput = await Todo.findByIdAndUpdate(req.params.id,
        {status : req.body.status}, 
        {new:true} ,
    );
    res.json(todoput);
});

///delete route
app.delete("/todolist/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message: "deleted"});
});

const PORT = process.env.PORT || 3000;
//start server
app.listen(PORT, () => console.log("Server has started at port 3000!"));



// body = { task : "task 1" , age: 18 };
//a.name = abc
//body.task = task 1