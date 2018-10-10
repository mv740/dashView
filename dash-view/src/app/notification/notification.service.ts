import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  notification: Subject<string> = new Subject<string>();

  constructor() { }

  createNotification(message: string) {
    this.notification.next(message);
  }
}
