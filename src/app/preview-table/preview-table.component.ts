import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-table.component.html',
  styleUrl: './preview-table.component.css'
})
export class PreviewTableComponent {
  rows: any[] = [];
  errors: string[] = [];

  constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        const state = navigation.extras.state as { data: any[] };
        console.log('state', state);
        if (state && state.data) {
          this.rows = state.data;
          console.log('this.rows', this.rows);
          this.errors = this.validateRows(this.rows);
        } else {
          console.log('No data found in state');
        }
      } else {
        console.log('Navigation or state is undefined');
      }
  }

  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation?.extras?.state) {
  //     const state = navigation.extras.state as { data: any[] };
  //     console.log('state', state);
  //     if (state && state.data) {
  //       this.rows = state.data;
  //       console.log('this.rows', this.rows);
  //       this.errors = this.validateRows(this.rows);
  //     } else {
  //       console.log('No data found in state');
  //     }
  //   } else {
  //     console.log('Navigation or state is undefined');
  //   }
  // }

  validateRows(data: any[]): string[] {
    const errors: string[] = [];
    const headers = ['Name', 'Email', 'PhoneNumber', 'City', 'Address', 'GPA'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const gpaRegex = /^([0-9](\.\d{1,2})?|10(\.0{1,2})?)$/;

    data.forEach((row, rowIndex) => {
      row.errors = {}; // Initialize error object for each row
      headers.forEach((header) => {
        if (!row[header]) {
          errors.push(`Row ${rowIndex + 1}: ${header} cannot be empty`);
          row.errors[header] = 'Empty value';
        } else {
          switch (header) {
            case 'Email':
              if (!emailRegex.test(row[header])) {
                errors.push(`Row ${rowIndex + 1}: Invalid Email format`);
                row.errors[header] = 'Invalid format';
              }
              break;
            case 'PhoneNumber':
              if (!phoneRegex.test(row[header])) {
                errors.push(`Row ${rowIndex + 1}: Phone number must be a 10 digit number`);
                row.errors[header] = 'Invalid format';
              }
              break;
            case 'GPA':
              if (!gpaRegex.test(row[header])) {
                errors.push(`Row ${rowIndex + 1}: GPA must be a float between 0 and 10`);
                row.errors[header] = 'Invalid format';
              }
              break;
            default:
              if (typeof row[header] !== 'string') {
                errors.push(`Row ${rowIndex + 1}: ${header} must be a string`);
                row.errors[header] = 'Invalid format';
              }
              break;
          }
        }
      });
    });

    return errors;
  }

  onNext(): void {
    this.router.navigate(['/summary'], { state: { data: this.rows, errors: this.errors } });
  }
}
  
