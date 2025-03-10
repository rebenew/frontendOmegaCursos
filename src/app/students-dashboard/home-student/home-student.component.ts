import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';
import { DashboardHomeCourses } from '../../interfaces/students-dashboard-interfaces/dashboard-home.interface';
import { DashboardHomeService } from '../../services/students-dashboard-services/dashboard-home.service';

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
