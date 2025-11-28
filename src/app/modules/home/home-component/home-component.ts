import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import {MatCardModule} from '@angular/material/card';
import {NgFor} from '@angular/common';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    NgFor
  ],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],// observar
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
