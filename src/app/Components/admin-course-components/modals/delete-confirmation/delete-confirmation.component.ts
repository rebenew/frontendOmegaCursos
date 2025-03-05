import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: number }
  ) {}

  confirmDelete() {
    console.log(`✅ Confirmación de eliminación enviada para el curso ID: ${this.data.courseId}`);
    this.dialogRef.close(true); // <-- Devuelve `true` al cerrar
  }

  cancel() {
    console.log("❌ Cancelación de eliminación enviada.");
    this.dialogRef.close(false); // <-- Devuelve `false`
  }
}