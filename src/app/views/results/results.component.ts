import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Initiative } from '../../models/initiative'
import { VoteService } from '../../services/vote.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit{
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
