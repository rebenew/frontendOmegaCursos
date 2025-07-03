import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    standalone: true, // ← Agregar esta línea
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
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
      this.router.navigate([`/course/${this.course.id}`], {
        queryParams: { mentorId: this.mentorId }
      });
    }
  }
}
    
