import { ValidationResponse } from './validation-response-model';
import { inject, Injectable } from "@angular/core";
import { UserType } from "./UserTypeEnum";
import { Script } from "../view-scripts/script.model";
import { ScriptAdditionalProps } from "../about-script/scriptAdditionalProperties.model";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class SharedService{

  private currentUserType!: UserType;
  private selectedScript!: Script;
  private selectedScriptProp!: ScriptAdditionalProps;
  private httpClient = inject(HttpClient);


  setCurrentUserType(userType: UserType){
    this.currentUserType = userType;
  }

  getCurrentUserType():UserType{
    return this.currentUserType;
  }

  getSelectedScript(): Script{
    return this.selectedScript;
  }

  setSelectedScript(selScript: Script){
    this.selectedScript = selScript;
  }

  getSelectedScriptProp(): ScriptAdditionalProps {
    return this.selectedScriptProp;
  }
  setSelectedScriptProp(value: ScriptAdditionalProps) {
    this.selectedScriptProp = value;
  }

  downloadFile(fileName: string): void {
    let baseUrl = 'http://localhost:8080/v1/executor';
    const url = `${baseUrl}/download?fileName=${encodeURIComponent(fileName)}`;
    this.httpClient
      .get(url, { responseType: 'blob' }) // Expecting a binary file (Blob)
      .subscribe({
        next: (blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = fileName; // Set the filename for download
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a); // Clean up after download
        },
        error: (err) => {
          console.error('Error downloading the file:', err);
          alert('Failed to download file. Please try again.');
        },
      });
  }

}
