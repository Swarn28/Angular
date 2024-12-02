import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-script-info',
  standalone: true,
  imports: [],
  templateUrl: './script-info.component.html',
  styleUrl: './script-info.component.css'
})
export class ScriptInfoComponent {

  @Input({required: true}) isScriptInfoEnabled: boolean = false;
  @Output() hideScriptInfoEvent = new EventEmitter<void>();
  showReadMe: boolean = false;

  showReadme(){
    this.showReadMe = true;
  }

  showScript(){
    alert("Work is still under progress, give us more time.")
  }

  closeDialog(){
    this.isScriptInfoEnabled = false;
    this.hideScriptInfoEvent.emit();
  }

}
