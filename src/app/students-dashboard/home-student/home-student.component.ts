import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardCourses } from '../../interfaces/students-dashboard-interfaces/dashboard-courses.interface';
import { StudentsDashboard } from '../../services/students-dashboard-services/students-dashboard.service';

@Component({
  selector: 'home-student',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss',
})
export class HomeStudentComponent implements OnInit {
  public dashboardData: DashboardHomeCourses[] = [];
  protected visible: boolean = false;
  activateSideContent: boolean = false;


  constructor(
    private dashboardHomeService: DashboardHomeService,

  ) {}
  ngOnInit(): void {
    this.dashboardHomeService.getDashboardHome().subscribe((data)=>{this.dashboardData = data});
}
 }
