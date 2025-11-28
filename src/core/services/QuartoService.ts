import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuartoRequest } from '../models/QuartoRequest';
import { QuartoResponse } from '../models/QuartoResponse';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {
  private baseUrl = `${env.apiUrl}/quarto`;

  constructor(private http: HttpClient) {}

  listar(): Observable<QuartoResponse[]> {
    return this.http.get<QuartoResponse[]>(`${this.baseUrl}/listar`);
  }

  criar(dados: QuartoRequest): Observable<QuartoResponse> {
    return this.http.post<QuartoResponse>(this.baseUrl, dados);
  }

  atualizar(id: number, dados: QuartoRequest): Observable<QuartoResponse> {
    return this.http.put<QuartoResponse>(`${this.baseUrl}/${id}`, dados);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
