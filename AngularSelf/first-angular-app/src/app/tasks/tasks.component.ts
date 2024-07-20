import { DUMMY_USERS } from './../dummy-users';
import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) selectedId!: string;
  @Input({required:true}) selectedName!: string;

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
}
