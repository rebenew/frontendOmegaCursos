import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeStudentComponent } from "./students-dashboard/home-student/home-student.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'omega';
}
