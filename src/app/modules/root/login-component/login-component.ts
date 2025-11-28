import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../../core/services/auth-service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login-component',
  standalone: true,
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,

    RouterLink
  ]
})
export class LoginComponent {
  form: FormGroup;
  mostrarSenha = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const dadosLogin = this.form.value;

    this.authService.login(dadosLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response.token);
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Usuário ou senha incorretos.');
      }
    });
  }
}
