import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { QuartoService } from '../../../core/services/QuartoService';
import { QuartoRequest } from '../../../core/models/QuartoRequest';
import { QuartoResponse } from '../../../core/models/QuartoResponse';
import { TipoQuarto } from '../../../core/models/tipo.quarto';
import { StatusQuarto } from '../../../core/models/status.quarto';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
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
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit {

  form: FormGroup;
  dataSource = new MatTableDataSource<QuartoResponse>();
  displayedColumns: string[] = ['numero', 'tipo', 'status', 'diaria', 'acoes'];
  editId: number | null = null;

  TipoQuarto = TipoQuarto;     // para usar no HTML
  StatusQuarto = StatusQuarto; // para usar no HTML

  constructor(
    private fb: FormBuilder,
    private quartoService: QuartoService
  ) {
    this.form = this.fb.group({
      numero: [null, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      status: ['', Validators.required],
      diaria: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.listarQuartos();
  }

  listarQuartos(): void {
    this.quartoService.listar().subscribe({
      next: data => this.dataSource.data = data,  // atualização imediata da tabela
      error: err => console.error(err)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const quarto: QuartoRequest = this.form.value;

    if (this.editId !== null) {
      this.quartoService.atualizar(this.editId, quarto).subscribe({
        next: () => {
          this.listarQuartos();
          this.form.reset();
          this.editId = null;
        },
        error: err => console.error(err)
      });
    } else {
      this.quartoService.criar(quarto).subscribe({
        next: () => {
          this.listarQuartos();
          this.form.reset();
        },
        error: err => console.error(err)
      });
    }
  }

  editar(quarto: QuartoResponse): void {
    this.editId = quarto.id;
    this.form.patchValue(quarto);
  }

  deletar(id: number): void {
    if (confirm('Deseja realmente excluir este quarto?')) {
      this.quartoService.excluir(id).subscribe({
        next: () => this.listarQuartos(),
        error: err => console.error(err)
      });
    }
  }

}
