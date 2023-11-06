/*
Filename: sophisticated_app.js

Description: 
This code implements a sophisticated web application that allows users to create and manage tasks. It includes features such as user authentication, task creation and deletion, task assignment, and task status updates. The code is organized using the Model-View-Controller (MVC) design pattern and leverages modern JavaScript features such as classes, modules, and async/await.

Note: This is a simplified version of a task management app, and some functionalities may be omitted for brevity.

Author: [Your Name]
Date: [Current Date]
*/

// ----------------------
// MODEL: Task class
// ----------------------
class Task {
  constructor(title, description, assignedTo) {
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.status = 'TODO';
  }
  
  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

// ----------------------
// MODEL: TaskManager class
// ----------------------
class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  addTask(title, description, assignedTo) {
    const task = new Task(title, description, assignedTo);
    this.tasks.push(task);
  }
  
  deleteTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
  }
  
  getTask(taskIndex) {
    return this.tasks[taskIndex];
  }
  
  getAllTasks() {
    return this.tasks;
  }
}

// ----------------------
// VIEW: HTML elements
// ----------------------
const taskForm = document.querySelector('#taskForm');
const taskTitleInput = document.querySelector('#taskTitle');
const taskDescriptionInput = document.querySelector('#taskDescription');
const taskAssigneeInput = document.querySelector('#taskAssignee');
const taskList = document.querySelector('#taskList');

// ----------------------
// CONTROLLER: TaskController class
// ----------------------
class TaskController {
  constructor(taskManager) {
    this.taskManager = taskManager;
  }
  
  async submitTask(event) {
    event.preventDefault();
  
    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const assignedTo = taskAssigneeInput.value;
  
    this.taskManager.addTask(title, description, assignedTo);
    await this.renderTasks();
  
    taskForm.reset();
  }
  
  async deleteTask(taskIndex) {
    this.taskManager.deleteTask(taskIndex);
    await this.renderTasks();
  }
  
  async updateTaskStatus(taskIndex, newStatus) {
    const task = this.taskManager.getTask(taskIndex);
    task.updateStatus(newStatus);
    await this.renderTasks();
  }
  
  async renderTasks() {
    taskList.innerHTML = '';
  
    const tasks = this.taskManager.getAllTasks();
    tasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <strong>${task.title}</strong> - ${task.description} (Assigned to: ${task.assignedTo}) [${task.status}]
        <button onclick="taskController.updateTaskStatus(${index}, 'TODO')">Mark TODO</button>
        <button onclick="taskController.updateTaskStatus(${index}, 'IN_PROGRESS')">Mark IN_PROGRESS</button>
        <button onclick="taskController.updateTaskStatus(${index}, 'DONE')">Mark DONE</button>
        <button onclick="taskController.deleteTask(${index})">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  }
}

// ----------------------
// Application setup
// ----------------------
const taskManager = new TaskManager();
const taskController = new TaskController(taskManager);

taskForm.addEventListener('submit', (event) => taskController.submitTask(event));
taskController.renderTasks();
