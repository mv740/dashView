import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationType } from './notification.type';
import { BuildbotService } from '../buildbot.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})

export class NotificationCardComponent implements OnInit {
  @Input() type: NotificationType;
  @Input() title: string;
  message: Observable<number>;

  constructor(private buildbotService: BuildbotService) {
    this.type = NotificationType.Warning; // Default
    this.title = 'default warning';
  }

  ngOnInit() {
    this.message = this.buildbotService.getPendingBuilds();
  }

}
