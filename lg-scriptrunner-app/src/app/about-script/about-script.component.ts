import { Component, Input } from '@angular/core';
import { SharedService } from '../shared/shared.services';
import { Script } from '../view-scripts/script.model';

@Component({
  selector: 'app-about-script',
  standalone: true,
  imports: [],
  templateUrl: './about-script.component.html',
  styleUrl: './about-script.component.css'
})
export class AboutScriptComponent {

  constructor(private sharedService: SharedService){}

  @Input({required:true}) selectedScript!: Script;

  @Input({required:true}) isEnabled:boolean = false;


}
