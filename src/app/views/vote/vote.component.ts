import { Component } from '@angular/core'
import { VoteService } from '../../services/vote.service'
import { Initiative } from '../../models/initiative'

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  private initiatives: Promise<Initiative[]>

  constructor(private readonly voteService: VoteService) {
    this.initiatives = this.voteService.getInitiatives()
    console.log(this.initiatives)
  }
}
