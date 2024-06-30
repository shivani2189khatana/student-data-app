import { Component,Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-csv',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './upload-csv.component.html',
  styleUrl: './upload-csv.component.css'
})
export class UploadCsvComponent {
    selectedFile: File | null = null;
    errorMessage: string | null = null;
    file: File | null = null;
    fileUrl: string = '';

    constructor(private router: Router) {}
  
    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file && file.name.endsWith('.csv')) {
        this.selectedFile = file;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Please upload a valid CSV file.';
      }
      const fileNameDisplay = document.getElementById('fileNameDisplay');
      if (fileNameDisplay) {
        fileNameDisplay.textContent = file.name; // Display filename
      }
    }
  
    onUpload(): void {
      if (this.selectedFile) {
        this.readFile(this.selectedFile);
      } else {
        this.errorMessage = 'No file selected.';
      }
    }
  
    readFile(file: File): void {
      Papa.parse(file, {
        complete: (result) => {
          console.log('result',result.data);
          
          const data = result.data;
          const errors = this.validateCsvData(data);
          console.log('err',errors);
          
          if (errors.length > 0) {
            this.errorMessage = 'CSV file contains errors. Please correct them and try again.';
          } else {
            console.log('datadatafor r',data);
            
            this.router.navigate(['/preview'], { state: { data } });
          }
        },
        header: true,
        skipEmptyLines: true
      });
    }
  
    validateCsvData(data: any[]): string[] {
      const errors: string[] = [];
      const headers = ['Name', 'Email', 'PhoneNumber', 'City', 'Address', 'GPA'];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
      const gpaRegex = /^([0-9](\.\d{1,2})?|10(\.0{1,2})?)$/;
  console.log('datadata',data);
  
      data.forEach((row, rowIndex) => {
        headers.forEach((header) => {
          console.log('rowIndex + 1',rowIndex,row[header],'bhjgkjhkj',header);
          
          if (!header) {
            errors.push(`Row ${rowIndex + 1}: ${header} cannot be empty`);
          } else {
            switch (header) {
              case 'Email':
                if (!emailRegex.test(row[header])) {
                  errors.push(`Row ${rowIndex + 1}: Invalid Email format`);
                }
                break;
              case 'PhoneNumber':
                console.log('row[header]',data[rowIndex]);
                
                if (!phoneRegex.test(row[header])) {
                  errors.push(`Row ${rowIndex + 1}: Phone number must be a 10 digit number`);
                }
                break;
              case 'GPA':
                if (!gpaRegex.test(row[header])) {
                  errors.push(`Row ${rowIndex + 1}: GPA must be a float between 0 and 10`);
                }
                break;
              default:
                // String validation for other fields
                if (typeof row[header] !== 'string') {
                  errors.push(`Row ${rowIndex + 1}: ${header} must be a string`);
                }
                break;
            }
          }
        });
      });
  
      return errors;
    }

    onUrlUpload(): void {
      if (this.fileUrl) {
        // Process the file from the URL (e.g., fetch its content, upload it, etc.)
        console.log('File URL:', this.fileUrl);
        // Navigate to the preview page with the file URL data
        this.router.navigate(['/preview'], { state: { fileUrl: this.fileUrl } });
      } else {
        this.errorMessage = 'Please enter a valid URL to upload.';
      }
    }
    close(): void {
      // Close the upload dialog (you can implement your own logic here)
    }
  }
  
  
