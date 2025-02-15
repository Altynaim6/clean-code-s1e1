// Selecting necessary DOM elements
const taskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".add-task");
const incompleteTasksList = document.getElementById("incomplete-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Function to create a new task item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    // Assigning attributes and text
    checkBox.type = "checkbox";
    label.innerText = taskString;
    label.className = "task";
    editInput.type = "text";
    editInput.className = "task";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";

    // Append delete image inside button
    deleteButton.appendChild(deleteButtonImg);

    // Append all elements to listItem
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

// Function to add a task
const addTask = () => {
    if (!taskInput.value.trim()) return; // Prevent adding empty tasks

    const listItem = createNewTaskElement(taskInput.value);
    incompleteTasksList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = ""; // Clear input after adding task
};

// Function to edit an existing task
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editButton = listItem.querySelector(".edit");

    if (listItem.classList.contains("editMode")) {
        label.innerText = editInput.value.trim() || label.innerText;
        editButton.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

// Function to delete a task
const deleteTask = function () {
    this.parentNode.remove();
};

// Function to mark a task as completed
const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksList.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Function to mark a task as incomplete
const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTasksList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

// Function to handle AJAX requests (for potential future use)
const ajaxRequest = () => {
    console.log("AJAX Request triggered");
};

// Function to bind task events (edit, delete, checkbox toggle)
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector(".edit");
    const deleteButton = taskListItem.querySelector(".delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

// Add event listeners to the add button
addTaskButton.addEventListener("click", addTask);
addTaskButton.addEventListener("click", ajaxRequest);

// Bind events to existing tasks in the lists
for (let i = 0; i < incompleteTasksList.children.length; i++) {
    bindTaskEvents(incompleteTasksList.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
    bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}