import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminCursoListComponent } from "./components/admin-curso-list/admin-curso-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminCursoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'omega';
}
