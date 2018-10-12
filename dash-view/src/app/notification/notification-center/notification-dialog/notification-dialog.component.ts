import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css'],
})
export class NotificationDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public messages: Array<string>) {

  //  this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe((result) => {
      this.dialogRef.close(this.messages);
    });
  }

  ngOnInit() {
  }

  clearNotifications() {
    this.messages.splice(0, this.messages.length);
  }

  removeNotification(index: number) {
    this.messages.splice(index, 1);
  }
}
