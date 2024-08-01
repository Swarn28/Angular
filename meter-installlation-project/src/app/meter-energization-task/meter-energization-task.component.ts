import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-meter-energization-task',
  standalone: true,
  imports: [],
  templateUrl: './meter-energization-task.component.html',
  styleUrl: './meter-energization-task.component.css'
})
export class MeterEnergizationTaskComponent {

  enableViewButton: boolean = false;
  @Output() emitCancelEvent = new EventEmitter<void>();

  onSubmit(){
    this.enableViewButton = true;
  }

  onCancel(){
    console.log("clicked Energization cancel")
    this.emitCancelEvent.emit();
  }


}
