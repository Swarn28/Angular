import { Component, Input } from '@angular/core';
import { SharedService } from '../shared/shared.services';
import { ScriptAdditionalProps } from './scriptAdditionalProperties.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-about-script',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './about-script.component.html',
  styleUrl: './about-script.component.css'
})
export class AboutScriptComponent {

  constructor(private sharedService: SharedService){}

  @Input({required:true}) selectedScriptProp!: ScriptAdditionalProps;

  @Input({required:true}) isEnabled:boolean = false;

  showArguments = false;
  showComments = false;

  ngOnInit(){
  }

  updateArgumentValue(index: number): void {
    this.selectedScriptProp.arguments[index].value = '';
  }


}
