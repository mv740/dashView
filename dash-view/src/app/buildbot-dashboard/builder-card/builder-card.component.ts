import { Builder } from 'shared/buildbot/builder.model';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Build } from 'shared/buildbot/build.model';
import { BuildbotService } from '../buildbot.service';
import { Observable, Subscription } from 'rxjs';
import { ServerInfo } from 'shared/buildbot/server-info.model';

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

  constructor(private buildbotService: BuildbotService) {
  }

  ngOnChanges(): void {
    this.infoUrl = `${this.serverInfo.url}/#/builders/${this.builderData.builderid}`;
    this.infoBuildUrl = `${this.serverInfo.url}/#/builders/${this.builderData.builderid}/builds/`;
    this.builds = this.buildbotService.getBuilderBuilds(this.builderData.builderid);
    this.buildsSubscription = this.builds.subscribe((builds) => {
      if (builds.length > 0) {
        this.errorOnLastBuild = builds[0].results !== 0;
        this.isInProgress = !builds[0].complete;
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
