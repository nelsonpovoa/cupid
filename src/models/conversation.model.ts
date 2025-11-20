
import { User } from './user.model';

export interface Message {
  id: number;
  sender_id: number;
  content: string;
  create_time: string;
  message_type: 'text' | 'image' | 'heart';
}

export interface Conversation {
  id: number;
  name: string;
  participants: User[];
  last_message: Message;
  unread_count: number;
}
