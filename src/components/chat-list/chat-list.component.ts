
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage]
})
export class ChatListComponent {
  private dataService = inject(DataService);
  conversations = signal<Conversation[]>([]);

  constructor() {
    this.conversations.set(this.dataService.getConversations());
  }

  getOtherParticipantImage(conv: Conversation): string {
    // Assuming user id 1 is the current user
    const other = conv.participants.find(p => p.id !== 1);
    return other?.profile_image_url || 'https://picsum.photos/seed/placeholder/100/100';
  }
}
