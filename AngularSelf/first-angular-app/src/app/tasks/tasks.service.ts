import { Injectable } from "@angular/core";
import { newTask } from "./new-task/new-task.model";

@Injectable({providedIn: 'root'})
export class TaskService{
  private tasks = [
    { id: 't1',
      userId: 'u1',
      tittle: 'Master Angular',
      summary: 'Learn Angular basics...',
      dueDate : '2024-7-5'
    },
    { id: 't2',
      userId: 'u3',
      tittle: 'Play badminton',
      summary: 'Playing is good',
      dueDate : '2024-10-15'},
    { id: 't3',
      userId: 'u3',
      tittle: 'Eat Healthy',
      summary: 'Eating healthy food is good',
      dueDate : '2024-8-6'}
  ]

  constructor(){
    const tasks = localStorage.getItem('tasks');

    if(tasks){
      this.tasks = JSON.parse(tasks);
    }
  }


  addTask(newTask: newTask, userId: string){
    this.tasks.push({
      tittle: newTask.Title,
      summary: newTask.Summary,
      dueDate: newTask.Date,
      id: this.createRandomId(),
      userId: userId
    })
    this.storeTasksLocalStorage();

  }

  removeTask(taskId: string){
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.storeTasksLocalStorage();
    return this.tasks;
  }

  getUserTasks(userId: string){
    this.tasks.filter((task) => task.userId === userId)
  }

  createRandomId(): string{
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return randomNumber.toString();
  }


  getAllTasks(){
    return this.tasks;
  }


  private storeTasksLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
  }

}
