import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.css']
})
export class ValidationSummaryComponent {
  correctRows: number = 0;
  incorrectRows: number = 0;
  errors: string[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: any[], errors: string[] };
    if (state && state.data && state.errors) {
      this.errors = state.errors;
      this.correctRows = state.data.length - this.errors.length;
      this.incorrectRows = this.errors.length;
    }
  }

  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   const state = navigation?.extras.state as { data: any[], errors: string[] };
  //   if (state && state.data && state.errors) {
  //     this.errors = state.errors;
  //     this.correctRows = state.data.length - this.errors.length;
  //     this.incorrectRows = this.errors.length;
  //   }
  // }
}

  
