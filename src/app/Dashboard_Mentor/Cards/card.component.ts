import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  
  @Input() course: any;
  @Input() mentorId: any;
  
  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('Datos recibidos en CardComponent:', this.course);
  }

  goToCourse() {
    if (this.course?.id && this.mentorId) {
      this.router.navigate([`/dashboard_mentor/${this.mentorId}/course/${this.course.id}`]);
    } else {
      console.error('Error: No hay ID de curso o mentor', this.mentorId);
    }
  }
}
