import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Resource } from '../../../../models/admin-course-models/course-editor-model';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-edit-resource-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormField, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-resource-dialog.component.html',
  styleUrls: ['./edit-resource-dialog.component.scss']
})
export class EditResourceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resource: Resource }
  ) {}

  save() {
    this.dialogRef.close(this.data.resource);
  }
}