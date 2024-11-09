import { UserType } from './../shared/UserTypeEnum';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared/shared.services';
import { Script } from './script.model';


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


  @Output() logoutDone = new EventEmitter<boolean>;
  @Output() rowSelected = new EventEmitter<void>;


  constructor(private sharedService: SharedService){}

  ngOnInit() {
    this.initializeScripts();
    this.userType = this.sharedService.getCurrentUserType();
  }

  onLogout(){
    console.log("Logour event triggered...")
    this.logoutDone.emit(true);
  }

  initializeScripts(): void {
    this.scripts = [
      { name: 'Backup Script', description: 'Performs system backup', type: 'Shell', lastModified: '2024-11-05', status: 'Inactive' },
      { name: 'Cleanup Script', description: 'Cleans temporary files', type: 'Python', lastModified: '2024-11-03', status: 'Inactive' },
      { name: 'Deployment Script', description: 'Deploys the application', type: 'Shell', lastModified: '2024-10-28', status: 'Inactive' },
      { name: 'Report Generator', description: 'Generates daily reports', type: 'JavaScript', lastModified: '2024-10-20', status: 'Inactive' },
      { name: 'Database Migration', description: 'Migrates database schemas', type: 'SQL', lastModified: '2024-11-01', status: 'Inactive' },
      { name: 'Log Archiver', description: 'Archives log files', type: 'Bash', lastModified: '2024-11-02', status: 'Inactive' }
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
    this.rowSelected.emit();
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }
}
