import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeterInstallationTaskComponent } from "./meter-installation-task/meter-installation-task.component";
import { HeaderComponent } from "./header/header.component";
import { MeterEnergizationTaskComponent } from './meter-energization-task/meter-energization-task.component';
import { MeterDeEnergizationTaskComponent } from './meter-de-energization-task/meter-de-energization-task.component';
import { ViewRequestXmlsComponent } from "./view-request-xmls/view-request-xmls.component";
import { ViewResultsComponent } from './view-results/view-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MeterInstallationTaskComponent, HeaderComponent,
    MeterEnergizationTaskComponent, MeterDeEnergizationTaskComponent, ViewRequestXmlsComponent, ViewResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meter-installlation-project';
  isMeterInstallationClicked: boolean = false;
  isEnegizationClicked: boolean = false;
  isDeEnergizationClicked: boolean = false;
  isViewXmlsEnabled: boolean = false;
  viewXmlTaskName: string='';
  installedMetersList: string[] = [];
  isViewResultsEnabled: boolean = false;

  idSelected!: string;

  tasks = [{name:'Meter Installation' , id:'1'},
    {name:'Energization' , id:'2'},
    {name:'DeEnergization' , id:'3'}
  ];

  enableOption(id:string){
    if(id==='1'){
      this.isMeterInstallationClicked = true;
    }
    if(id==='2'){
      this.isEnegizationClicked = true;
    }
    if(id==='3'){
      this.isDeEnergizationClicked = true;
    }

    this.checkSelected(id);
  }

  checkSelected(id:string){
    this.idSelected = id;
  }

  onCancelMeterInstallation(){
    this.isMeterInstallationClicked= false;
    this.idSelected='';
    this.isViewXmlsEnabled = false;

  }

  onEnergizationCancel(){
    this.isEnegizationClicked = false;
    this.idSelected='';
    this.isViewXmlsEnabled = false;

  }

  onDeEnergizationCancel(){
    this.isDeEnergizationClicked = false;
    this.idSelected='';
    this.isViewXmlsEnabled = false;

  }

  onViewXml(taskName: string){
    this.viewXmlTaskName = taskName;
    this.isViewXmlsEnabled = true;
  }

  onviewXmlClose(){
    this.isViewXmlsEnabled = false;
  }

  onMeterInstallDone(installedMeters: string[]){
    this.installedMetersList = installedMeters;
  }

  onViewResultsEnabled(){
    this.isViewResultsEnabled = true;
  }

  onViewResultsClose(){
    this.isViewResultsEnabled = false;

  }

}
