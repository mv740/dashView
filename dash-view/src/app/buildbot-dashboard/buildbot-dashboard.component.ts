import { BuildbotService } from './buildbot.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { IBuilder } from 'shared/buildbot/IBuilder';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buildbot-dashboard',
  templateUrl: './buildbot-dashboard.component.html',
  styleUrls: ['./buildbot-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildbotDashboardComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  @Input() builders: IBuilder[] = [];

  breakpoint: number;

  // tslint:disable-next-line:max-line-length
  constructor(private changeDetectorRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private readonly buildbotService: BuildbotService) {
    // called first time before the ngOnInit()
  }
  ngOnInit() {
    // called after the constructor and called  after the first ngOnChanges()
    this.breakpoint = this.GetGridListCol(window.innerWidth);

    this.buildbotService.getBuilds().subscribe(result => {
      for (const value of result.builders) {
        console.log(value.name);
        this.builders.push(value);
      }
      this.changeDetectorRef.detectChanges();
    });
  }
  onResize(event) {
    this.breakpoint = this.GetGridListCol(event.target.innerWidth); // (event.target.innerWidth <= 400) ? 1 : 6;
  }

  // TODO add extra rules
  GetGridListCol(width) {
    if (width <= 1920 && 960 < width) {
      // 1080p screen
      return 5;
    }

    if (width <= 960 && 400 < width) {
      // 720p screen
      return 3;
    }

    if (width <= 400) {
      return 1;
    }
    return 6;
  }
}
