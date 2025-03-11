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
    @Inject(MAT_DIALOG_DATA) public data: { itemName: string; itemType: string }
  ) {}

  confirmDelete() {
    console.log(`✅ Eliminando ${this.data.itemType}: ${this.data.itemName}`);
    this.dialogRef.close(true);
  }

  cancel() {
    console.log("❌ Eliminación cancelada.");
    this.dialogRef.close(false);
  }
}