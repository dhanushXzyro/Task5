const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task"); // ✅ only once

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => {
    console.log("MongoDB Connected");

    const newTask = new Task({
      title: "My First Task",
      completed: false
    });

    
    newTask.save()
      .then(() => console.log("Data Saved"))
      .catch(err => console.log(err));

  })
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Server started");
});