import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-resource-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-resource-dialog.component.html',
})
export class EditResourceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveChanges(): void {
    this.dialogRef.close(this.data.resource);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}