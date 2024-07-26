import { DUMMY_USERS } from './../dummy-users';
import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { newTask } from './new-task/new-task.model';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) selectedId!: string;
  @Input({required:true}) selectedName!: string;

  isNewTaskClicked= false;
  private taskService: TaskService;

  tasks: any[] = [];

  constructor(taskService:TaskService){
    this.taskService = taskService;
  }


  ngOnInit(){
    this.tasks = this.taskService.getAllTasks();
  }

  onAddNewTask(){
    this.isNewTaskClicked = true;
  }

  onCancelClicked(){
    this.isNewTaskClicked = false;
  }

  onComplete(id: string){
    this.tasks = this.taskService.removeTask(id);
  }

  addNewTask(recvdTask: newTask){
      this.taskService.addTask(recvdTask,this.selectedId);
      this.isNewTaskClicked = false;
  }

  createRandomId(): string{
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return randomNumber.toString();
  }

}
