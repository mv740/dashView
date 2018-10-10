import { Builder } from 'shared/buildbot/builder.model';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Build } from 'shared/buildbot/build.model';
import { BuildbotService } from '../buildbot.service';
import { interval, Observable, Subscription, from } from 'rxjs';
import { concatMap, distinct, distinctUntilChanged, flatMap, share, startWith, switchMap } from 'rxjs/operators';

import { ServerInfo } from 'shared/buildbot/server-info.model';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder-card.component.html',
  styleUrls: ['./builder-card.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class BuilderCardComponent implements OnChanges, OnDestroy {
  errorOnLastBuild: boolean;
  isInProgress: boolean;
  @Input() builderData: Builder;
  builds: Observable<Array<Build>>;
  private buildsSubscription: Subscription;

  @Input('serverInfo') serverInfo: ServerInfo;
  infoUrl: string;
  infoBuildUrl: string;

  constructor(private buildbotService: BuildbotService, private notificationService: NotificationService) {
  }

  ngOnChanges(): void {
    this.infoUrl = `${this.serverInfo.url}/#/builders/${this.builderData.builderid}`;
    this.infoBuildUrl = `${this.serverInfo.url}/#/builders/${this.builderData.builderid}/builds/`;
    // https://stackoverflow.com/questions/50885262/replacing-the-share-function-for-in-rxjs6
    // without share, new subscribe will trigger secound request
   // this.builds = this.buildbotService.getBuilderBuilds(this.builderData.builderid).pipe(share());
    this.builds = interval(5000) // 20 secound check if new builder exist
      .pipe(
        startWith(0),
        switchMap(() => this.buildbotService.getBuilderBuilds(this.builderData.builderid)),
        distinctUntilChanged( (prevBuilds, newBuilds) => {
          return JSON.stringify(prevBuilds) === JSON.stringify(newBuilds);
        }),
        share()
      );

    this.buildsSubscription = this.builds.subscribe((builds) => {
      if (builds.length > 0) {
        this.errorOnLastBuild = builds[0].results !== 0;
        // if complete = not in progress

        this.isInProgress = !builds[0].complete;

        console.log(this.isInProgress);
        this.notificationService.createNotification(`build ${builds[0].buildid} is in progress`);
        if (builds[0].complete) {
          console.log('BUILD IN PROGRESS');
          this.notificationService.createNotification(`build ${builds[0].buildid} is complete`);
        }
      }
    });
  }

  getColor(status: number): string {

    return status === 0 ? '#00c292' : '#e46a76';
  }

  getStatusIcon(status: number): string {
    return status === 0 ? 'check_circle_outline' : 'highlight_off';
  }

  /**
   * https://stackoverflow.com/questions/25534721/angularjs-unixtime-to-datetime-format-with-date-filter-failed
   * @param unixtime
   */
  unixTimeToDateConverter(unixtime: number): number {
    return unixtime * 1000;
  }

  openBuild($event, buildID: number) {
    window.open(this.infoBuildUrl.concat(buildID.toString()));
  }

  ngOnDestroy(): void {
    this.buildsSubscription.unsubscribe();
  }
}
