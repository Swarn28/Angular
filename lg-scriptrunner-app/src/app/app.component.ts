import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ViewScriptsComponent } from "./view-scripts/view-scripts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ViewScriptsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lg-scriptrunner-app';

  isLoginDone:boolean= false;

  OnLoginDone(loginDone: boolean){
    this.isLoginDone = true;
    console.log("value is: "+loginDone);
  }

}
