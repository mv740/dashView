import { BuildbotService } from './buildbot-dashboard/buildbot.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildbotDashboardComponent } from './buildbot-dashboard/buildbot-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatChipsModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule} from '@angular/material/list';
import { BuilderCardComponent } from './buildbot-dashboard/builder-card/builder-card.component';


@NgModule({
  declarations: [
    AppComponent,
    BuildbotDashboardComponent,
    BuilderCardComponent
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
    MatChipsModule
  ],
  providers: [ BuildbotService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
