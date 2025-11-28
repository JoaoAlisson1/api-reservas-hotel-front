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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ReservaService } from '../../../core/services/ReservaService';
import { HospedeService } from '../../../core/services/HospedeService';
import { QuartoService } from '../../../core/services/QuartoService';
import { FuncionarioService } from '../../../core/services/FuncionarioService';

import { ReservaRequest } from '../../../core/models/ReservaRequest';
import { ReservaResponse } from '../../../core/models/ReservaResponse';
import { StatusReserva } from '../../../core/models/StatusReserva';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatTableModule
  ],
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  form!: FormGroup;
  dataSource = new MatTableDataSource<ReservaResponse>();
  displayedColumns: string[] = ['checkIn', 'checkOut', 'status', 'quarto', 'funcionario', 'acoes'];

  // Listas para selects
  hospedes: any[] = [];
  quartos: any[] = [];
  funcionarios: any[] = [];

  StatusReserva = StatusReserva;  // enum

  editUuid: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private hospedeService: HospedeService,
    private quartoService: QuartoService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      status: ['', Validators.required],
      funcionarioUuid: ['', Validators.required],
      quartoId: ['', Validators.required],
      hospedeUUIDs: [[], Validators.required]
    });

    this.carregarListas();
    this.listarReservas();
  }

  carregarListas(): void {
    this.hospedeService.listar().subscribe(h => this.hospedes = h);
    this.funcionarioService.listar().subscribe(f => this.funcionarios = f);
    this.quartoService.listar().subscribe(q => this.quartos = q);
  }

  listarReservas(): void {
    this.reservaService.listar().subscribe({
      next: lista => this.dataSource.data = lista,
      error: e => console.error(e)
    });
  }

  salvar(): void {
    if (this.form.invalid) return;

    const reserva: ReservaRequest = this.form.value;

    if (this.editUuid) {
      this.reservaService.atualizar(this.editUuid, reserva).subscribe({
        next: () => {
          this.listarReservas();
          this.form.reset();
          this.editUuid = null;
        }
      });
    } else {
      this.reservaService.criar(reserva).subscribe({
        next: () => {
          this.listarReservas();
          this.form.reset();
        }
      });
    }
  }

  editar(r: ReservaResponse): void {
    this.editUuid = r.uuid;

    this.form.patchValue({
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      status: r.status,
      funcionarioUuid: r.funcionario.uuid,
      quartoId: r.quarto.id,
      hospedeUUIDs: r.hospedes.map(h => h.uuid)
    });
  }

  deletar(uuid: string): void {
    if (!confirm("Deseja realmente excluir esta reserva?")) return;

    this.reservaService.excluir(uuid).subscribe({
      next: () => this.listarReservas()
    });
  }
}
