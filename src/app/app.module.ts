import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './views/home/home.component'
import { CoreModule } from './core/core.module'
import { VoteComponent } from './views/vote/vote.component'
import { ResultsComponent } from './views/results/results.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button'
import { InitiativeComponent } from './views/vote/initiative/initiative.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    ResultsComponent,
    InitiativeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
