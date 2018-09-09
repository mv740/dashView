import { Builder } from 'shared/buildbot/builder.model';
import { Component, Input, OnChanges } from '@angular/core';
import { Build } from 'shared/buildbot/build.model';
import { BuildbotService } from '../buildbot.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder-card.component.html',
  styleUrls: ['./builder-card.component.css'],
})
export class BuilderCardComponent implements OnChanges {

  isActive: boolean;
  @Input() builderData: Builder;
  builds: Observable<Build[]>;

  constructor(private buildbotService: BuildbotService) {
  }

  ngOnChanges() {
    this.builds = this.buildbotService.getBuilderBuilds(this.builderData.builderid);
  }

}
