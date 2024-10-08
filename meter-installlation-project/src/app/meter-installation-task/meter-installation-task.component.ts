import { Component, Output,EventEmitter, inject, OnInit } from '@angular/core';
import { InputParams } from './meter-installation-model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-meter-installation-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './meter-installation-task.component.html',
  styleUrl: './meter-installation-task.component.css'
})
export class MeterInstallationTaskComponent implements OnInit{

  isRunClicked = false;
  isRunning = false;
  isErrored = false;
  isCompleted = false;
  installedMetersList: string[] = [];
  providerList: string[]= [];
  obisList: string[] = [];

  @Output() cancelled = new EventEmitter<void>();
  @Output() viewXmlEvent = new EventEmitter<string>();
  @Output() metersInstallDone = new EventEmitter<string[]>();
  @Output() viewResultsEnabled = new EventEmitter<void>();


  private httpClient = inject(HttpClient);

  inputs: InputParams ={
    provider: '',
    senderId: '',
    industry: '',
    meteringType: '',
    startDate: '',
    createDate: '',
    obis: '',
    obis2: '',
    count: 0
  }

  ngOnInit(): void {
    this.populateProvidersList();
    this.populateOBISList();
  }

  onSubmit(){
    /* this.httpClient.get('http://localhost:8080/meterAction/v1/statusCheck',{ responseType: 'text' }).subscribe({
      next: (response) =>{
        console.log("response is : "+response);
      },

      complete: () =>{
        this.isRunClicked = true;
      },

      error: (error) =>{
        console.log("error message is: " +error.message);
        console.log(error);
      }
    }); */

    this.isErrored = false;
    this.isCompleted = false;
    this.isRunning = true;

    if(this.inputs.provider === ""){
      this.sendPlainMeterInstall(false);
    }
    else{
      this.sendPlainMeterInstall(true);
    }

  }

  private sendPlainMeterInstall(isPara:boolean) {
    {
      let requestBody = isPara ? this.inputs : {};
      let url = isPara ? 'http://localhost:8080/meterAction/v1/beginTaskParameterised' : 'http://localhost:8080/meterAction/v1/beginTask';

      this.httpClient.post<string[]>(url, requestBody).subscribe({
        next: (response) => {
            this.installedMetersList = response;
            console.log("meters Instals list is: " +this.installedMetersList);
        },
        complete: () => {
          this.isRunning = false;
          this.isErrored = false;
          this.isCompleted = true;
          this.metersInstallDone.emit(this.installedMetersList);

        },
        error: (error) => {
          this.isRunning = false;
          this.isCompleted = false;
          this.isErrored = true;
          console.log("error message is: " + error.message);
          console.log(error);
        }
      });
    }
  }

  onCancel(){
    this.cancelled.emit();
  }

  onViewXml(){
    this.viewXmlEvent.emit("Meter Installation");
  }

  onViewResultsEnable(){
    this.viewResultsEnabled.emit();
  }

  populateProvidersList(){
    this.httpClient.get<string[]>('http://localhost:8080/meterAction/v1/getProviders').subscribe({
      next: (response) => {
        this.providerList = response;
      },
      complete: () => {
        console.log("Completed fetching providers.");
      },
      error: (error) => {
        console.log("Error ins fetching providers : " +error);
      }
    });
  }

  populateOBISList(){
    this.httpClient.get<string[]>('http://localhost:8080/meterAction/v1/getObis').subscribe({
      next: (response) => {
        this.obisList = response;
      },
      complete: () => {
        console.log("Obis list fetched.");
      },
      error: (error) => {
        console.log("Error while fetching Obis list: " + error);
      }
    });
  }


}
