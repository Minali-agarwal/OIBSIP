const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}


function renderTasks() {

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    let pending = 0;
    let completed = 0;

    tasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const time = document.createElement("div");
        time.className = "time";

        if (task.completed) {
            time.textContent =
                "Completed: " + task.completedAt;
        } else {
            time.textContent =
                "Added: " + task.createdAt;
        }

        taskInfo.appendChild(taskText);
        taskInfo.appendChild(time);

        const buttonBox = document.createElement("div");
        buttonBox.className = "buttons";

        // Complete Button

        const completeBtn =
            document.createElement("button");

        completeBtn.className = "complete";

        completeBtn.textContent =
            task.completed
                ? "Undo"
                : "Complete";

        completeBtn.onclick = () =>
            toggleComplete(task.id);

        

        const editBtn =
            document.createElement("button");

        editBtn.className = "edit";

        editBtn.textContent = "Edit";

        editBtn.onclick = () =>
            editTask(task.id);

        

        const deleteBtn =
            document.createElement("button");

        deleteBtn.className = "delete";

        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () =>
            deleteTask(task.id);

        buttonBox.append(
            completeBtn,
            editBtn,
            deleteBtn
        );

        li.appendChild(taskInfo);
        li.appendChild(buttonBox);

        if (task.completed) {

            completedList.appendChild(li);

            completed++;

        } else {

            pendingList.appendChild(li);

            pending++;
        }

    });

    pendingCount.textContent =
        `${pending} Pending`;

    completedCount.textContent =
        `${completed} Completed`;

    pendingEmpty.style.display =
        pending === 0
            ? "block"
            : "none";

    completedEmpty.style.display =
        completed === 0
            ? "block"
            : "none";
}


function toggleComplete(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

            task.completedAt = task.completed
                ? new Date().toLocaleString()
                : null;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}


function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText === null) return;

    if (updatedText.trim() === "") {

        alert("Task cannot be empty.");

        return;
    }

    task.text = updatedText.trim();

    saveTasks();

    renderTasks();
}


function deleteTask(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();

    }

});


renderTasks();