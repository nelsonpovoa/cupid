
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  error = signal<string | null>(null);

  private authService = inject(AuthService);
  // FIX: Explicitly type the injected Router to resolve type inference issues.
  private router: Router = inject(Router);

  login(): void {
    if (this.authService.login(this.username(), this.password())) {
      this.router.navigate(['/discover']);
    } else {
      this.error.set('Credenciais inválidas. Tente novamente.');
    }
  }
}
