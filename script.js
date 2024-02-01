let tasks = [
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
];

let completedTasks = [];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);
    const targetListId = event.target.closest(".column").id;

    event.target.style.border = "3px dotted red";

    if (targetListId === "done-column") {
        completeTask(taskId);
    } else if (targetListId === "todo-column") {
        uncompleteTask(taskId);
    }
}

function addTask() {
    const newTaskInput = document.getElementById("new-task");
    const taskTitle = newTaskInput.value.trim();
    if (taskTitle !== "") {
        const newTask = {
            id: tasks.length + 1,
            title: taskTitle,
        };
        tasks.push(newTask);
        renderTasks();
        newTaskInput.value = "";
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    renderTasks();
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex !== -1) {
        const completedTask = tasks.splice(taskIndex, 1)[0];
        completedTasks.push(completedTask);
        renderTasks();
    }
}

function uncompleteTask(taskId) {
    const taskIndex = completedTasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex !== -1) {
        const uncompletedTask = completedTasks.splice(taskIndex, 1)[0];
        tasks.push(uncompletedTask);
        renderTasks();
    }
}

function renderTasks() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    tasks.forEach((task) => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
    });

    const doneList = document.getElementById("done-list");
    doneList.innerHTML = "";
    completedTasks.forEach((task) => {
        const li = createTaskElement(task);
        doneList.appendChild(li);
    });
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.draggable = true;
    li.id = task.id;
    li.addEventListener("dragstart", drag);
    li.addEventListener("dblclick", () => deleteTask(task.id));
    return li;
}

renderTasks();