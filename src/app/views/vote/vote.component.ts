import { Component, OnInit } from '@angular/core'
import { VoteService } from '../../services/vote.service'
import { BehaviorSubject } from 'rxjs'
import { Initiative } from '../../models/initiative'

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  initiatives$ = new BehaviorSubject<Initiative[] | null>(null)

  constructor(private readonly voteService: VoteService) {}

  ngOnInit(): void {
    this.voteService.fetchInitiatives().then(data => {

      // TODO: Remove Timeout when figured out why GUI is not updating when BehaviourSubject changes
      setTimeout(() => {
        this.initiatives$.next(data)
      }, 2000)
    })
  }
}
