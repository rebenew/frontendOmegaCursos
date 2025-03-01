import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-unit-dialog',
  templateUrl: './add-unit-dialog.component.html',
  styleUrls: ['./add-unit-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatDialogModule, 
    MatProgressBarModule, 
    CommonModule, 
    FormsModule
  ]
})
export class AddUnitDialogComponent {
  resourceName: string = ''; 
  externalLink: string = ''; 
  embed: string = ''; 
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Manejo del Drag and Drop
  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedData = event.dataTransfer?.getData('text/plain');
    if (droppedData) {
      this.isLoading = true;
      setTimeout(() => {
        this.externalLink = droppedData; 
        this.isLoading = false;
      }, 1000);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Guardar y enviar los datos al CourseEditorComponent
  onSave() {
    if (this.resourceName.trim()) {
      this.dialogRef.close({
        contenido: [
          {
            ResourceName: this.resourceName,
            Link: this.externalLink,
            Embed: this.embed
          }
        ]
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
