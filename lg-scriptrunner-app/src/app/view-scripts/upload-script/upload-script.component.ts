import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-upload-script',
  templateUrl: './upload-script.component.html',
  styleUrls: ['./upload-script.component.css']
})
export class UploadScriptComponent {

  @Input({required:true}) isUploadEnabled: boolean = false;
  @Output() isUploadDisabled = new EventEmitter<void>();

  uploadedFileName = '';

  closeDialog(): void {
    this.isUploadEnabled = false;
    this.isUploadDisabled.emit();
    this.uploadedFileName='';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.uploadedFileName = input.files[0].name;
    }
  }

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
      await this.sleep(3000);
      alert('Validation Successfull');
      //this.closeDialog();
    } else {
      alert('Please select a file first.');
    }
  }

  sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
