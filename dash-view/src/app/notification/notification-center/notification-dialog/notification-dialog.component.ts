import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public messages: Array<string>) {}

  ngOnInit() {
  }

  private clearNotifications() {
    this.messages.splice(0, this.messages.length);
  }

  private removeNotification(index: number) {
    this.messages.splice(index, 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
