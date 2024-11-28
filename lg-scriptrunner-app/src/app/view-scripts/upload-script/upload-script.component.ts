import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { ScriptInput } from './script.input.model';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../shared/shared.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ValidationResponse } from '../../shared/validation-response-model';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  selector: 'app-upload-script',
  templateUrl: './upload-script.component.html',
  styleUrls: ['./upload-script.component.css']
})
export class UploadScriptComponent {

  uploadedFileName: string | null = null;
  scriptInput: ScriptInput = {
    name: '',
    id: 0,
    description: '',
    type: '',
    scriptName: '',
    arguments: 0,
    developers: [],
  };

  @Input({required:true}) isUploadEnabled: boolean = false;
  @Output() isUploadDisabled = new EventEmitter<void>();
  private httpClient = inject(HttpClient);


  isSubmitButtonDisabled:boolean = true;

  constructor(private sharedService: SharedService){}

//  uploadedFileName = '';

  closeDialog(): void {
    this.isUploadEnabled = false;
    this.isUploadDisabled.emit();
    this.uploadedFileName='';
    this.isSubmitButtonDisabled = true;

  }

  /* onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.uploadedFileName = input.files[0].name;
    }
  } */

  async uploadFile(): Promise<void> {
    if (this.uploadedFileName) {
      await this.sleep(3000);
      alert('Uploading file Done');
      //this.closeDialog();
    } else {
      alert('Please select a file first.');
    }
  }

  async validateFile(): Promise<void> {
    if (this.uploadedFileName) {
      this.validateFileCall(this.uploadedFileName,"2");

    } else {
      alert('Please select a file first.');
    }
  }

  sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  saveForm(): void {
    this.scriptInput.id = Date.now(); // Generate a unique ID (timestamp-based)
    console.log('Saving script input:', this.scriptInput);
    alert('Form submitted successfully!');
    // Further logic to handle the submitted form data (e.g., send to backend)
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFileName = input.files[0].name;
      console.log('File selected:', this.uploadedFileName);
    } else {
      this.uploadedFileName = null;
    }
  }

  updateDevelopers(inputValue: string): void {
    if (inputValue) {
      this.scriptInput.developers = inputValue.split(',').map(dev => dev.trim());
    } else {
      this.scriptInput.developers = [];
    }
  }


  onSubmit(){
    alert("Submitting..")
  }

  validateFileCall(fileName:string, num_params: string):void{
    let baseUrl = 'http://ussmfedt160035.am.bm.net:5000/validate';
    const params = new HttpParams()
    .set('script_name', fileName)
    .set('num_params', num_params);

    this.httpClient.get<ValidationResponse>(baseUrl, {
      params: params,
    }).subscribe({
      next: (response) => {
       if(response.result === 'SUCCESS'){
        this.isSubmitButtonDisabled = false;
        alert("Congrats Validation Done !!");
       }
       else{
        this.isSubmitButtonDisabled = true;
        alert("Validation Failed: " +response.msg);
       }
      },
      error: (error) => {
        console.error('Error executing script:', error);
        alert('An error occurred.');
      },
      complete: () => {
        console.log('Request completed.');
      }
    });
}

}
