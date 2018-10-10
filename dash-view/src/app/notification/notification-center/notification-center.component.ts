import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { NotificationService } from '../notification.service';
import { take, takeUntil } from 'rxjs/operators';

export interface NotificationData {
  messages: Array<string>;
}

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
})
export class NotificationCenterComponent implements OnInit {

  messages: Array<string> = [];

  constructor(public dialog: MatDialog, private notificationService: NotificationService) {
    this.notificationService.notification.subscribe(newMessage =>
      this.updateNotification(newMessage),
    );
  }

  private updateNotification(message: string): void {

    if (!this.messages.includes(message)) {
      this.messages.unshift(message);
    }
  }



  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      height: '80%',
      width: '500px',
      panelClass: ['notificationPanel'],
      data: this.messages,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}
