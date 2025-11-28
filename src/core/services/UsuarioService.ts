import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../environment/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = `${env.apiUrl}/usuario`;

  constructor(private http: HttpClient) { }

  // Listar todos os usuários
  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/listar`);
  }

  // Buscar usuário por ID
  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  // Criar novo usuário
  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  // Atualizar usuário existente
  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }

  // Excluir usuário
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
