import { Component, ChangeDetectionStrategy, input, inject, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Conversation, Message } from '../../models/conversation.model';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, FormsModule]
})
export class ChatDetailComponent {
  id = input.required<string>();

  private dataService = inject(DataService);
  conversation = signal<Conversation | null>(null);
  messages = signal<Message[]>([]);
  newMessage = signal('');

  constructor() {
    // FIX: Use an effect to react to input signal changes. The constructor runs before inputs are set.
    effect(() => {
      const conversationId = parseInt(this.id(), 10);
      if (isNaN(conversationId)) {
        this.conversation.set(null);
        this.messages.set([]);
        return;
      }
      const data = this.dataService.getConversationById(conversationId);
      if (data) {
        this.conversation.set(data.conversation);
        this.messages.set(data.messages);
      } else {
        this.conversation.set(null);
        this.messages.set([]);
      }
    });
  }
  
  get otherParticipantImage(): string {
    const conv = this.conversation();
    if (!conv) return '';
    const other = conv.participants.find(p => p.id !== 1);
    return other?.profile_image_url || '';
  }

  sendMessage() {
    if (this.newMessage().trim() === '') return;
    
    const message: Message = {
      id: Date.now(),
      sender_id: 1, // Assume current user is sender
      content: this.newMessage(),
      create_time: new Date().toISOString(),
      message_type: 'text',
    };
    
    this.messages.update(msgs => [...msgs, message]);
    this.newMessage.set('');
    // Here you would also update the conversation's last_message and call an API
  }
}
