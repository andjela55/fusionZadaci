import { Component, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent {
  response: boolean = false;
  @Output() onClickYesEvent: Subject<void> = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  closeDialog() {
    this.dialogRef.close(this.response);
  }
  onClickYes() {
    this.response = true;
    console.log('vratio sam true');
    this.closeDialog();
    this.onClickYesEvent.next();
  }
  onClickNo() {
    this.response = false;
    console.log('vratio sam false');
    this.closeDialog();
  }
}
