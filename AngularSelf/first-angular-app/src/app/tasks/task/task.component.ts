import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { type Task } from './task.model';
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TaskService } from '../tasks.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input({required: true}) task!: Task;
    @Input({required: true}) selectedId!: string;

    @Output() isComplete = new EventEmitter<string>();

    onCompleteButtonClick(){
      this.isComplete.emit(this.task.id);
    }

}
