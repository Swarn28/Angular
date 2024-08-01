import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-meter-de-energization-task',
  standalone: true,
  imports: [],
  templateUrl: './meter-de-energization-task.component.html',
  styleUrl: './meter-de-energization-task.component.css'
})
export class MeterDeEnergizationTaskComponent {

  enableViewButton: boolean = false;
  @Output() cancelEvent = new EventEmitter<void>();

  onSubmit(){
    this.enableViewButton = true;
  }

  onCancel(){
    this.cancelEvent.emit();
  }

}
