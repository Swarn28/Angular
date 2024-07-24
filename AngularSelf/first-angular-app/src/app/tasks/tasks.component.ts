import { DUMMY_USERS } from './../dummy-users';
import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { newTask } from './new-task/new-task.model';

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

  tasks = [
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

  onAddNewTask(){
    this.isNewTaskClicked = true;
  }

  onCancelClicked(){
    this.isNewTaskClicked = false;
  }

  onComplete(id: string){
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  addNewTask(recvdTask: newTask){
      this.tasks.push({
        id:this.createRandomId(),
        summary: recvdTask.Summary,
        tittle: recvdTask.Title,
        dueDate: recvdTask.Date,
        userId: this.selectedId,
      });
      this.isNewTaskClicked = false;
  }

  createRandomId(): string{
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    return randomNumber.toString();
  }

}
