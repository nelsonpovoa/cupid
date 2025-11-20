import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd, Event } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
// FIX: Using 'rxjs' for operator imports to ensure correct type inference with RxJS type guards.
import { filter, map } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgOptimizedImage],
})
export class AppComponent {
  private authService = inject(AuthService);
  // FIX: Explicitly type the injected Router to resolve type inference issues.
  private router: Router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;
  
  private routerEvents$ = this.router.events;
  private navigationEnd$ = this.routerEvents$.pipe(
    filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
  );

  showNav = toSignal(
    this.navigationEnd$.pipe(
      map(event => !event.urlAfterRedirects.includes('/login') && !event.urlAfterRedirects.includes('/register'))
    ),
    { initialValue: false }
  );
  
  currentUser = this.authService.currentUser;
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
