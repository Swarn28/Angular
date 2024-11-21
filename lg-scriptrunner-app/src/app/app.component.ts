import { SharedService } from './shared/shared.services';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ViewScriptsComponent } from "./view-scripts/view-scripts.component";
import { AboutScriptComponent } from './about-script/about-script.component';
import { Script } from './view-scripts/script.model';
import { ScriptAdditionalProps } from './about-script/scriptAdditionalProperties.model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ViewScriptsComponent,AboutScriptComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lg-scriptrunner-app';
  isLoginDone:boolean= false;
  isLogoutDone:boolean = false;
  selectedScriptProp!: ScriptAdditionalProps;

  isAboutScriptEnabled:boolean = false;

  constructor(private sharedService: SharedService){};

  onAdminLogin(loginDone: boolean){
    this.isLoginDone = loginDone;
    this.isLogoutDone = false;
    console.log("value is: "+loginDone);
  }

  onLogout(){
    this.isLoginDone = false;
    this.isLogoutDone = true;
    this.isAboutScriptEnabled = false;
  }

  onAboutScript(){
    console.log("in app componenet for About script..")
    this.isAboutScriptEnabled = true;
    this.selectedScriptProp = this.sharedService.getSelectedScriptProp();
  }



}
