import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-scripts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-scripts.component.html',
  styleUrl: './view-scripts.component.css'
})
export class ViewScriptsComponent {
  scripts = [
    {
      name: 'Backup Script',
      description: 'Performs system backup',
      type: 'Shell',
      lastModified: '2024-11-05',
      status: 'Active'
    },
    {
      name: 'Cleanup Script',
      description: 'Cleans temporary files',
      type: 'Python',
      lastModified: '2024-11-03',
      status: 'Inactive'
    },
    {
      name: 'Deployment Script',
      description: 'Deploys the application',
      type: 'Shell',
      lastModified: '2024-10-28',
      status: 'Active'
    },
    {
      name: 'Report Generator',
      description: 'Generates daily reports',
      type: 'JavaScript',
      lastModified: '2024-10-20',
      status: 'Active'
    },
    {
      name: 'Database Migration',
      description: 'Migrates database schemas',
      type: 'SQL',
      lastModified: '2024-11-01',
      status: 'Pending'
    },
    {
      name: 'Log Archiver',
      description: 'Archives log files',
      type: 'Bash',
      lastModified: '2024-11-02',
      status: 'Completed'
    }
  ];

  executeScript(script: any): void {
    // For now, just log the script name. You can replace this with actual execution logic.
    console.log(`Executing script: ${script.name}`);
    alert(`Executing script: ${script.name}`);
  }
}
