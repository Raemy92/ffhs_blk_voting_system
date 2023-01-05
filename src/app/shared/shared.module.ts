import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InitiativeComponent } from './initiative/initiative.component'
import { MatButtonModule } from '@angular/material/button'



@NgModule({
  declarations: [
    InitiativeComponent
  ],
  exports: [
    InitiativeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
