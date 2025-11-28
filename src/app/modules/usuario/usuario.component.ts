import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioService } from '../../../core/services/UsuarioService';
import { Usuario } from '../../../core/models/usuario';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  form: FormGroup;
  dataSource = new MatTableDataSource<Usuario>([]);
  editId: number | null = null;

  displayedColumns: string[] = ['login', 'permissao', 'acoes'];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      permissao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: usuarios => this.dataSource.data = usuarios,
      error: err => console.error(err)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força exibir erros
      return;
    }

    const usuario: Usuario = this.form.value;

    if (this.editId !== null) {
      this.usuarioService.atualizar(this.editId, usuario).subscribe({
        next: () => {
          this.listarUsuarios();
          this.form.reset();
          this.editId = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.usuarioService.criar(usuario).subscribe({
        next: () => {
          this.listarUsuarios();
          this.form.reset();
        },
        error: err => console.error(err)
      });
    }
  }

  editar(usuario: Usuario): void {
    this.editId = usuario.id!;
    this.form.patchValue(usuario);
  }

  deletar(id: number): void {
    if (confirm('Deseja realmente excluir este usuário?')) {
      this.usuarioService.excluir(id).subscribe({
        next: () => this.listarUsuarios(),
        error: err => console.error(err)
      });
    }
  }

}
