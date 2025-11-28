import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root-component',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule
  ],
  templateUrl: './root-component.html',
  styleUrls: ['./root-component.css']
})
export class RootComponent {}
