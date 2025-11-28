import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReservaRequest } from '../models/ReservaRequest';
import { ReservaResponse } from '../models/ReservaResponse';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private baseUrl = `${env.apiUrl}/reserva`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.baseUrl}/listar`);
  }

  criar(reserva: ReservaRequest): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(this.baseUrl, reserva);
  }

  buscarPorUUID(uuid: string): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(`${this.baseUrl}/uuid/${uuid}`);
  }

  atualizar(uuid: string, reserva: ReservaRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/uuid/${uuid}`, reserva);
  }

  excluir(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/uuid/${uuid}`);
  }
}
