import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { FuncionarioService } from '../../../core/services/FuncionarioService';
import { FuncionarioRequest } from '../../../core/models/FuncionarioRequest';
import { FuncionarioResponse } from '../../../core/models/FuncionarioResponse';
import { CargoEnum } from '../../../core/models/cargo.enum';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  form: FormGroup;

  // usando MatTableDataSource para atualizar imediatamente
  dataSource = new MatTableDataSource<FuncionarioResponse>();

  displayedColumns: string[] = ['nome', 'email', 'telefone', 'cargo', 'acoes'];

  CargoEnum = CargoEnum;
  cargoLista = Object.values(CargoEnum); // ['RECEPCIONISTA', 'GERENTE']

  editUuid: string | null = null;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cargo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionarioService.listar().subscribe({
      next: data => this.dataSource.data = data,
      error: err => console.error(err)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // mostra erros nos campos inválidos
      return;
    }

    const funcionario: FuncionarioRequest = this.form.value;

    if (this.editUuid) {
      this.funcionarioService.atualizar(this.editUuid, funcionario).subscribe({
        next: () => {
          this.listarFuncionarios();
          this.form.reset();
          this.editUuid = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.funcionarioService.criar(funcionario).subscribe({
        next: () => {
          this.listarFuncionarios();
          this.form.reset();
        },
        error: err => console.error(err)
      });
    }
  }


  editar(func: FuncionarioResponse): void {
    this.editUuid = func.uuid;
    this.form.patchValue(func);
  }

  deletar(uuid: string): void {
    if (!confirm('Deseja realmente excluir este funcionário?')) return;

    this.funcionarioService.excluir(uuid).subscribe({
      next: () => this.listarFuncionarios(),
      error: err => console.error(err)
    });
  }
}
