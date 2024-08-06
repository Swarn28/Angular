import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-results',
  standalone: true,
  imports: [],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.css'
})
export class ViewResultsComponent {

  @Input({required:true}) installedMetersList!: string[];
  @Output() closeButtonEvent = new EventEmitter<void>();


  onCloseButton(){
    this.closeButtonEvent.emit();
  }

}
