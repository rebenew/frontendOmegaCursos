import { Component } from '@angular/core';
import { ContainerComponent } from '../admin-components/container/container.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-user-dashboard',
  imports: [ContainerComponent],
  templateUrl: './create-user-dashboard.component.html',
  styleUrl: './create-user-dashboard.component.scss'
})
export class CreateUserDashboardComponent {
  
}
