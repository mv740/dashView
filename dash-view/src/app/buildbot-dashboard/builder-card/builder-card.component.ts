import { Builder } from 'shared/buildbot/builder.model';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Build } from 'shared/buildbot/build.model';
import { BuildbotService } from '../buildbot.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder-card.component.html',
  styleUrls: ['./builder-card.component.css'],
})
export class BuilderCardComponent implements OnChanges, OnDestroy {

  ErrorOnLastBuild: boolean;
  @Input() builderData: Builder;
  builds: Observable<Array<Build>>;
  private buildsSubscription: Subscription;

  constructor(private buildbotService: BuildbotService) {
  }

  ngOnChanges(): void {
    this.builds = this.buildbotService.getBuilderBuilds(this.builderData.builderid);
    this.buildsSubscription = this.builds.subscribe((builds) => {
      if (builds.length > 0) {
        this.ErrorOnLastBuild = builds[0].results !== 0;
      }
    });
  }

  getColor(status: number): string {

    return status === 0 ? 'green' : 'red';
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

  ngOnDestroy(): void {
    this.buildsSubscription.unsubscribe();
  }
}
