import { Component, Input, OnInit } from '@angular/core'
import { Initiative } from '../../models/initiative'
import { VoteService } from '../../services/vote.service'

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit{
  @Input() initiative: Initiative | null = null
  @Input() isResult: boolean = false
  yesPercent: number = 0

  constructor(private readonly voteService: VoteService) {
  }

  ngOnInit(): void {
    if (this.initiative) {
      const yesExact = (this.initiative?.voteCountYes/ (this.initiative?.voteCountYes + this.initiative?.voteCountNo)) * 100
      this.yesPercent = Math.round(yesExact * 100) / 100
    }
  }

  vote(value: boolean) {
    this.voteService.vote(this.initiative?.id || -1, value)
  }
}
