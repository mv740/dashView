import { BuildbotService } from './buildbot.service';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Builder } from 'shared/buildbot/builder.model';
import { Observable, interval  } from 'rxjs';
import { NotificationType } from './notification-card/notification.type';
import { ServerInfo } from 'shared/buildbot/server-info.model';
import { distinct, distinctUntilChanged , share, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-buildbot-dashboard',
  templateUrl: './buildbot-dashboard.component.html',
  styleUrls: ['./buildbot-dashboard.component.css'],
})
export class BuildbotDashboardComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  @Input() builders: Observable<Builder[]>;

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
    //this.builders = this.buildbotService.getBuilders();
    // add new builder if builderid is different
    this.builders = interval(60000) // 60 secound check if new builder exist
      .pipe(
        startWith(0),
        switchMap(() => this.buildbotService.getBuilders()),
        distinctUntilChanged( (prevBuilders, newBuilders) => {
          return JSON.stringify(prevBuilders) === JSON.stringify(newBuilders);
        }),
       );
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

  trackByBuilder(index: number, item: Builder)
  {
    return item.builderid;
  }
}
