import { Component, Input } from '@angular/core';
import { SharedService } from '../shared/shared.services';
import { ScriptAdditionalProps } from './scriptAdditionalProperties.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectedDevProfileComponent } from './selected-dev-profile/selected-dev-profile.component';
import { DevProfile } from './selected-dev-profile/dev-profile-model';
import { ScriptInfoComponent } from "./script-info/script-info.component";


@Component({
  selector: 'app-about-script',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectedDevProfileComponent, ScriptInfoComponent],
  templateUrl: './about-script.component.html',
  styleUrl: './about-script.component.css'
})
export class AboutScriptComponent {

  constructor(private sharedService: SharedService){}

  private developerProfiles: DevProfile[] =[];

  @Input({required:true}) selectedScriptProp!: ScriptAdditionalProps;

  @Input({required:true}) isEnabled:boolean = false;
  starArray: number[] = Array(5).fill(0);
  showDeveloperProfileClicked: boolean = false;
  selectedDevProfile!: DevProfile;
  isShowScriptInfoEnabled:boolean = false;

  showArguments = false;
  showComments = false;

  ngOnInit(){
    this.initializeDeveloperProfiles();
  }

  updateArgumentValue(index: number): void {
    this.selectedScriptProp.userArguments[index].value = '';
  }

  openDeveloperDialog(selectedDevName: string){
      console.log("selected developer name is: " +selectedDevName);
      this.showDeveloperProfileClicked = true;
      const selectedProfile = this.developerProfiles.find(dev => dev.name === selectedDevName);
      if(selectedProfile){
        this.selectedDevProfile = selectedProfile;
      }
  }

  initializeDeveloperProfiles():void{
    this.developerProfiles = [
      {
        name: "Shankar Jain",
        email: "shankar@landisgyr.com",
        languages: ["C++", "Shell"],
        photo: "photo_shankar.jpg",
        reportingManager: "Abu Kareem",
        afa_credits:245
      },
      {
        name: "Swami Renkat",
        email: "swami@landisgyr.com",
        languages: ["Java", "SQL"],
        photo: "photo_swami.jpg",
        reportingManager: "Rakhi",
        afa_credits:163
      },
      {
          name: "Meera Naik",
          email: "meera@landisgyr.com",
          languages: ["Middleware"],
          photo: "photo_meera.jpg",
          reportingManager: "Rohan",
          afa_credits:428
      },
      {
        name: "Rohan K",
        email: "rohan@landisgyr.com",
        languages: ["C++", "Shell"],
        photo: "photo.jpg",
        reportingManager: "Abu Kareem",
        afa_credits:315
      }
    ];
  }

  hideDevProfile():void{
    this.showDeveloperProfileClicked = false;
  }

  download(): void {
    if (this.selectedScriptProp.userArguments.find((arg) => arg.name === 'outputPath')) {
      this.sharedService.downloadFile(this.selectedScriptProp.userArguments.find((arg) => arg.name === 'outputPath')?.value ?? '');
    } else {
      alert('Please enter a output file name.');
    }
  }

  sendEmail(){
    alert("Email Sent.. !!");
  }

  schedule(){
    alert("Work is still in progress, give us more time.")
  }

  scriptInfo(){
    this.isShowScriptInfoEnabled = true;
  }

  hideScriptInfo(){
    this.isShowScriptInfoEnabled = false;
  }

  addComment(){
    alert("Work is still in progress, give us more time.");
  }

}
