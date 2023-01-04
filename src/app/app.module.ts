import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './views/home/home.component'
import { CoreModule } from './core/core.module'
import { VoteComponent } from './views/vote/vote.component'
import { ResultsComponent } from './views/results/results.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
