import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {

  isInsightsEnabled:boolean = true;

  @Output() disableInsights = new EventEmitter<void>();

  closeInsights(){
    this.isInsightsEnabled = false;
    this.disableInsights.emit();
  }

}
