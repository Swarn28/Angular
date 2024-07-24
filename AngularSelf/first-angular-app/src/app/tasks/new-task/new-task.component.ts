import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { newTask } from './new-task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Output() cancel = new EventEmitter<void>();
  @Output() addNewTask = new EventEmitter<newTask>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate='';


    onCancelClick(){
      this.cancel.emit();
    }

    onSubmit(){
      this.addNewTask.emit({
        Title: this.enteredTitle,
        Summary: this.enteredSummary,
        Date: this.checkDate(this.enteredDate) ? this.enteredDate : new Date().toISOString()
      })
    }

    checkDate(enteredDate:string):boolean{
      const inputDate = new Date(enteredDate)
      const currentDate = new Date();

      return inputDate > currentDate;
    }
}
