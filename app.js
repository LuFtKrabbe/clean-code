//Document is the DOM can be accessed in the console with document.window.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementsByClassName("new-task__input-for-name")[0];
var addButton = document.getElementsByClassName("new-task__btn-add")[0];
var incompleteTaskHolder = document.getElementsByClassName("section__list_incomplete-tasks")[0];
var completedTasksHolder = document.getElementsByClassName("section__list_complete-tasks")[0];

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "section__task task";
    
    checkBox.type = "checkbox";
    checkBox.className = "task__input-check";

    label.innerText = taskString;
    label.className = "task__label-name";

    editInput.type = "text";
    editInput.className = "task__input-name";

    editButton.innerText = "Edit";
    editButton.className = "task__btn-edit";

    deleteButton.className = "task__btn-delete";

    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "task__btn-delete-icon";
    deleteButtonImg.alt = "Delete icon";

    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function() {
    if (!taskInput.value) return;

    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

var editTask = function() {
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".task__btn-edit");
    var containsClass = listItem.classList.contains("task_edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task_edit-mode");
};

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}

var taskCompleted = function() {
    var listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    var listItem = this.parentNode;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.task__btn-edit");
    var deleteButton = taskListItem.querySelector("button.task__btn-delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

addButton.addEventListener("click", addTask);