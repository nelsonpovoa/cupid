
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Conversation, Message } from '../models/conversation.model';
import { RegisterData } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private users: User[] = [
    {
      id: 1,
      username: 'you',
      email: 'you@email.com',
      full_name: 'Seu Nome',
      date_of_birth: '1995-05-15',
      gender: 'other',
      bio: 'Amo viajar e explorar novas culturas. Em busca de conexões significativas.',
      profile_image_url: 'https://picsum.photos/seed/you/500/800',
      location: 'Lisboa, Portugal',
      hearts_balance: 1500,
      is_verified: true,
      photos: [
        { id: 1, photo_url: 'https://picsum.photos/seed/you/500/800', is_primary: true },
        { id: 2, photo_url: 'https://picsum.photos/seed/you2/500/800', is_primary: false },
      ]
    },
    {
      id: 2,
      username: 'ana',
      email: 'ana@email.com',
      full_name: 'Ana Silva',
      date_of_birth: '1998-02-20',
      gender: 'female',
      bio: 'Designer gráfica apaixonada por arte e café. Vamos criar algo bonito juntos?',
      profile_image_url: 'https://picsum.photos/seed/ana/500/800',
      location: 'Porto, Portugal',
      hearts_balance: 500,
      is_verified: true,
      photos: [
        { id: 3, photo_url: 'https://picsum.photos/seed/ana/500/800', is_primary: true },
        { id: 4, photo_url: 'https://picsum.photos/seed/ana2/500/800', is_primary: false },
        { id: 5, photo_url: 'https://picsum.photos/seed/ana3/500/800', is_primary: false },
      ]
    },
    {
      id: 3,
      username: 'bruno',
      email: 'bruno@email.com',
      full_name: 'Bruno Costa',
      date_of_birth: '1994-11-10',
      gender: 'male',
      bio: 'Engenheiro de software e músico nas horas vagas. Curto uma boa conversa e rock clássico.',
      profile_image_url: 'https://picsum.photos/seed/bruno/500/800',
      location: 'Coimbra, Portugal',
      hearts_balance: 250,
      is_verified: false,
       photos: [
        { id: 6, photo_url: 'https://picsum.photos/seed/bruno/500/800', is_primary: true },
      ]
    },
    {
      id: 4,
      username: 'carla',
      email: 'carla@email.com',
      full_name: 'Carla Dias',
      date_of_birth: '1999-07-30',
      gender: 'female',
      bio: 'Estudante de medicina, viciada em séries e adoro animais. Mostre-me seu pet!',
      profile_image_url: 'https://picsum.photos/seed/carla/500/800',
      location: 'Faro, Portugal',
      hearts_balance: 100,
      is_verified: true,
       photos: [
        { id: 7, photo_url: 'https://picsum.photos/seed/carla/500/800', is_primary: true },
        { id: 8, photo_url: 'https://picsum.photos/seed/carla2/500/800', is_primary: false },
      ]
    },
    {
      id: 5,
      username: 'diogo',
      email: 'diogo@email.com',
      full_name: 'Diogo Martins',
      date_of_birth: '1992-09-05',
      gender: 'male',
      bio: 'Chef de cozinha. Minha linguagem do amor é cozinhar para os outros. Qual o seu prato favorito?',
      profile_image_url: 'https://picsum.photos/seed/diogo/500/800',
      location: 'Lisboa, Portugal',
      hearts_balance: 800,
      is_verified: true,
       photos: [
        { id: 9, photo_url: 'https://picsum.photos/seed/diogo/500/800', is_primary: true },
        { id: 10, photo_url: 'https://picsum.photos/seed/diogo2/500/800', is_primary: false },
      ]
    }
  ];

  private conversations: Conversation[] = [
    {
      id: 1,
      name: 'Ana Silva',
      participants: [this.users[0], this.users[1]],
      last_message: { id: 1, sender_id: 2, content: 'Olá! Adorei seu perfil :)', create_time: '2023-10-27T10:00:00Z', message_type: 'text' },
      unread_count: 1
    },
    {
      id: 2,
      name: 'Carla Dias',
      participants: [this.users[0], this.users[3]],
      last_message: { id: 2, sender_id: 1, content: 'Que tal um café qualquer dia?', create_time: '2023-10-26T15:30:00Z', message_type: 'text' },
      unread_count: 0
    }
  ];

  constructor() {}

  getMockUsers(): User[] {
    return this.users;
  }

  getDiscoverUsers(): User[] {
    // Return all users except the logged-in one (id: 1)
    return this.users.filter(u => u.id !== 1);
  }

  getMatchedUsers(): User[] {
    // Simulate matches
    return [this.users[1], this.users[3]];
  }
  
  getConversations(): Conversation[] {
    return this.conversations;
  }

  getConversationById(id: number): { conversation: Conversation, messages: Message[] } | undefined {
    const conversation = this.conversations.find(c => c.id === id);
    if (!conversation) return undefined;

    const messages: Message[] = [
        { id: 1, sender_id: 2, content: 'Olá! Adorei seu perfil :)', create_time: '2023-10-27T10:00:00Z', message_type: 'text' },
        { id: 2, sender_id: 1, content: 'Obrigado! O seu também é muito interessante. Gostei das fotos de viagem!', create_time: '2023-10-27T10:05:00Z', message_type: 'text' },
        { id: 3, sender_id: 2, content: 'Qual foi o seu lugar favorito até agora?', create_time: '2023-10-27T10:06:00Z', message_type: 'text' },
    ];
    
    return { conversation, messages };
  }
  
  getConversationByParticipantId(userId: number): Conversation | undefined {
    // Assuming the current user (id: 1) is always part of the conversation
    return this.conversations.find(c => c.participants.some(p => p.id === userId && p.id !== 1));
  }

  addUser(data: RegisterData): User {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
        id: newId,
        username: data.username,
        email: data.email,
        full_name: data.fullName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender,
        bio: `Olá! Sou novo(a) por aqui.`,
        profile_image_url: `https://picsum.photos/seed/${data.username}/500/800`,
        location: 'Portugal',
        hearts_balance: 100, // starting bonus
        is_verified: false,
        photos: [
            { id: newId * 10, photo_url: `https://picsum.photos/seed/${data.username}/500/800`, is_primary: true }
        ]
    };
    this.users.push(newUser);
    return newUser;
  }
}
