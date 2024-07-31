import { Component, Output,EventEmitter } from '@angular/core';
import { InputParams } from './meter-installation-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meter-installation-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './meter-installation-task.component.html',
  styleUrl: './meter-installation-task.component.css'
})
export class MeterInstallationTaskComponent {

  @Output() cancelled = new EventEmitter<void>();

  inputs: InputParams ={
    provider: '',
    senderId: '',
    industry: '',
    meteringType: '',
    startDate: '',
    createDate: '',
    obis: '',
    obis2: '',
    count: 0
  }

  onSubmit(){
    console.log("value of sender id is: " +this.inputs.count);
  }

  onCancel(){
    this.cancelled.emit();
  }
}
