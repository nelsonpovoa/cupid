
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage]
})
export class DiscoverComponent {
  private dataService = inject(DataService);
  
  users = signal<User[]>([]);
  currentIndex = signal(0);
  
  constructor() {
    this.users.set(this.dataService.getDiscoverUsers());
  }
  
  get currentProfile(): User | undefined {
    return this.users()[this.currentIndex()];
  }

  get age(): number {
    const birthDate = this.currentProfile?.date_of_birth;
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
  }

  nextProfile(liked: boolean): void {
    // In a real app, this would trigger an API call
    console.log(`Profile ${this.currentProfile?.full_name} was ${liked ? 'liked' : 'disliked'}`);
    this.currentIndex.update(i => (i + 1) % this.users().length);
  }
}
