
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  // FIX: Explicitly type the injected Router to resolve type inference issues.
  private router: Router = inject(Router);

  currentUser = this.authService.currentUser;

  get age(): number {
    const birthDate = this.currentUser()?.date_of_birth;
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
