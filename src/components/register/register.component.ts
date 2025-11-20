import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterData } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink]
})
export class RegisterComponent {
  fullName = signal('');
  username = signal('');
  email = signal('');
  dateOfBirth = signal('');
  gender = signal<'male' | 'female' | 'other'>('other');
  password = signal('');
  confirmPassword = signal('');
  error = signal<string | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  register(): void {
    this.error.set(null); // Reset error
    if (this.password() !== this.confirmPassword()) {
      this.error.set('As senhas não coincidem.');
      return;
    }
    
    if (!this.fullName() || !this.username() || !this.email() || !this.dateOfBirth() || !this.password()) {
      this.error.set('Por favor, preencha todos os campos.');
      return;
    }

    const registerData: RegisterData = {
      fullName: this.fullName(),
      username: this.username(),
      email: this.email(),
      dateOfBirth: this.dateOfBirth(),
      gender: this.gender(),
      password: this.password()
    };
    
    const result = this.authService.register(registerData);
    
    if (result.success) {
      this.router.navigate(['/discover']);
    } else {
      this.error.set(result.message || 'Ocorreu um erro no cadastro.');
    }
  }
}
