import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  templateUrl: './error-dialog.component.html',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIcon
  ],
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string } // Recibe el mensaje de error
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

