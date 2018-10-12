import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { NotificationService } from '../notification.service';
import { take, takeUntil } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

// export interface NotificationData {
//   messages: Array<string>;
// }

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
})
export class NotificationCenterComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  messageSubscription: Subscription;

  constructor(public dialog: MatDialog, private notificationService: NotificationService) {
    this.messageSubscription = this.notificationService.notification.subscribe(newMessage => {
        console.log('notification triggered');
        this.updateNotification(newMessage);
      },
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
      console.log(`result => ${JSON.stringify(result)}`);
      this.messages = result;
      // this.animal = result;
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }


}
