import { Argument } from './argument.model';
import { UserType } from './../shared/UserTypeEnum';
import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared/shared.services';
import { Script } from './script.model';
import { ScriptAdditionalProps } from '../about-script/scriptAdditionalProperties.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadScriptComponent } from './upload-script/upload-script.component';


@Component({
  selector: 'app-view-scripts',
  standalone: true,
  imports: [CommonModule,UploadScriptComponent],
  templateUrl: './view-scripts.component.html',
  styleUrl: './view-scripts.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewScriptsComponent {

  scripts: Script[] = [];
  userType!: UserType;
  selectedIndex!:Number;
  isUploadEnabled:boolean = false;
  displayName:string='';
  hostName:string='';
  private scriptProps: ScriptAdditionalProps[] = [];

  public selectedScriptProp!: ScriptAdditionalProps;

  @Output() logoutDone = new EventEmitter<boolean>;
  @Output() rowSelected = new EventEmitter<void>;
  @Output() isAuditEnabledEvent = new EventEmitter<void>;
  private httpClient = inject(HttpClient);


  constructor(private sharedService: SharedService){}

  ngOnInit() {
    this.initializeScripts();
    this.initializeScriptsProps();
    this.userType = this.sharedService.getCurrentUserType();
  }

  onLogout(){
    console.log("Logour event triggered...")
    this.logoutDone.emit(true);
  }

  initializeScripts(): void {
    this.scripts = [
      {
        name: 'OS Performance', description: 'Test OS performance', type: 'Python', status: 'Inactive',
        id: 1, scriptName: "os_performance.py"

      },
      {
        name: 'Cleanup Script', description: 'Cleans temporary files', type: 'Python', status: 'Inactive',
        id: 2,scriptName: "Cleanup.py"
      },
      {
        name: 'Deployment Script', description: 'Deploys the application', type: 'Shell', status: 'Inactive',
        id: 3,scriptName: "Deployment.ksh"
      },
      {
        name: 'Report Generator', description: 'Generates daily reports', type: 'JavaScript', status: 'Inactive',
        id: 4, scriptName: "report_generation.js"

      },
      {
        name: 'Database Migration', description: 'Migrates database schemas', type: 'SQL', status: 'Inactive',
        id: 5,scriptName: "DatabaseMigration.py"
      },
      {
        name: 'Log Archiver', description: 'Archives log files', type: 'Bash', status: 'Inactive',
        id: 6, scriptName: "Log_Archiever.ksh"
      },
      {
        name: 'Add Two Numbers', description: 'Perform Addition', type: 'Python', status: 'Inactive',
        id: 7, scriptName: "add_num.py"
      },
    ];
  }


  executeScript(script: any): void {
    // For now, just log the script name. You can replace this with actual execution logic.
    console.log(`Executing script: ${script.name}`);
    const { apiUrl, params } = this.populateObject();
   // alert(`Executing script: ${script.name}`);

    // Make HTTP GET request
    this.httpClient.get<string>(apiUrl, {
      params: params,
      responseType: 'text' as 'json'
    }).subscribe({
      next: (response) => {
        if (response === 'SUCCESS') {
          this.scripts.find(script => script.name === this.displayName)!.status = 'Completed';
          alert('Script executed successfully!');
        }
        else{
          this.scripts.find(script => script.name === this.displayName)!.status = 'Errored';
        alert('Received Failure.');
        }
      },
      error: (error) => {
        this.scripts.find(script => script.name === this.displayName)!.status = 'Errored';
        console.error('Error executing script:', error);
        alert('An error occurred while executing the script.');
      },
      complete: () => {
        console.log('Request completed.');
      }
    });

  }

  public populateObject() {
    let script_name = this.sharedService.getSelectedScript().scriptName;
    this.displayName = this.sharedService.getSelectedScript().name;
    let parameters ='';

    const args: Argument[] = this.sharedService.getSelectedScriptProp().userArguments;

    const concatenatedString = args
    .filter(arg => arg.name !== 'Server IP')
    .map(arg => arg.value)
    .join(' ');

    parameters = concatenatedString;
    this.hostName = this.sharedService.getSelectedScriptProp().userArguments.find(arg => arg.name === 'Server IP')?.value ?? '';
    let server_type = "UNIX";

    console.log("execute script " + script_name + " , " + parameters + " , " + this.hostName + " , " + server_type);
    this.scripts.find(script => script.name === this.displayName)!.status = 'Processing';


    // API URL
    const apiUrl = 'http://ussmfedt160035.am.bm.net:5000/execute'; // Replace with your backend URL


    // Create HttpParams object
    const params = new HttpParams()
      .set('script_name', script_name)
      .set('server_type', server_type)
      .set('hostname',this.hostName)
      .set('parameters', parameters);


    return { apiUrl, params };
  }

   addScript(script: Script): void {
    this.scripts.push(script);
    console.log('Script added:', script);
  }

  getAllScripts(): Script[] {
    return this.scripts;
  }

  removeScript(scriptName: string): void {
    this.scripts = this.scripts.filter(script => script.name !== scriptName);
    console.log(`Script removed: ${scriptName}`);
  }

  populateSelectedScript(scriptName:string):void{
    const selectedScript = this.scripts.find(script => script.name == scriptName);
    if (selectedScript) {
      this.sharedService.setSelectedScript(selectedScript);
    }

  }

  onRowClick(index: number): void {
    console.log('rowSelected emitted:', this.scripts[index]);
    this.populateSelectedScript(this.scripts[index].name);
    this.populateAdditionalProps(this.scripts[index].name);
    this.rowSelected.emit();
    this.selectedIndex = index;
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }


  initializeScriptsProps(): void {
    this.scriptProps = [
      {
        name: 'OS Performance',
        id: 1,
        userArguments: [
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: 'OSPerformance.txt',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: 'ussmfedt160036.am.bm.net',
              isMandatory: true }
        ],
        hits: 1500,
        rating: 3,
        likes: 250,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Rohan K","Shankar Jain"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
      },
      {
        name: 'Cleanup Script',
        id: 2,
        userArguments: [
          { name: 'inputPath',
            description: 'Path to the input data directory',
            value: '/data/input/',
            isMandatory: true },
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: 'MeterInstalled_User.txt',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: '10.6.160.35',
              isMandatory: true }
        ],
        hits: 103,
        rating: 2,
        likes: 2,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Shankar Jain", "Meera Naik"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
      },
      {
        name: 'Deployment Script',
        id: 3,
        userArguments: [
          { name: 'inputPath',
            description: 'Path to the input data directory',
            value: '/data/input/',
            isMandatory: true },
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: 'SampleOutput_User.txt',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: '10.6.160.35',
              isMandatory: true }
        ],
        hits: 9,
        rating: 3,
        likes: 2,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Shankar Jain", "Meera Naik"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
      },
      {
        name: 'Report Generator',
        id: 4,
        userArguments: [
          { name: 'inputPath',
            description: 'Path to the input data directory',
            value: '/data/input/',
            isMandatory: true },
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: 'SampleOutput_User.txt',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: '10.6.160.35',
              isMandatory: true }
        ],
        hits: 100,
        rating: 4,
        likes: 20,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Shankar Jain", "Meera Naik"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
      },
      {
        name: 'Database Migration',
        id: 5,
        userArguments: [
          { name: 'inputPath',
            description: 'Path to the input data directory',
            value: '/data/input/',
            isMandatory: true },
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: 'SampleOutput_User.txt',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: '10.6.160.35',
              isMandatory: true }
        ],
        hits: 100,
        rating: 4,
        likes: 20,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Shankar Jain", "Meera Naik"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
      },
      {
        name: 'Log Archiver',
        id: 6,
        userArguments: [
          { name: 'inputPath',
            description: 'Path to the input data directory',
            value: '/data/input/',
            isMandatory: true },
          { name: 'outputPath',
            description: 'Path to the output data directory',
            value: '/data/output/',
            isMandatory: true },
            { name: 'Server IP',
              description: 'IP address of server.',
              value: '10.6.160.35',
              isMandatory: true }
        ],
        hits: 15,
        rating: 2,
        likes: 2,
        comments: [
          {
            commentBy: 'Alice',
            comment: 'Great script for data processing!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bob',
            comment: 'Needs optimization for large datasets.',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Swami Renkat"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0],
      },
      {
        name: 'Add Two Numbers',
        id: 7,
        userArguments: [
          { name: 'First Number',
            description: 'Enter First Number',
            value: '2',
            isMandatory: true },
          { name: 'Second Number',
            description: 'Enter Second Number',
            value: '3',
            isMandatory: true },
          { name: 'Server IP',
              description: 'IP address of server.',
              value: 'ussmfedt160036.am.bm.net',
              isMandatory: true }
        ],
        hits: 152,
        rating: 5,
        likes: 21,
        comments: [
          {
            commentBy: 'Deb',
            comment: 'Great script for addition!',
            date: new Date('2024-11-10T10:15:00Z').toISOString()
          },
          {
            commentBy: 'Bake',
            comment: 'Must use script',
            date: new Date('2024-11-11T14:30:00Z').toISOString()
          }
        ],
        developers: ["Rohan K","Shankar Jain"],
        lastModified: new Date("10-10-24").toISOString().split('T')[0],
      }
    ];
  }

  populateAdditionalProps(scriptName:string){
       const script = this.scriptProps.find((script) => script.name === scriptName);
       if(script){
        this.selectedScriptProp = script;
        this.sharedService.setSelectedScriptProp(this.selectedScriptProp);
       }

  }

  enableUpload(){
    this.isUploadEnabled = true;
  }

  disableUpload(){
    this.isUploadEnabled = false;
  }

  enableAudit(){
    this.isAuditEnabledEvent.emit();
  }

}
