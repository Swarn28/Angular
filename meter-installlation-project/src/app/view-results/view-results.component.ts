import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MeterInstallValidateResponse } from './meter-install-validate-model';

@Component({
  selector: 'app-view-results',
  standalone: true,
  imports: [],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.css'
})
export class ViewResultsComponent {

  @Input({required:true}) installedMetersList!: string[];
  @Output() closeButtonEvent = new EventEmitter<void>();
  private httpClient = inject(HttpClient);
  validatedInstalledMeters!: MeterInstallValidateResponse[];


  onCloseButton(){
    this.closeButtonEvent.emit();
  }

  onValidateButton(){
    console.log("Starting validations...")
    this.installedMetersList.push("IRN714945");
    this.installedMetersList.push("IRN761557");
    this.installedMetersList.push("IRN405233");


    this.httpClient.post<MeterInstallValidateResponse[]>
    ('http://localhost:8080/meterAction/v1/validateMeterInstall',this.installedMetersList).subscribe({
      next: (response) => {
        this.validatedInstalledMeters = response;
        console.log("Fetched installed meters: " +this.validatedInstalledMeters);
      },
      error: (error) => {
        console.log("Error while fetching validations is : "+error);
      }
    });
  }

}
