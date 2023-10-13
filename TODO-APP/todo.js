const input=document.querySelector("input");
const todo=document.querySelector(".main-todo");
const buttons=document.querySelector(".buttons");





function addTask() {
    if(input.value=='')
    {
       alert("enter your task")
    }
    else
    {
    let list=document.createElement("li");
    list.innerHTML=input.value+"<button onclick=remove(event)>Delete Task</button>";
    todo.appendChild(list)
    }
    input.value=""
}
 
   


    

function remove(event)
{
event.target.parentElement.remove();

}
