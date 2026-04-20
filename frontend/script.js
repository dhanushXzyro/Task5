const task_input = document.getElementById("task_input");

const add_btn = document.getElementById("add_btn");

const task_list = document.getElementById("task_list");

const API_URL = "https://todolist-app-backend-zgvh.onrender.com/todolist";

window.addEventListener("DOMContentLoaded", function(){
  fetch(API_URL)
  .then( (res) => res.json())
  .then( (tasks) => {
    tasks.forEach((task) => {
      create_task_list(task._id, task.task, task.status);
    });
  } )
});

add_btn.addEventListener("click", function(){
   const usertask = task_input.value;
   if(usertask===""){
    alert("Please enter a task!");
    return;
   }

   fetch(API_URL, {
    method : "POST",
    headers: { "Content-Type" : "application/json"},
    body : JSON.stringify({task: usertask})
   })
   .then( (res) => res.json() )
   .then( (task) => {
    create_task_list(task._id, task.task, task.status)
    task_input.value = "";
   })

   //body.task = usertask

  //  create_task_list(task);
    
});

function create_task_list(task_id,task_txt, task_status){
  const list_item = document.createElement("li");

  const comp_btn = document.createElement("button");
  comp_btn.className = "comp_btn";

  const task_text = document.createElement("span");
  task_text.className = "task_text";
  task_text.textContent = task_txt;

  const dlt_btn = document.createElement("button");
  dlt_btn.className = "delete_btn";
  dlt_btn.textContent = "Delete";

  if(task_status === true){
    comp_btn.textContent = "✔";
    comp_btn.classList.toggle("marked"); //comp_btn marked
    task_text.classList.toggle("task_marked");
  }

  comp_btn.addEventListener("click", function () {
    let finished = comp_btn.textContent === "✔";
    fetch(`${API_URL}/${task_id}`,{
      method : "PUT",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({status : !finished})
    })
    .then( (res) => res.json() )
    .then(  () => {
        if (comp_btn.textContent === "✔") {
          comp_btn.textContent = "";
        } else {
          comp_btn.textContent = "✔";
        }
        comp_btn.classList.toggle("marked"); //comp_btn marked
        task_text.classList.toggle("task_marked");
    })
  });

  dlt_btn.addEventListener("click", function () {
    fetch(`${API_URL}/${task_id}`,{
      method : "DELETE"
    })
    .then( () => {
        task_list.removeChild(list_item);
    } )
  });

  list_item.appendChild(comp_btn);
  list_item.appendChild(task_text);
  list_item.appendChild(dlt_btn);

  task_list.appendChild(list_item);
}