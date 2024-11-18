import { UserType } from './../shared/UserTypeEnum';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared/shared.services';
import { Script } from './script.model';
import { ScriptAdditionalProps } from '../about-script/scriptAdditionalProperties.model';


@Component({
  selector: 'app-view-scripts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-scripts.component.html',
  styleUrl: './view-scripts.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ViewScriptsComponent {

  scripts: Script[] = [];
  userType!: UserType;
  selectedIndex!:Number;
  private scriptProps: ScriptAdditionalProps[] = [];

  public selectedScriptProp!: ScriptAdditionalProps;

  @Output() logoutDone = new EventEmitter<boolean>;
  @Output() rowSelected = new EventEmitter<void>;


  constructor(private sharedService: SharedService){}

  ngOnInit() {
    this.initializeScripts();
    this.initializeScriptsProps()
    this.userType = this.sharedService.getCurrentUserType();
  }

  onLogout(){
    console.log("Logour event triggered...")
    this.logoutDone.emit(true);
  }

  initializeScripts(): void {
    this.scripts = [
      {
        name: 'Backup Script', description: 'Performs system backup', type: 'Shell', status: 'Inactive',
        id: 1
      },
      {
        name: 'Cleanup Script', description: 'Cleans temporary files', type: 'Python', status: 'Inactive',
        id: 2
      },
      {
        name: 'Deployment Script', description: 'Deploys the application', type: 'Shell', status: 'Inactive',
        id: 3
      },
      {
        name: 'Report Generator', description: 'Generates daily reports', type: 'JavaScript', status: 'Inactive',
        id: 4
      },
      {
        name: 'Database Migration', description: 'Migrates database schemas', type: 'SQL', status: 'Inactive',
        id: 5
      },
      {
        name: 'Log Archiver', description: 'Archives log files', type: 'Bash', status: 'Inactive',
        id: 6
      }
    ];
  }


  executeScript(script: any): void {
    // For now, just log the script name. You can replace this with actual execution logic.
    console.log(`Executing script: ${script.name}`);
    alert(`Executing script: ${script.name}`);
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
        name: 'Backup Script',
        id: 1,
        arguments: [
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
        hits: 1500,
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
        name: 'Report Generator',
        id: 4,
        arguments: [
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
        hits: 100,
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
        arguments: [
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
        lastModified: new Date("10-10-24").toISOString().split('T')[0]
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

}
