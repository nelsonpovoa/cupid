import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink]
})
export class MatchesComponent {
  private dataService = inject(DataService);
  matches = signal<User[]>([]);

  constructor() {
    this.matches.set(this.dataService.getMatchedUsers());
  }

  getConversationId(matchId: number): number | undefined {
    const conversation = this.dataService.getConversationByParticipantId(matchId);
    return conversation?.id;
  }
}
