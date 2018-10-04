import { BuildbotService } from './buildbot.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Builder } from 'shared/buildbot/builder.model';
import { Observable } from 'rxjs';
import { NotificationType } from './notification-card/notification.type';
import { ServerInfo } from 'shared/buildbot/server-info.model';

@Component({
  selector: 'app-buildbot-dashboard',
  templateUrl: './buildbot-dashboard.component.html',
  styleUrls: ['./buildbot-dashboard.component.css'],
})
export class BuildbotDashboardComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  builders: Observable<Builder[]>;

  breakpoint: number;
  NotificationType = NotificationType;
  buildBotServerInfo: ServerInfo;

  // tslint:disable-next-line:max-line-length
  constructor(private breakpointObserver: BreakpointObserver, private readonly buildbotService: BuildbotService) {
    // called first time before the ngOnInit()
    this.buildbotService.getServerInfo().subscribe((value => {
      this.buildBotServerInfo = value;
      console.log(this.buildBotServerInfo);
    } ));
  }

  ngOnInit() {
    // called after the constructor and called  after the first ngOnChanges()
    this.breakpoint = this.GetGridListCol(window.innerWidth);
    this.builders = this.buildbotService.getBuilders();
  }

  onResize(event) {
    this.breakpoint = this.GetGridListCol(event.target.innerWidth); // (event.target.innerWidth <= 400) ? 1 : 6;
  }

  // TODO add extra rules
  GetGridListCol(width) {
    console.log(`width : ${width}`);
    if (width <= 2000 && 1050 < width) {
      // if using 1920 sometime we get width = 1922
      // 1080p screen
      return 4;
    }


    if (width <= 1050 && 960 < width) {
      // 720p screen
      return 3;
    }

    if (width <= 960 && 400 < width) {
      // 720p screen
      return 3;
    }

    if (width <= 400) {
      return 1;
    }
    return 4;
  }
}
