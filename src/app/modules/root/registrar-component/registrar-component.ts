import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-registrar-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './registrar-component.html',
  styleUrls: ['./registrar-component.css']
})
export class RegistrarComponent {

}
