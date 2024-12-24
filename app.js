document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks=JSON.parse(localStorage.getItem("tasks"));
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateTaskslist();
        updateStats();
        }
    });
let tasks =[];

const savedTasks=()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
const addTask =()=>{
    const taskInput=document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});

        taskInput.value="";
        updateTaskslist();
        updateStats();
        savedTasks();
    }
}

const toggleTaskComplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTaskslist();
    updateStats();
    savedTasks();
}

const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskslist();
    updateStats();
    savedTasks();
}

const editTask=(index)=>{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTaskslist();
    updateStats();
    savedTasks();
};

const updateStats=()=>{
    const completedTasks=tasks.filter(task=>task.completed).length;
    const totalTasks=tasks.length;
    let progress=0;
    if(totalTasks>0){
        progress=(completedTasks/totalTasks)*100;
    }
    const progrressBar=document.getElementById("progress");
    progrressBar.style.width=`${progress}%`;
    document.getElementById("numbers").innerText=`${completedTasks}/${totalTasks}`;

        if(tasks.length && completedTasks===totalTasks){
            blastConfetti();
        }
    }

const updateTaskslist=()=>{
    const taskList = document.getElementById("task-list");
    if(!taskList){
        console.error("No task list found");
        return;
    }
    taskList.innerHTML="";

    tasks.forEach((task,index) =>{
        const listItem=document.createElement("li");

        listItem.innerHTML=`
        <div class="taskItem">
           <div class="task ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
            <p>${task.text}</p>
           </div>
           <div class="icons">
            <img src="./img/edit.png" onClick="editTask(${index})"/>
            <img src="./img/bin.png" onClick="deleteTask(${index})"/>
           </div>
         </div>
        `;
        listItem.addEventListener("change",()=>toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener("click",function(e){
    e.preventDefault();
    addTask();
});


const blastConfetti=()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};