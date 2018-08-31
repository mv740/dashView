
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildbotDashboardComponent } from './buildbot-dashboard.component';

describe('BuildbotDashboardComponent', () => {
  let component: BuildbotDashboardComponent;
  let fixture: ComponentFixture<BuildbotDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildbotDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildbotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
