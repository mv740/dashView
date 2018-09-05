import { IBuilder } from 'shared/buildbot/IBuilder';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder-card.component.html',
  styleUrls: ['./builder-card.component.css']
})
export class BuilderCardComponent implements OnInit {

  isActive: boolean;
  @Input() builderData: IBuilder;
  constructor() { }

  ngOnInit() {
  }

}
