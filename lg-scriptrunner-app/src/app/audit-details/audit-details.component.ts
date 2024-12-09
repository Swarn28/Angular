import { Component, EventEmitter, Output } from '@angular/core';
import { AuditDetails } from './audit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-details.component.html',
  styleUrl: './audit-details.component.css'
})
export class AuditDetailsComponent {


  @Output() disableAuditEvent= new EventEmitter<void>();

  auditList: AuditDetails[] = [
    { startTime: '2024-10-18T10:30:00', scriptName: 'Test OS performance', userName: 'swarn.bedi@landisgyr.com', server:'us0022' },
    { startTime: '2024-11-23T11:23:03', scriptName: 'Add Two Numbers', userName: 'nishu.jain1@landisgyr.com', server:'iad1024' },
    { startTime: '2024-11-2T13:33:22', scriptName: 'Log Archiver', userName: 'prashant.chauhan1@landisgyr.com', server:'us0022' },
    { startTime: '2024-11-26T17:14:64', scriptName: '	Backup Script', userName: 'gautham.govind@landisgyr.com', server:'iad1024' },
    { startTime: '2024-10-26T08:42:12', scriptName: 'Cleanup Script', userName: 'debabrata.chakraborty1@landisgyr.com', server:'Eu65800' },
    { startTime: '2024-9-08T19:33:23', scriptName: 'Log Archiver', userName: 'prince.deepak@landisgyr.com', server:'us0022' },
    { startTime: '2024-11-26T22:24:55', scriptName: 'Deployment Script', userName: 'debabrata.chakraborty1@landisgyr.com', server:'us0022' },
    { startTime: '2024-11-16T01:54:25', scriptName: '	Report Generator', userName: 'prashant.chauhan1@landisgyr.com', server:'iad1024' },
    { startTime: '2024-21-6T21:22:42', scriptName: 'Add Two Numbers', userName: 'prince.deepak@landisgyr.com', server:'us0022' },
    { startTime: '2024-1-26T13:52:46', scriptName: 'Database Migration', userName: 'nishu.jain1@landisgyr.com', server:'us0022' },
  ];


  closeDialog() {
    this.disableAuditEvent.emit();
  }
}
