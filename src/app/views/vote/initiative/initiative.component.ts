import { Component, Input, OnInit } from '@angular/core'
import { Initiative } from '../../../models/initiative'

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit{
  @Input() initiative: Initiative | null = null
  @Input() isResult: boolean = false
  yesPercent: number = 0

  ngOnInit(): void {
    console.log(this.initiative)
    //this.yesPercent = (this.voteCountYes / (this.voteCountYes + this.voteCountNo)) * 100
  }
}
