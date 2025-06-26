import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService, Course } from '../../services/courses.service';

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Prueba de Conexión con Backend</mat-card-title>
          <mat-card-subtitle>Verificando conexión con Spring Boot</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div class="status-section">
            <h3>Estado de la Conexión:</h3>
            <div class="status-indicator" [class.connected]="isConnected" [class.disconnected]="!isConnected">
              <span class="status-dot"></span>
              {{ isConnected ? 'Conectado' : 'Desconectado' }}
            </div>
          </div>

          <div class="actions-section">
            <button mat-raised-button color="primary" (click)="testConnection()" [disabled]="loading">
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              {{ loading ? 'Probando...' : 'Probar Conexión' }}
            </button>
            
            <button mat-raised-button color="accent" (click)="loadCourses()" [disabled]="loading">
              Cargar Cursos
            </button>
          </div>

          <div class="results-section" *ngIf="courses.length > 0">
            <h3>Cursos Encontrados ({{ courses.length }}):</h3>
            <div class="courses-grid">
              <mat-card *ngFor="let course of courses" class="course-card">
                <mat-card-header>
                  <mat-card-title>{{ course.title }}</mat-card-title>
                  <mat-card-subtitle>{{ course.modality }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>{{ course.description }}</p>
                  <p><strong>Duración:</strong> {{ course.duration }}</p>
                  <p><strong>Certificación:</strong> {{ course.certification }}</p>
                  <p><strong>Precio:</strong> ${{ course.price }}</p>
                  <div class="tags" *ngIf="course.tags && course.tags.length > 0">
                    <span class="tag" *ngFor="let tag of course.tags">{{ tag.name }}</span>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>

          <div class="error-section" *ngIf="error">
            <h3>Error:</h3>
            <p class="error-message">{{ error }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .status-section {
      margin-bottom: 20px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
    }

    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ccc;
    }

    .status-indicator.connected .status-dot {
      background-color: #4caf50;
    }

    .status-indicator.disconnected .status-dot {
      background-color: #f44336;
    }

    .actions-section {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .course-card {
      height: fit-content;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
    }

    .tag {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
    }

    .error-section {
      margin-top: 20px;
      padding: 15px;
      background-color: #ffebee;
      border-radius: 4px;
    }

    .error-message {
      color: #c62828;
      margin: 0;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class BackendTestComponent implements OnInit {
  isConnected = false;
  loading = false;
  courses: Course[] = [];
  error: string | null = null;

  constructor(
    private coursesService: CoursesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.testConnection();
  }

  testConnection() {
    this.loading = true;
    this.error = null;

    this.coursesService.testBackendConnection().subscribe({
      next: () => {
        this.isConnected = true;
        this.loading = false;
        this.snackBar.open('✅ Conexión exitosa con el backend', 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.isConnected = false;
        this.loading = false;
        this.error = 'No se pudo conectar con el backend. Asegúrate de que esté ejecutándose en http://localhost:8080';
        this.snackBar.open('❌ Error de conexión con el backend', 'Cerrar', {
          duration: 5000
        });
      }
    });
  }

  loadCourses() {
    this.loading = true;
    this.error = null;

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
        this.snackBar.open(`✅ Cargados ${courses.length} cursos`, 'Cerrar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error al cargar los cursos: ' + error.message;
        this.snackBar.open('❌ Error al cargar cursos', 'Cerrar', {
          duration: 5000
        });
      }
    });
  }
} 