import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DevProfile } from './dev-profile-model';

@Component({
  selector: 'app-selected-dev-profile',
  standalone: true,
  imports: [],
  templateUrl: './selected-dev-profile.component.html',
  styleUrl: './selected-dev-profile.component.css'
})
export class SelectedDevProfileComponent {

  @Input({required:true}) selectedDevProfile!: DevProfile;
  @Output() onCloseEvent = new EventEmitter<boolean>;

  ngOnInit(){
  }

  onClose(){
    this.onCloseEvent.emit(true);
  }

}
