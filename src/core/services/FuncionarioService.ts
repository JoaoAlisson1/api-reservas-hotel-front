import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuncionarioRequest } from '../models/FuncionarioRequest';
import { FuncionarioResponse } from '../models/FuncionarioResponse';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private baseUrl = `${env.apiUrl}/funcionario`;

  constructor(private http: HttpClient) {}

  listar(): Observable<FuncionarioResponse[]> {
    return this.http.get<FuncionarioResponse[]>(`${this.baseUrl}/listar`);
  }

  criar(dados: FuncionarioRequest): Observable<FuncionarioResponse> {
    return this.http.post<FuncionarioResponse>(this.baseUrl, dados);
  }

  atualizar(uuid: string, dados: FuncionarioRequest): Observable<FuncionarioResponse> {
    return this.http.put<FuncionarioResponse>(`${this.baseUrl}/${uuid}`, dados);
  }

  excluir(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/uuid/${uuid}`);
  }
}
