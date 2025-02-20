import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-student',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss',
})
export class HomeStudentComponent {}
