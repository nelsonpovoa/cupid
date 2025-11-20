import { Injectable, signal, inject } from '@angular/core';
import { User } from '../models/user.model';
import { DataService } from './data.service';
import { StorageService } from './storage.service';

// Define a interface para os dados do formulário de registro
export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataService = inject(DataService);
  private storageService = inject(StorageService);

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor() {
    // Check local storage for persisted login state
    const loggedIn = this.storageService.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      const user = this.dataService.getMockUsers()[0]; // Simulate getting logged in user
      this.currentUser.set(user);
      this.isLoggedIn.set(true);
    }
  }

  login(username: string, password: string): boolean {
    // In a real app, you'd call an API. Here we simulate success.
    const user = this.dataService.getMockUsers().find(u => u.username === username);
    if (user && password) { // Mock password check
      this.currentUser.set(user);
      this.isLoggedIn.set(true);
      this.storageService.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.storageService.removeItem('isLoggedIn');
  }

  register(data: RegisterData): { success: boolean, message?: string } {
    const existingUser = this.dataService.getMockUsers().find(u => u.username === data.username || u.email === data.email);
    if (existingUser) {
        return { success: false, message: 'Usuário ou e-mail já existe.' };
    }

    const newUser = this.dataService.addUser(data);
    if (newUser) {
        // Automatically log in the new user
        this.login(newUser.username, data.password);
        return { success: true };
    }
    return { success: false, message: 'Ocorreu um erro ao criar a conta.' };
  }
}
