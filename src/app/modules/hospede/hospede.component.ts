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

import { HospedeService } from '../../../core/services/HospedeService';
import { HospedeRequest } from '../../../core/models/HospedeRequest';
import { HospedeResponse } from '../../../core/models/HospedeResponse';

@Component({
  selector: 'app-hospede',
  templateUrl: './hospede.component.html',
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
    MatIconModule  // ✅ ícones do Angular Material
  ],
  styleUrls: ['./hospede.component.css']
})
export class HospedeComponent implements OnInit {

  form: FormGroup;
  dataSource = new MatTableDataSource<HospedeResponse>();
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'acoes'];
  editUuid: string | null = null;

  constructor(private fb: FormBuilder, private hospedeService: HospedeService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarHospedes();
  }

  listarHospedes(): void {
    this.hospedeService.listar().subscribe({
      next: data => this.dataSource.data = data,  // atualiza a tabela imediatamente
      error: err => console.error(err)
    });
  }

  salvar(): void {
    if (this.form.invalid) return;

    const hospede: HospedeRequest = this.form.value;

    if (this.editUuid) {
      this.hospedeService.atualizar(this.editUuid, hospede).subscribe({
        next: () => {
          this.listarHospedes();
          this.form.reset();
          this.editUuid = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.hospedeService.criar(hospede).subscribe({
        next: () => {
          this.listarHospedes();
          this.form.reset();
        },
        error: err => console.error(err)
      });
    }
  }

  editar(hospede: HospedeResponse): void {
    this.editUuid = hospede.uuid;
    this.form.patchValue(hospede);
  }

  deletar(uuid: string): void {
    if (!confirm('Deseja realmente excluir este hóspede?')) return;

    this.hospedeService.excluir(uuid).subscribe({
      next: () => this.listarHospedes(),
      error: err => console.error(err)
    });
  }
}
