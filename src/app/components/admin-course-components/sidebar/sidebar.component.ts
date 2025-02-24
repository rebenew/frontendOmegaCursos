import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <ul>
        <li><a routerLink="/dashboard">Dashboard</a></li>
        <li><a routerLink="/courses">Courses</a></li>
        <li><a routerLink="/courses/new">New Course</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {}







