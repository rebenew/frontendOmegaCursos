import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressCirculeComponent } from '../../common/progress-circule.component';



@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  
  @Input() course: any;
  showButton = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('Datos recibidos en CardComponent:', this.course);
  }

  goToCourse() {
    if (this.course && this.course.id) {
      this.router.navigate(['/dashboard_mentor/course', this.course.id]);
    } else {
      console.error('Error: No hay ID en el curso', this.course);
    }
  }
}
