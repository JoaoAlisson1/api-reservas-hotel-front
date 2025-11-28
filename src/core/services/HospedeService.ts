import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HospedeRequest } from '../models/HospedeRequest';
import { HospedeResponse } from '../models/HospedeResponse';
import { env } from '../../environment/environment';  // igual ao QuartoService

@Injectable({
  providedIn: 'root'
})
export class HospedeService {

  private baseUrl = `${env.apiUrl}/hospede`;  // ⬅️ usando o mesmo padrão

  constructor(private http: HttpClient) {}

  listar(): Observable<HospedeResponse[]> {
    return this.http.get<HospedeResponse[]>(`${this.baseUrl}/listar`);
  }

  criar(hospede: HospedeRequest): Observable<HospedeResponse> {
    return this.http.post<HospedeResponse>(this.baseUrl, hospede);
  }

  atualizar(uuid: string, hospede: HospedeRequest): Observable<HospedeResponse> {
    return this.http.put<HospedeResponse>(`${this.baseUrl}/uuid/${uuid}`, hospede);
  }

  excluir(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/uuid/${uuid}`);
  }
}
