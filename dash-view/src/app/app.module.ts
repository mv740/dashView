import { BuildbotService } from './buildbot-dashboard/buildbot.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildbotDashboardComponent } from './buildbot-dashboard/buildbot-dashboard.component';
import {
  MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatChipsModule, MatDialogModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule} from '@angular/material/list';
import { BuilderCardComponent } from './buildbot-dashboard/builder-card/builder-card.component';
import { NotificationCardComponent } from './notification/notification-card/notification-card.component';
import { NotificationDialogComponent } from './notification/notification-center/notification-dialog/notification-dialog.component';
import { NotificationCenterComponent } from './notification/notification-center/notification-center.component';


@NgModule({
  declarations: [
    AppComponent,
    BuildbotDashboardComponent,
    BuilderCardComponent,
    NotificationCardComponent,
    NotificationDialogComponent,
    NotificationCenterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    LayoutModule,
    MatChipsModule,
    MatDialogModule
  ],
  entryComponents: [
    NotificationDialogComponent
  ],
  providers: [ BuildbotService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
