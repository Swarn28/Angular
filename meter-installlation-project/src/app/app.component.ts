import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeterInstallationTaskComponent } from "./meter-installation-task/meter-installation-task.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MeterInstallationTaskComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meter-installlation-project';
  isMeterInstallationClicked: boolean = false;

  tasks = [{name:'Meter Installation' , id:'1'},
    {name:'Energization' , id:'2'},
    {name:'DeEnergization' , id:'3'}
  ];

  enableOption(id:string){
    console.log("inside enableOption");
    if(id==='1'){
      this.isMeterInstallationClicked = true;

    }
  }

}
